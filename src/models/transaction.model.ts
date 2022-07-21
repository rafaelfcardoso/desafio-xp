import connection from "../models/connection";
import { ResultSetHeader } from "mysql2";
import ITransaction from "../interfaces/transaction.interface";


const createDeposit = async (transaction: ITransaction): Promise<ResultSetHeader> => {
  const [ result ] = await connection.execute<ResultSetHeader>(`INSERT INTO desafio_xp.depositos (codCliente,
    valor) VALUES (?, ?)`,
   [transaction.codCliente, transaction.valor]);

 return result;
};

const createWithdraw = async (transaction: ITransaction): Promise<ResultSetHeader> => {
  const [ result ] = await connection.execute<ResultSetHeader>(`INSERT INTO desafio_xp.saques (codCliente,
    valor) VALUES (?, ?)`,
   [transaction.codCliente, transaction.valor]);

 return result;
};

export default {
  createDeposit,
  createWithdraw,
};