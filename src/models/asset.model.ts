import connection from "../models/connection";
import { IBrokerAsset, IAssetValue} from "../interfaces/brokerAssets.interface";
import IClientAsset from "../interfaces/clientAssets.interface";
import { ResultSetHeader } from "mysql2";


const getByCode = async (codAtivo: number): Promise<IBrokerAsset> => {
  const [rows] = await connection.execute(
      'SELECT codAtivo, qtdeAtivo, valor FROM desafio_xp.ativos_corretora WHERE codAtivo = ?', [codAtivo],
  );
  const [asset] = rows as IBrokerAsset[];
  return asset as IBrokerAsset;
}

const getValueById = async (codAtivo: number): Promise<IAssetValue> => {
  const [result] = await connection.execute(
      'SELECT valor FROM desafio_xp.ativos_corretora WHERE codAtivo = ?', [codAtivo],
  );
  const [value] = result as IAssetValue[];

  return value as IAssetValue;
}

const getByClient = async (codCliente: number): Promise<IClientAsset[]> => {
  const [rows] = await connection.execute(
      'SELECT codCliente, codAtivo, qtdeAtivo, valor FROM desafio_xp.ativos_cliente WHERE codCliente = ?', [codCliente],
  );
  // console.log(rows);
  const client = rows as IClientAsset[];
  
  // console.log(client);
  return client as IClientAsset[];
}

const newInvestment = async (investment: IClientAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(`INSERT INTO desafio_xp.ativos_cliente(codCliente,
     codAtivo, qtdeAtivo, valor) VALUES (?, ?, ?, ?)`,
    [investment.codCliente, investment.codAtivo, investment.qtdeAtivo, investment.valor]);

  return result;
};

const updateBuy = async (investment: IClientAsset): Promise<ResultSetHeader> => {
  const [ result ] = await connection.execute<ResultSetHeader>(
      `UPDATE desafio_xp.ativos_cliente
      SET qtdeAtivo = qtdeAtivo + ?
      WHERE codCliente = ?`,
      [investment.qtdeAtivo, investment.codCliente]
    );
  
    return result;
}

const updateSell = async (investment: IClientAsset): Promise<ResultSetHeader> => {
  const [ result ] = await connection.execute<ResultSetHeader>(
      `UPDATE desafio_xp.ativos_cliente
      SET qtdeAtivo = qtdeAtivo - ?
      WHERE codCliente = ?`,
      [investment.qtdeAtivo, investment.codCliente]
    );
  
    return result;
}

export default {
  getByCode,
  getValueById,
  getByClient,
  newInvestment,
  updateBuy,
  updateSell
};