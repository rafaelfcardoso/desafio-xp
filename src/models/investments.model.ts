import { ResultSetHeader } from "mysql2";
import connection from "../models/connection";
import IOrderBody from '../interfaces/order.interface';


const create = async (order: IOrderBody): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(`INSERT INTO desafio_xp.ordens (codCliente,
     codAtivo, qtdeAtivo) VALUES (?, ?, ?)`,
    [order.codCliente, order.codAtivo, order.qtdeAtivo]);

  console.log('Model Result:', result);

  return result;
};

export default {
  create,
};