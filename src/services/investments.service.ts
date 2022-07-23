import IOrderBody from "../interfaces/order.interface";
import investmentsModel from "../models/investments.model";
import assetModel from "../models/asset.model";
import HttpException from "../shared/http.exception";

const isValid = (order: IOrderBody) => {
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;

  return true;
};

const newBuyOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(400, "Dados inválidos!");
  }
  const { insertId } = await investmentsModel.createBuyOrder(order);

  const createdOrder = { ...order, id: insertId };

  return createdOrder;
};

const newSellOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(400, "Dados inválidos!");
  }
  const { insertId } = await investmentsModel.createSellOrder(order);

  const sellOrder = { ...order, id: insertId };

  return sellOrder;
};


export default {
  newBuyOrder,
  newSellOrder,
};