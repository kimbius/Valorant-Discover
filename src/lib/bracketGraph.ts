import type { Edge, Node } from "@xyflow/svelte";
import type { EventBracket, EventBracketMatch } from "$lib/types";

export interface BracketNodeData extends Record<string, unknown> {
  match: EventBracketMatch;
  side: "upper" | "lower";
}

export type BracketNode = Node<BracketNodeData>;

const NODE_WIDTH = 260;
const NODE_HEIGHT = 126;
const COLUMN_GAP = 100;
const ROW_GAP = 28;

function roundGroups(matches: EventBracketMatch[]) {
  const groups: EventBracketMatch[][] = [];
  const names: string[] = [];

  for (const match of matches) {
    const round = match.round || "Round";
    let index = names.indexOf(round);
    if (index === -1) {
      index = names.length;
      names.push(round);
      groups.push([]);
    }
    groups[index].push(match);
  }

  return groups;
}

function key(side: "upper" | "lower", match: EventBracketMatch, index: number) {
  return `${side}-${match.id || "tbd"}-${index}`;
}

function makeSide(
  matches: EventBracketMatch[],
  side: "upper" | "lower",
): { nodes: BracketNode[]; edges: Edge[]; width: number; height: number } {
  const groups = roundGroups(matches);
  const nodes: BracketNode[] = [];
  const matchKeys = new Map<EventBracketMatch, string>();
  let height = 0;

  groups.forEach((group, column) => {
    const columnHeight = group.length * NODE_HEIGHT + Math.max(0, group.length - 1) * ROW_GAP;
    height = Math.max(height, columnHeight);
    const offset = (Math.max(...groups.map((items) => items.length), 1) * (NODE_HEIGHT + ROW_GAP) - columnHeight) / 2;

    group.forEach((match, row) => {
      const id = key(side, match, matches.indexOf(match));
      matchKeys.set(match, id);
      nodes.push({
        id,
        type: "bracketMatch",
        position: {
          x: column * (NODE_WIDTH + COLUMN_GAP),
          y: Math.max(0, offset) + row * (NODE_HEIGHT + ROW_GAP),
        },
        data: { match, side },
        draggable: false,
        connectable: false,
        selectable: false,
      });
    });
  });

  const edges: Edge[] = [];
  for (let roundIndex = 0; roundIndex < groups.length - 1; roundIndex += 1) {
    const sources = groups[roundIndex];
    const targets = groups[roundIndex + 1];

    // Only connect standard bracket reductions:
    // - 2N -> N: winners bracket pairwise reduction (0,1 -> 0; 2,3 -> 1)
    // - N -> N: 1:1 final progression (Upper Final -> Grand Final) and
    //   lower-bracket reload rounds (R1 winners face dropping losers, one per match)
    const reduction = sources.length === targets.length * 2;
    const progression = sources.length === targets.length && sources.length > 0;
    if (!reduction && !progression) continue;

    targets.forEach((target, targetIndex) => {
      const targetId = matchKeys.get(target);
      if (!targetId) return;
      const feeders = reduction
        ? [sources[targetIndex * 2], sources[targetIndex * 2 + 1]]
        : [sources[targetIndex]];
      feeders.forEach((source) => {
        const sourceId = matchKeys.get(source);
        if (!sourceId) return;
        edges.push({
          id: `${sourceId}->${targetId}`,
          source: sourceId,
          target: targetId,
          type: "smoothstep",
          data: { inferred: true },
          style: "stroke: #e5e7eb; stroke-width: 2px;",
        });
      });
    });
  }

  return {
    nodes,
    edges,
    width: Math.max(1, groups.length) * (NODE_WIDTH + COLUMN_GAP) - COLUMN_GAP,
    height: Math.max(NODE_HEIGHT, height),
  };
}

export function buildBracketGraph(bracket: EventBracket) {
  const upper = makeSide(bracket.upper, "upper");
  const lower = makeSide(bracket.lower, "lower");
  const lowerOffset = upper.nodes.length && lower.nodes.length ? upper.height + 100 : 0;
  const nodes = [
    ...upper.nodes,
    ...lower.nodes.map((node) => ({ ...node, position: { ...node.position, y: node.position.y + lowerOffset } })),
  ];

  return {
    nodes,
    edges: [...upper.edges, ...lower.edges],
    width: Math.max(upper.width, lower.width),
    height: Math.max(upper.height + lowerOffset, lower.height + lowerOffset),
  };
}
