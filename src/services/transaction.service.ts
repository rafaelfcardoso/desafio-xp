import ITransaction from "../interfaces/transaction.interface";
import transactionModel from "../models/transaction.model";


const createDeposit = async (deposit: ITransaction): Promise<ITransaction> => {
  const { insertId } = await transactionModel.createDeposit(deposit);

  const newDeposit = { ...deposit, id: insertId };

  return newDeposit;
}

export default {
  createDeposit,
};