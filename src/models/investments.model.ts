import { ResultSetHeader } from "mysql2";
import connection from "../models/connection";
import IOrderBody from '../interfaces/order.interface';


const createBuyOrder = async (order: IOrderBody): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(`INSERT INTO desafio_xp.ordens_de_compra (codCliente,
     codAtivo, qtdeAtivo) VALUES (?, ?, ?)`,
    [order.codCliente, order.codAtivo, order.qtdeAtivo]);

  return result;
};

export default {
  createBuyOrder,
};