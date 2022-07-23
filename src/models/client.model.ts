import connection from "../models/connection";
import IClient from "../interfaces/client.interface";
import ILogin from "../interfaces/login.interface";


const getByCode = async (codCliente: number): Promise<IClient> => {
  const [rows] = await connection.execute(
      'SELECT * FROM desafio_xp.pessoa_cliente WHERE codCliente = ?', [codCliente],
  );
  const [client] = rows as IClient[];
  return client as IClient;
}

const getAll = async (): Promise<ILogin[]> => {
  const [rows] = await connection.execute('SELECT * FROM desafio_xp.pessoa_cliente');

  return rows as ILogin[];
};

const getByUsername = async (username: string): Promise<ILogin[]> => {
  const query = 'SELECT username, senha FROM desafio_xp.pessoa_cliente WHERE username=?;';

  const [users] = await connection.execute(query, [username]);

  return users as unknown as ILogin[];
};

export default {
  getAll,
  getByCode,
  getByUsername
};