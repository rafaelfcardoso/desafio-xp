import ITransaction from "../interfaces/transaction.interface";
import transactionModel from "../models/transaction.model";


const createDeposit = async (deposit: ITransaction): Promise<ITransaction> => {
  const { insertId } = await transactionModel.createDeposit(deposit);

  const newDeposit = { ...deposit, id: insertId };

  return newDeposit;
}

const createWithdraw = async (withdraw: ITransaction): Promise<ITransaction> => {
  const { insertId } = await transactionModel.createWithdraw(withdraw);

  const newWithdraw = { ...withdraw, id: insertId };

  return newWithdraw;
}

export default {
  createDeposit,
  createWithdraw,
};