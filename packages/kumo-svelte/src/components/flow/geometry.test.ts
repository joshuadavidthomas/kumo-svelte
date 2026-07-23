import { describe, expect, it } from "vitest";
import { computeConnectors, computeEdges, computePositions } from "./geometry";
import type { FlowNodeData, RectLike } from "./index";
import { createRoundedPath } from "./paths";
import type { FlowState, FlowTreeNode } from "./types";

const node = (id: string): FlowTreeNode => ({ id, kind: "node" });
const list = (children: FlowTreeNode[]): FlowTreeNode => ({ children, kind: "list" });
const parallel = (children: FlowTreeNode[]): FlowTreeNode => ({ children, kind: "parallel" });

function state(tree: FlowTreeNode, overrides: Partial<FlowState> = {}): FlowState {
  return {
    align: "start",
    nodes: {},
    orientation: "horizontal",
    tree,
    ...overrides,
  };
}

describe("Flow computed layout", () => {
  it("preserves the public rect-based node data contract", () => {
    const rect = {
      bottom: 40,
      height: 20,
      left: 10,
      right: 40,
      top: 20,
      width: 30,
      x: 10,
      y: 20,
    } satisfies RectLike;
    const publicNode = {
      disabled: false,
      end: null,
      parallel: true,
      start: rect,
    } satisfies FlowNodeData;

    expect(publicNode.start).toBe(rect);
  });

  it("reconstructs nested list and parallel edges", () => {
    const edges = computeEdges(
      state(list([node("A"), parallel([list([node("B1"), node("B2")]), node("C")]), node("D")])),
    );

    expect(new Set(edges.map(([from, to]) => `${from}-${to}`))).toEqual(
      new Set(["A-B1", "A-C", "B1-B2", "B2-D", "C-D"]),
    );
  });

  it("does not connect adjacent parallel groups", () => {
    const edges = computeEdges(
      state(
        list([
          node("A"),
          parallel([node("B1"), node("B2")]),
          parallel([node("C1"), node("C2")]),
          node("D"),
        ]),
      ),
    );

    expect(edges).toEqual([
      ["A", "B1"],
      ["A", "B2"],
      ["C1", "D"],
      ["C2", "D"],
    ]);
  });

  it("positions measured nodes across orientations and alignments", () => {
    const tree = list([node("A"), node("B")]);
    const nodes = {
      A: { height: 20, width: 40 },
      B: { height: 40, width: 20 },
    };

    expect(computePositions(state(tree, { align: "center", nodes }))).toEqual({
      A: { x: 0, y: 10 },
      B: { x: 104, y: 0 },
    });
    expect(
      computePositions(state(tree, { align: "center", nodes, orientation: "vertical" })),
    ).toEqual({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 84 },
    });
  });

  it("uses custom anchor midpoints for horizontal connector endpoints", () => {
    const connectors = computeConnectors(
      [["A", "B"]],
      { A: { x: 0, y: 10 }, B: { x: 100, y: 20 } },
      {
        A: { height: 80, startAnchorOffset: 15, width: 40 },
        B: { endAnchorOffset: 25, height: 60, width: 50 },
      },
      "horizontal",
    );

    expect(connectors).toEqual([
      {
        disabled: undefined,
        fromId: "A",
        single: true,
        toId: "B",
        x1: 40,
        x2: 100,
        y1: 25,
        y2: 45,
      },
    ]);
  });

  it("rounds both corners of a single vertical connector path", () => {
    expect(
      createRoundedPath(
        { x1: 0, x2: 56, y1: 0, y2: 71 },
        { orientation: "vertical", single: true },
      ),
    ).toBe("M 0 0 L 0 31 Q 0 39 8 39 L 48 39 Q 56 39 56 47 L 56 63");
  });

  it("serializes a horizontal non-single connector without commas", () => {
    const path = createRoundedPath(
      { x1: 0, x2: 100, y1: 0, y2: 40 },
      { orientation: "horizontal" },
    );

    expect(path).toBe("M 0 0 L 32 0 L 32 32 Q 32 40 40 40 L 92 40");
    expect(path).not.toContain(",");
  });
});
