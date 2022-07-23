import { IBrokerAsset } from "../interfaces/brokerAssets.interface";
import IClientAsset from "../interfaces/clientAssets.interface";
import IUpdateOrder from "../interfaces/updateOrder";
import assetModel from "../models/asset.model";
import HttpException from "../shared/http.exception";
import { StatusCodes } from 'http-status-codes';

const isValid = (order: IUpdateOrder) => {
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;
  if (!order.codCliente || typeof order.codCliente !== "number") return false;

  return true;
};

const getByCodeAsset = (codAtivo: number): Promise<IBrokerAsset> => {
  return assetModel.getByCode(codAtivo);
}

const getByClient = (codCliente: number): Promise<IClientAsset[]> => {
  return assetModel.getByClient(codCliente);
}

const updateBuyOrder = async (codAtivo: number, order: IUpdateOrder): Promise<IUpdateOrder> => {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  const { valor } = await assetModel.getValueById(codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, codAtivo, valor }; // Insere o valor unitario na ordem

  const clientHistory = await assetModel.getByClient(order.codCliente);
  // console.log({ clientHistory });

  if (clientHistory.length) {
    clientHistory.forEach((asset) => {
      if (asset.codAtivo === codAtivo) {
        assetModel.updateBuy(clientAsset); // Atualiza a quantia sob custodia.
      }
    })
  } else {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Não existem ordens cadastradas neste ativo."); 
  }

  return clientAsset;
};

const updateSellOrder = async (codAtivo: number, order: IUpdateOrder): Promise<IUpdateOrder>=> {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  const { valor } = await assetModel.getValueById(codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, codAtivo, valor }; // Insere o valor unitario na ordem

  const clientHistory = await assetModel.getByClient(order.codCliente); 

  if (clientHistory.length) {
    clientHistory.forEach(async (asset) => {
      if (asset.codAtivo === codAtivo) {
        
        if (asset.qtdeAtivo <= order.qtdeAtivo) {
          throw new HttpException(StatusCodes.BAD_REQUEST, "Valor da venda é maior que a quantia sob custódia.");
        }

        assetModel.updateSell(clientAsset); // Atualiza a quantia sob custodia 

      } else {
        throw new HttpException(StatusCodes.NOT_FOUND, `Ativo ${codAtivo} não encontrado para o cliente ${order.codCliente}.`);
      }
    
    })

  }
  return order;
};

export default {
  getByCodeAsset,
  getByClient,
  updateBuyOrder,
  updateSellOrder
};

