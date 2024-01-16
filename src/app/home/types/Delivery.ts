export interface Delivery {
    delivery_id?:number;
    availbaleDriver?: any;
    startTime?: Date;
    endTime?: Date;
    volume?: number;
    weight?: number;
    startWarehouse?: any;
    destination?: any;
    warehouses?: any;
    status?: any,
    evaluations?:any,
    endWarehouse?:any,
}
  