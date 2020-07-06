import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

interface IGraphState {
  brokers: number;
  sellers: number;
}

export interface ISeller {
  name: string;
  data: number;
}

export interface IBroker {
  name: string;
  data?: number;
  children?: ISeller[];
}

export interface IData {
  name: string;
  data: number;
  children?: IBroker[];
}

interface IDistributedSellerData {
  [key: number]: number;
}

interface IDistributedBrokerData {
  [key: number]: IDistributedSellerData;
}

let getDistributedData = (
  distributedData: any,
  brokerId: number,
  sellerId: number
): number => {
  if (!distributedData[brokerId]) {
    return 0;
  }
  if (!distributedData[brokerId][sellerId]) {
    return 0;
  }
  return distributedData[brokerId][sellerId];
};

let generateIData = (
  numberOfBrokers: number,
  numberOfSellers: number,
  distributedData: any
): IData => {
  let graphData: IData = { name: "Distributer", data: 0 };
  let brokersList: IBroker[] = new Array(numberOfBrokers);
  for (let i = 1; i <= numberOfBrokers; i++) {
    let brokerData: number = 0;
    let broker: IBroker = { name: "Object " + i.toString() + " Data: " };

    let sellerList: ISeller[] = new Array(numberOfSellers);
    for (let j = 1; j <= numberOfSellers; j++) {
      let data: number = getDistributedData(distributedData, i, j);

      brokerData += data;

      let seller: ISeller = {
        name: "Object " + i.toString() + "-" + j.toString() + " Data: ",
        data: data
      };
      sellerList[j - 1] = seller;
    }
    broker.data = brokerData;
    broker.children = sellerList;
    brokersList[i - 1] = broker;
  }
  graphData.children = brokersList;
  return graphData;
};

@Module({
  name: "graph",
  stateFactory: true,
  namespaced: true
})
export default class Graph extends VuexModule {
  public brokers: number = 3;
  public sellers: number = 3;

  public distributedData: IDistributedBrokerData = {};

  get generateData(): IData {
    return generateIData(this.brokers, this.sellers, this.distributedData);
  }

  @Mutation
  setupGraph(payload: any) {
    this.brokers = payload.brokers;
    this.sellers = payload.sellers;
  }

  @Mutation
  distributeData(payload: any) {
    let { brokerId, sellerId, data } = payload;
    let currentData = getDistributedData(
      this.distributedData,
      brokerId,
      sellerId
    );

    if (!!currentData) {
      data = currentData + data;
    }

    let dDS: IDistributedSellerData = {};
    dDS[sellerId] = data;
    let dDB: IDistributedBrokerData = {};

    if (this.distributedData[brokerId]) {
      dDB[brokerId] = { ...this.distributedData[brokerId] };
    }
    dDB[brokerId] = { ...dDB[brokerId], ...dDS };

    this.distributedData = { ...this.distributedData, ...dDB };
  }

  @Mutation
  resetDistributedData(payload: any) {
    this.distributedData = {};
  }
}
