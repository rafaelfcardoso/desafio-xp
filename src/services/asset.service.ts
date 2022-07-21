import IBrokerAsset from "../interfaces/brokerAssets.interface";
import IClientAsset from "../interfaces/clientAssets.interface";
import assetModel from "../models/asset.model";

const getByCodeAsset = (codAtivo: number): Promise<IBrokerAsset> => {
  return assetModel.getByCode(codAtivo);
}

const getByClient = (codCliente: number): Promise<IClientAsset> => {
  return assetModel.getByClient(codCliente);
}

export default {
  getByCodeAsset,
  getByClient,
};