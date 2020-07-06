<template>
  <div class="graph">
    <div class="graph-area">
      <svg class="svg-container" viewBox="0,0,954,360">
        <g font-family="sans-serif" font-size="10" transform="translate(106,180)">
          <transition-group
            tag="g"
            name="line"
            stroke="#555"
            stroke-opacity="0.4"
            stroke-width="1.5"
          >
            <path
              v-for="link in links"
              class="link"
              v-bind:key="link.id"
              v-bind:d="link.d"
              v-bind:style="link.style"
            />
          </transition-group>
          <transition-group tag="g" name="rect" stroke-linejoin="round" stroke-width="3">
            <g
              v-for="node in nodes"
              v-bind:key="node.id"
              v-bind:style="node.style"
              v-bind:class="[node.className, {'highlight': node.highlight}]"
              v-bind:transform="node.transform"
            >
              <text dy="0.31em" x="-6" text-anchor="end" stroke="white">{{node.name}}</text>
              <rect fill="blue" y="-5" width="10" height="10" />
              <text dy="0.31em" x="-6" text-anchor="end">{{node.name}}</text>
            </g>
          </transition-group>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
const d3 = require("d3");
import { mapState } from "vuex";
import { ISeller, IBroker, IData } from "~/store/graph";
import { Component, namespace, Vue } from "nuxt-property-decorator";
const graph = namespace("graph");

function generatePath(d: any) {
  return `M${d.y},${d.x}C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${
    d.parent.x
  } ${d.parent.y},${d.parent.x}`;
}

@Component
export default class Graph extends Vue {
  public no: number = 0;

  @graph.Getter
  public generateData!: any;

  get root(): any {
    const width: number = 954;
    const height: number = 500;
    let root = d3.hierarchy(this.generateData);
    root.dy = width / ((root.height as number) + 1);
    root.dx = 20;
    return d3.tree().nodeSize([root.dx, root.dy])(root);
  }

  get links(): any {
    const root = (this as any).root;
    var key = 0;
    const links = root.links().map(function(d: any) {
      const { source, target } = d;
      key++;
      return { id: key, d: generatePath(target), style: "" };
    });
    return links;
  }

  get nodes(): any {
    const root = (this as any).root;
    var key = 0;
    const nodes = root.descendants().map(function(d: any) {
      key++;
      return {
        id: key,
        name: d.data.name + " " + d.data.data,
        transform: `translate(${d.y},${d.x})`
      };
    });
    return nodes;
  }

  onStartClick(): void {
    this.no = 2;
  }
}
</script>

<style scoped>
.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
  stroke-dasharray: 1000;
}

.graph {
  background-color: white;
  height: 100%;
}

.graph-area {
  height: 100%;
  display: flex;
  justify-content: center;
}

.svg-container {
  max-height: 90%;
  flex: 1;
}
</style>