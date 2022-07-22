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

  const buyOrder = { ...order, id: insertId }; // Insere novo id para a ordem

  const { valor } = await assetModel.getValueById(order.codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, valor }; // Insere o valor unitario na ordem

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

const newSellOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(401, "Dados inválidos!");
  }

  const { valor } = await assetModel.getValueById(order.codAtivo); // Obtem o valor da acao

  const clientAsset = { ...order, valor }; // Insere o valor unitario na na ordem

  const existent = await assetModel.getByClient(order.codCliente); 

  return order;

  /* if (existent && existent.codAtivo === order.codAtivo && existent.qtdeAtivo >= order.qtdeAtivo) {
    await assetModel.updateSell(clientAsset); // Atualiza a quantia sob custodia 

    const { insertId } = await investmentsModel.createSellOrder(order);
  
    const sellOrder = { ...order, id: insertId };

    return sellOrder;
  } else {
    // throw new HttpException(400, 'Valor da venda é maior que a quantia sob custódia!');
    return { ...order, message: 'Valor da venda é maior que a quantia sob custódia!' }; 
  } */
};

export default {
  newBuyOrder,
  newSellOrder,
};