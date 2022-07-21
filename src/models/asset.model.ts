import connection from "../models/connection";
import IBrokerAsset from "../interfaces/brokerAssets.interface";
import IClientAsset from "../interfaces/clientAssets.interface";


const getByCode = async (codAtivo: number): Promise<IBrokerAsset> => {
  const [rows] = await connection.execute(
      'SELECT codAtivo, qtdeAtivo, valor FROM desafio_xp.ativos_corretora WHERE codAtivo = ?', [codAtivo],
  );
  const [asset] = rows as IBrokerAsset[];
  return asset as IBrokerAsset;
}

const getByClient = async (codCliente: number): Promise<IClientAsset> => {
  const [rows] = await connection.execute(
      'SELECT codCliente, codAtivo, qtdeAtivo, valor FROM desafio_xp.ativos_cliente WHERE codCliente = ?', [codCliente],
  );
  const [client] = rows as IClientAsset[];
  return client as IClientAsset;
}

export default {
  getByCode,
  getByClient,
};