<template>
  <div style="background-color: white; height: 100%;">
    <a-table
      :columns="columns"
      :data-source="histories"
      :pagination="{ pageSize: 10}"
      :scroll="{ y: 1000}"
      size="small"
    >
      <a slot="time" slot-scope="text">{{ text | formatDate }}</a>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
import { IHistory } from "~/store/history";
const history = namespace("history");

@Component
export default class Controller extends Vue {
  @history.State
  public histories!: Array<IHistory>;

  columns: Array<Object> = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "100px",
      scopedSlots: { customRender: "time" }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    }
  ];
}
</script>