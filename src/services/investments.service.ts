import IOrderBody from "../interfaces/order.interface";
import investmentsModel from "../models/investments.model";
import HttpException from "../shared/http.exception";

const isValid = (order: IOrderBody) => {
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;

  return true;
};

const newInvestment = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(400, "Dados inválidos!");
  }
  const { insertId } = await investmentsModel.create(order);

  const createdOrder = { ...order, codCliente: insertId };
  console.log('Service-Order', createdOrder);
  // const createdOrder = await investmentsModel.create(order);

  return createdOrder;
};

export default {
  newInvestment,
};