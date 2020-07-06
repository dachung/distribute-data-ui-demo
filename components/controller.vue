<template>
  <a-layout style="background-color: white; padding: 10px">
    <a-row>
      <h2>Demo UI of distributing data</h2>
    </a-row>
    <a-row>
      <a-col :md="8">
        <p>This demo will distribute data to lower level of graph nodes by following rules:</p>
        <p>1. The data of level 1 object (Object-1, Object-2, ...) is the total of data of level 2 object</p>
        <p>2. Data is distributed randomly from the Distributer</p>
        <p>Note: Graph has the maximum nodes of level 1 is 3, level 2 is 5</p>
      </a-col>
      <a-col :md="8" style="padding-left: 10px">
        <a-row>
          <p><strong>Step 1:</strong> Input your favorite number of nodes</p>
          <a-col :md="10" class="el">
            <label>Level 1</label>
            <a-input v-model="noBrokers" style="width: 100px" />
          </a-col>
          <a-col :md="10" class="el">
            <label>Level 2</label>
            <a-input v-model="noSellers" style="width: 100px" />
          </a-col>
          <a-col :md="4" class="el">
            <a-button type="primary" @click="onSetupClick">Setup</a-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col :md="3"/>
      <a-col :md="5">
        <p><strong>Step 2:</strong> Click the button to distribute a data</p>
        <div class="el">
          <a-button type="primary" @click="onSendClick(2)">Distribute</a-button>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script lang="ts">
import { mapMutations } from "vuex";
import { Component, Vue, namespace } from "nuxt-property-decorator";
const graph = namespace("graph");
const history = namespace("history");

//TODO: move to constant folder
const PROCESS_STATE = {
  begin: 1,
  "1st_send": 2,
  "2nd_send": 3
};
let getRandomInt = (max: number, flag: string): number => {
  let result: number = Math.floor(Math.random() * Math.floor(max));
  if (result == 0) return 1;
  return result;
};

@Component
export default class Controller extends Vue {
  current: number = 1;
  noBrokersValue: number = 0;
  noSellersValue: number = 0;

  @graph.State
  public brokers!: number;

  @graph.State
  public sellers!: number;

  @graph.Mutation
  public setupGraph!: (data: Object) => void;

  @graph.Mutation
  public distributeData!: (data: Object) => void;

  @graph.Mutation
  public resetDistributedData!: (data: Object) => void;

  @history.Mutation
  public resetHistoryData!: (data: Object) => void;

  @history.Mutation
  public addHistory!: (data: Object) => void;

  get noBrokers() {
    return this.brokers;
  }

  set noBrokers(val) {
    this.noBrokersValue = val;
  }

  get noSellers() {
    return this.sellers;
  }

  set noSellers(val) {
    this.noSellersValue = val;
  }

  changeProcess(state: number): void {
    this.current = state;
  }

  onSendClick(state: number): void {
    let brokerId: number = getRandomInt(+this.brokers + 1, "broker");
    let sellerId: number = getRandomInt(+this.sellers + 1, "sellers");
    let data: number = getRandomInt(3, "data");
    let description: string =
      "Distribute " + data + " data to Object " + brokerId + "-" + sellerId;
    this.distributeData({ brokerId, sellerId, data });
    this.addHistory({ description });
    this.changeProcess(1);
  }

  onSetupClick(): void {
    this.changeProcess(PROCESS_STATE.begin);
    this.resetDistributedData({});
    this.resetHistoryData({});
    let brokers = 3
    let sellers = 5
    if (this.noBrokersValue > 0 && this.noBrokersValue <= 3) {
      brokers = this.noBrokersValue
    }
    if (this.noSellersValue > 0 && this.noSellersValue <= 3) {
      sellers = this.noSellersValue
    }
    const payload = {
      brokers: brokers,
      sellers: sellers 
    };
    this.setupGraph(payload);
  }
}
</script>

<style scoped>
.el {
  padding: 5px 5px 5px 5px;
}
</style>