import connection from "../models/connection";
import IClient from "../interfaces/client.interface";
import { ResultSetHeader } from "mysql2";


const getByCode = async (codCliente: number): Promise<IClient> => {
  const [rows] = await connection.execute(
      'SELECT * FROM desafio_xp.pessoa_cliente WHERE codCliente = ?', [codCliente],
  );
  const [client] = rows as IClient[];
  return client as IClient;
}

const updateDeposit = async (client: IClient, valor: number): Promise<ResultSetHeader> => {
  const [ result ] = await connection.execute<ResultSetHeader>(
      `UPDATE desafio_xp.pessoa_cliente
      SET saldo = saldo + ?
      WHERE codCliente = ?`,
      [valor, client.codCliente]
    );
  
    return result;
}

export default {
  getByCode,
  updateDeposit,
};