import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

const data: Array<IHistory> = [];

export interface IHistory {
  key: number;
  time: string;
  types: Array<string>;
  description: string;
}

@Module({
  name: "history",
  stateFactory: true,
  namespaced: true
})
export default class Graph extends VuexModule {
  public histories: Array<IHistory> = data;

  @Mutation
  addHistory(payload: any) {
    var count = this.histories.length;
    var { description } = payload;
    const history: IHistory = {
      key: count + 1,
      time: Date(),
      description: description,
      types: ["New"]
    };
    this.histories = [history, ...this.histories];
  }

  @Mutation
  resetHistoryData(payload: any) {
    this.histories = [];
  }
}
