import connection from "../models/connection";
import IClient from "../interfaces/client.interface";


const getByCode = async (codCliente: number): Promise<IClient> => {
  const [rows] = await connection.execute(
      'SELECT * FROM desafio_xp.pessoa_cliente WHERE codCliente = ?', [codCliente],
  );
  const [client] = rows as IClient[];
  return client as IClient;
}

export default {
  getByCode,
};