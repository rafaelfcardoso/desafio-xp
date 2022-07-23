import IClient from "../interfaces/client.interface";
import ILogin from "../interfaces/login.interface";
import clientModel from "../models/client.model";

const getByCodeClient = (codClient: number): Promise<IClient> => {
  return clientModel.getByCode(codClient);
}

const getAllLogin = (): Promise<ILogin[]> => clientModel.getAll();

const getByUsername = (username: string): Promise<ILogin[]> => clientModel.getByUsername(username);

export default {
  getByCodeClient,
  getAllLogin,
  getByUsername,
};