import type { DescendantInfo } from "./context.svelte";
import type { FlowNodeData, RectLike } from "./types";

export function toRectLike(rect: DOMRect | RectLike): RectLike {
  return {
    x: rect.x,
    y: rect.y,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
}

export function sameRect(a: RectLike | null, b: RectLike | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.top === b.top &&
    a.left === b.left &&
    a.right === b.right &&
    a.bottom === b.bottom &&
    a.width === b.width &&
    a.height === b.height
  );
}

export function getNodeRect(
  node: DescendantInfo<FlowNodeData> | undefined,
  { type = "start" }: { type?: "start" | "end" } = {},
) {
  if (!node) return null;
  return node.props[type] ?? null;
}
