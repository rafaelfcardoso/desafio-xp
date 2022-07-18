import IOrderBody from "../interfaces/order.interface";
import investmentsModel from "../models/investments.model";


const newInvestment = async (order: IOrderBody): Promise<IOrderBody> => {
  const { insertId } = await investmentsModel.create(order);

  const createdOrder = { ...order, id: insertId };

  return createdOrder;
};

export default {
  newInvestment,
};