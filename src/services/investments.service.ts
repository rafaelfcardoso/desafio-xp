import { StatusCodes } from "http-status-codes";
import IOrderBody from "../interfaces/order.interface";
import assetModel from "../models/asset.model";
import investmentsModel from "../models/investments.model";
import HttpException from "../shared/http.exception";

const isValid = (order: IOrderBody) => {
  if (!order.codCliente || typeof order.codCliente !== "number") return false;
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;

  return true;
};

const newBuyOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(400, "Dados inválidos!");
  }

  const { insertId } = await investmentsModel.createBuyOrder(order);

  const buyOrder = { ...order, id: insertId };

  const { valor } = await assetModel.getValueById(order.codAtivo);

  const clientAsset = { ...order, valor };

  const clientHistory = await assetModel.getByClient(order.codCliente); 
  // console.log({ clientHistory });

  if (clientHistory.length) {
    clientHistory.forEach((asset) => {
      if (asset.codAtivo === order.codAtivo) {
        assetModel.updateBuy(clientAsset); // Atualiza a quantia sob custodia.
      }
    })
  } else {
    await assetModel.newInvestment(clientAsset); 
  }

  return buyOrder;
};

const newSellOrder = async (order: IOrderBody): Promise<IOrderBody>=> {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  const { valor } = await assetModel.getValueById(order.codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, valor }; // Insere o valor unitario na ordem

  const clientHistory = await assetModel.getByClient(order.codCliente); 

  if (clientHistory.length) {
    clientHistory.forEach(async (asset) => {
      if (asset.codAtivo === order.codAtivo) {
        
        if (asset.qtdeAtivo <= order.qtdeAtivo) {
          // throw new HttpException(StatusCodes.BAD_REQUEST, "Valor da venda é maior que a quantia sob custódia.");
          return order.message = "Valor da venda é maior que a quantia sob custódia.";
        }

        assetModel.updateSell(clientAsset); // Atualiza a quantia sob custodia 
        const { insertId } = await investmentsModel.createSellOrder(order);

        const sellOrder = { ...order, id: insertId };

        return sellOrder;

      } else {
        //throw new HttpException(StatusCodes.NOT_FOUND, `Ativo ${order.codAtivo} não encontrado para o cliente ${order.codCliente}.`);
        return order.message =`Ativo ${order.codAtivo} não encontrado para o cliente ${order.codCliente}.`
      }
    })
  }
  return order;
};


export default {
  newBuyOrder,
  newSellOrder,
};