import IClient from "../interfaces/client.interface";
import clientModel from "../models/client.model";

const getByCodeClient = (codClient: number): Promise<IClient> => {
  return clientModel.getByCode(codClient);
}

export default {
  getByCodeClient,
};