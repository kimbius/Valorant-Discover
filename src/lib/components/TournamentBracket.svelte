<script lang="ts">
  import "@xyflow/svelte/dist/style.css";
  import { Background, BackgroundVariant, Controls, SvelteFlow } from "@xyflow/svelte";
  import BracketMatchNode from "$components/BracketMatchNode.svelte";
  import { buildBracketGraph } from "$lib/bracketGraph";
  import type { EventStage } from "$lib/types";

  export let stages: EventStage[];

  const nodeTypes = { bracketMatch: BracketMatchNode };

  $: graphs = stages
    .flatMap((stage) => stage.brackets.length ? stage.brackets.map((bracket) => ({ stage, bracket })) : [])
    .filter(({ bracket }) => bracket.upper.length + bracket.lower.length > 0)
    .map(({ stage, bracket }, index) => ({
      key: `${stage.id}-${bracket.name ?? "bracket"}-${index}`,
      title: stage.name,
      subtitle: bracket.name && bracket.name !== `${stage.id}-` ? bracket.name.replace(/-+$/, "") : undefined,
      isActive: stage.isActive,
      graph: buildBracketGraph(bracket),
      hasUpper: bracket.upper.length > 0,
      hasLower: bracket.lower.length > 0,
    }));
</script>

<div class="space-y-6">
  {#each graphs as item (item.key)}
    <section class="overflow-hidden rounded border border-gray-200 bg-white">
      <header class="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <h3 class="flex items-center gap-2 font-bold">
            {item.title}
            {#if item.isActive}
              <span class="rounded bg-vlr px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Active</span>
            {/if}
          </h3>
          {#if item.subtitle}
            <p class="mt-0.5 text-xs text-gray-500">{item.subtitle}</p>
          {/if}
        </div>
        <p class="text-xs text-gray-500">
          {item.hasUpper && item.hasLower ? "Upper & lower bracket" : item.hasUpper ? "Upper bracket" : "Lower bracket"}
          · drag to pan, scroll to zoom
        </p>
      </header>
      <div class="h-[480px] md:h-[560px]">
        <SvelteFlow
          {nodeTypes}
          nodes={item.graph.nodes}
          edges={item.graph.edges}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} />
          <Controls />
        </SvelteFlow>
      </div>
    </section>
  {/each}
</div>
