import connection from "../models/connection";
import IBrokerAsset from "../interfaces/brokerAssets.interface";


const getByCode = async (codAtivo: number): Promise<IBrokerAsset> => {
  const [rows] = await connection.execute(
      'SELECT (codAtivo, qtdeAtivo, valor) FROM desafio_xp.ativos_corretora WHERE codAtivo = ?', [codAtivo],
  );
  const [asset] = rows as IBrokerAsset[];
  return asset as IBrokerAsset;
}

export default {
  getByCode,
};