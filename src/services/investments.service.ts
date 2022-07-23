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
    throw new HttpException(401, "Dados inválidos!");
  }

  const { valor } = await assetModel.getValueById(order.codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, valor }; // Insere o valor unitario na na ordem

  const clientHistory = await assetModel.getByClient(order.codCliente); 

  if (clientHistory.length) {
    clientHistory.forEach(async (asset) => {
      if (asset.codAtivo === order.codAtivo) {
        if (asset.qtdeAtivo <= order.qtdeAtivo) {
          throw new HttpException(400, 'Valor da venda é maior que a quantia sob custódia!');
        }

        assetModel.updateSell(clientAsset); // Atualiza a quantia sob custodia 
      }

      const { insertId } = await investmentsModel.createSellOrder(order);
      
      const sellOrder = { ...order, id: insertId };

      return sellOrder;
    })

  }
  return order;
};

export default {
  newBuyOrder,
  newSellOrder,
};