<template>
  <a-layout class="index-page">
    <a-row class="present-box">
      <a-col :md="24" class="controller-box">
        <controller />
      </a-col>
      <a-col :md="16" class="graph-box">
        <graph />
      </a-col>
      <a-col :md="8" class="history-box">
        <history />
      </a-col>
    </a-row>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Graph from "~/components/graph.vue";
import History from "~/components/history.vue";
import Controller from "~/components/controller.vue";

@Component({
  components: {
    Graph,
    History,
    Controller
  }
})
export default class Index extends Vue {}
</script>

<style lang="css" scoped>
.index-page {
  margin: 0 auto;
}
.graph-box {
  height: 500px;
  padding: 10px;
}
.controller-box {
  padding: 10px;
}
.history-box {
  height: 500px;
  padding: 10px;
}
</style>
