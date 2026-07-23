import type {
  FlowConnector,
  FlowEdges,
  FlowNodePositions,
  FlowOrientation,
  FlowState,
  FlowTreeNode,
} from "./types";

export function computeEdges(flowState: FlowState): FlowEdges {
  const edges: FlowEdges = [];
  collectEdges(flowState.tree, edges);
  return edges;
}

function entryIds(node: FlowTreeNode): string[] {
  if (node.kind === "node") return [node.id];
  if (node.kind === "parallel") return node.children.flatMap(entryIds);
  if (node.children.length === 0) return [];
  return entryIds(node.children[0]);
}

function exitIds(node: FlowTreeNode): string[] {
  if (node.kind === "node") return [node.id];
  if (node.kind === "parallel") return node.children.flatMap(exitIds);
  if (node.children.length === 0) return [];
  return exitIds(node.children[node.children.length - 1]);
}

function collectEdges(node: FlowTreeNode, edges: FlowEdges) {
  if (node.kind === "node") return;

  if (node.kind === "parallel") {
    for (const child of node.children) collectEdges(child, edges);
    return;
  }

  for (const child of node.children) collectEdges(child, edges);

  for (let index = 0; index < node.children.length - 1; index += 1) {
    const current = node.children[index];
    const next = node.children[index + 1];

    if (current.kind === "parallel" && next.kind === "parallel") continue;

    for (const from of exitIds(current)) {
      for (const to of entryIds(next)) edges.push([from, to]);
    }
  }
}

export function computePositions(
  flowState: FlowState,
  { columnGap = 64, rowGap = 16 } = {},
): FlowNodePositions {
  const positions: FlowNodePositions = {};
  const { align, orientation } = flowState;

  function layout(
    node: FlowTreeNode,
    originX: number,
    originY: number,
    output: FlowNodePositions,
  ): { width: number; height: number } {
    if (node.kind === "node") {
      const measured = flowState.nodes[node.id];
      const width = measured?.width ?? 0;
      const height = measured?.height ?? 0;
      output[node.id] = { x: originX, y: originY };
      return { width, height };
    }

    if (node.kind === "list") {
      if (orientation === "vertical") {
        if (align === "center") {
          const sizes = node.children.map((child) => layout(child, 0, 0, {}));
          const columnWidth = sizes.reduce((maximum, size) => Math.max(maximum, size.width), 0);
          let cursorY = originY;

          for (let index = 0; index < node.children.length; index += 1) {
            layout(
              node.children[index],
              originX + (columnWidth - sizes[index].width) / 2,
              cursorY,
              output,
            );
            cursorY += sizes[index].height;
            if (index < node.children.length - 1) cursorY += columnGap;
          }

          return { width: columnWidth, height: cursorY - originY };
        }

        let cursorY = originY;
        let totalWidth = 0;
        for (let index = 0; index < node.children.length; index += 1) {
          const size = layout(node.children[index], originX, cursorY, output);
          cursorY += size.height;
          if (index < node.children.length - 1) cursorY += columnGap;
          totalWidth = Math.max(totalWidth, size.width);
        }
        return { width: totalWidth, height: cursorY - originY };
      }

      if (align === "center") {
        const sizes = node.children.map((child) => layout(child, 0, 0, {}));
        const rowHeight = sizes.reduce((maximum, size) => Math.max(maximum, size.height), 0);
        let cursorX = originX;

        for (let index = 0; index < node.children.length; index += 1) {
          layout(
            node.children[index],
            cursorX,
            originY + (rowHeight - sizes[index].height) / 2,
            output,
          );
          cursorX += sizes[index].width;
          if (index < node.children.length - 1) cursorX += columnGap;
        }

        return { width: cursorX - originX, height: rowHeight };
      }

      let cursorX = originX;
      let totalHeight = 0;
      for (let index = 0; index < node.children.length; index += 1) {
        const size = layout(node.children[index], cursorX, originY, output);
        cursorX += size.width;
        if (index < node.children.length - 1) cursorX += columnGap;
        totalHeight = Math.max(totalHeight, size.height);
      }
      return { width: cursorX - originX, height: totalHeight };
    }

    if (orientation === "vertical") {
      if (node.align === "end") {
        const sizes = node.children.map((child) => layout(child, 0, 0, {}));
        const maximumHeight = sizes.reduce((maximum, size) => Math.max(maximum, size.height), 0);
        let cursorX = originX;

        for (let index = 0; index < node.children.length; index += 1) {
          layout(
            node.children[index],
            cursorX,
            originY + maximumHeight - sizes[index].height,
            output,
          );
          cursorX += sizes[index].width;
          if (index < node.children.length - 1) cursorX += rowGap;
        }

        return { width: cursorX - originX, height: maximumHeight };
      }

      let cursorX = originX;
      let maximumHeight = 0;
      for (let index = 0; index < node.children.length; index += 1) {
        const size = layout(node.children[index], cursorX, originY, output);
        maximumHeight = Math.max(maximumHeight, size.height);
        cursorX += size.width;
        if (index < node.children.length - 1) cursorX += rowGap;
      }
      return { width: cursorX - originX, height: maximumHeight };
    }

    if (node.align === "end") {
      const sizes = node.children.map((child) => layout(child, 0, 0, {}));
      const maximumWidth = sizes.reduce((maximum, size) => Math.max(maximum, size.width), 0);
      let cursorY = originY;

      for (let index = 0; index < node.children.length; index += 1) {
        layout(node.children[index], originX + maximumWidth - sizes[index].width, cursorY, output);
        cursorY += sizes[index].height;
        if (index < node.children.length - 1) cursorY += rowGap;
      }

      return { width: maximumWidth, height: cursorY - originY };
    }

    let cursorY = originY;
    let maximumWidth = 0;
    for (let index = 0; index < node.children.length; index += 1) {
      const size = layout(node.children[index], originX, cursorY, output);
      maximumWidth = Math.max(maximumWidth, size.width);
      cursorY += size.height;
      if (index < node.children.length - 1) cursorY += rowGap;
    }
    return { width: maximumWidth, height: cursorY - originY };
  }

  layout(flowState.tree, 0, 0, positions);
  return positions;
}

