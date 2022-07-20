import connection from "../models/connection";
import IBrokerAssets from "../interfaces/brokerAssets.interface";


const getByCode = async (codAtivo: number): Promise<IBrokerAssets> => {
  const [rows] = await connection.execute(
      'SELECT (codAtivo, qtdeAtivo, valor) FROM desafio_xp.ativos_corretora WHERE codAtivo = ?', [codAtivo],
  );
  const [asset] = rows as IBrokerAssets[];
  return asset as IBrokerAssets;
}

export default {
  getByCode,
};