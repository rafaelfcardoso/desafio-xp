import { ResultSetHeader } from "mysql2";
import connection from "../models/connection";
import IOrderBody from '../interfaces/order.interface';


const create = async (order: IOrderBody) => {
  const [result] = await connection.execute<ResultSetHeader>(
    `
  INSERT INTO desafio_xp.ordens
    (codCliente, codAtivo, qtdeAtivo)
  VALUES
    (?, ?, ?)`,
    [order.codCliente, order.codAtivo, order.qtdeAtivo],
  );
  return result;
};

export default {
  create,
};