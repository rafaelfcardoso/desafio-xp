import IBrokerAsset from "../interfaces/brokerAssets.interface";
import assetModel from "../models/asset.model";

const getByCodeAsset = (codAtivo: number): Promise<IBrokerAsset> => {
  return assetModel.getByCode(codAtivo);
}

export default {
  getByCodeAsset,
};