export function computeDiagramRect(positions: FlowNodePositions, flowState: FlowState) {
  let width = 0;
  let height = 0;

  for (const [id, position] of Object.entries(positions)) {
    const node = flowState.nodes[id];
    if (!node) continue;
    width = Math.max(width, position.x + node.width);
    height = Math.max(height, position.y + node.height);
  }

  return { width, height };
}

export function computeConnectors(
  edges: FlowEdges,
  positions: FlowNodePositions,
  nodes: FlowState["nodes"],
  orientation: FlowOrientation,
) {
  const connectors: FlowConnector[] = [];

  for (const [fromId, toId] of edges) {
    const fromPosition = positions[fromId];
    const toPosition = positions[toId];
    const fromNode = nodes[fromId];
    const toNode = nodes[toId];
    if (!fromPosition || !toPosition || !fromNode || !toNode) continue;

    const points =
      orientation === "vertical"
        ? {
            x1: fromPosition.x + fromNode.width / 2,
            y1: fromPosition.y + fromNode.height,
            x2: toPosition.x + toNode.width / 2,
            y2: toPosition.y,
          }
        : {
            x1: fromPosition.x + fromNode.width,
            y1: fromPosition.y + (fromNode.startAnchorOffset ?? fromNode.height / 2),
            x2: toPosition.x,
            y2: toPosition.y + (toNode.endAnchorOffset ?? toNode.height / 2),
          };

    connectors.push({
      ...points,
      disabled: fromNode.disabled || toNode.disabled,
      fromId,
      single: true,
      toId,
    });
  }

  return connectors;
}
