import ITransaction from "../interfaces/transaction.interface";
import accountModel from "../models/account.model";


const createDeposit = async (deposit: ITransaction): Promise<ITransaction> => {
  const { insertId } = await accountModel.createDeposit(deposit);

  const newDeposit = { ...deposit, id: insertId };

  return newDeposit;
}

const createWithdraw = async (withdraw: ITransaction): Promise<ITransaction> => {
  const { insertId } = await accountModel.createWithdraw(withdraw);

  const newWithdraw = { ...withdraw, id: insertId };

  return newWithdraw;
}

export default {
  createDeposit,
  createWithdraw,
};