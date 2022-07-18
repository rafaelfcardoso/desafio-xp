import { ResultSetHeader } from "mysql2";
import IOrderBody from "../interfaces/order.interface";
import investmentsModel from "../models/investments.model";


const newInvestment = (order: IOrderBody): Promise<ResultSetHeader> => {
  return investmentsModel.create(order);

  // const createdProduct = { ...product, id: insertId };

  // return createdProduct;
};

export default {
  newInvestment,
};