import ITransaction from "../interfaces/transaction.interface";
import accountModel from "../models/account.model";
import HttpException from "../shared/http.exception";
import { StatusCodes } from "http-status-codes";

const isValidField = (order: ITransaction) => {
  if (!order.codCliente || typeof order.codCliente !== "number") return false;
  if (!order.valor || typeof order.valor !== "number") return false;

  return true;
};

const isValid = (order: ITransaction) => {
  if (order.valor <= 0) return false;

  return true;
};


const createDeposit = async (deposit: ITransaction): Promise<ITransaction> => {
  if (!isValidField(deposit)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos!");
  }

  if (!isValid(deposit)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Quantidade a ser depositada não poderá ser negativa ou igual a zero.");
  }

  const { insertId } = await accountModel.createDeposit(deposit);

  const newDeposit = { ...deposit, id: insertId };

  return newDeposit;
}

const createWithdraw = async (withdraw: ITransaction): Promise<ITransaction> => {
  if (!isValidField(withdraw)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos!");
  }

  if (!isValid(withdraw)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Quantidade a ser depositada não poderá ser negativa ou igual a zero.");
  }

  const { insertId } = await accountModel.createWithdraw(withdraw);

  const newWithdraw = { ...withdraw, id: insertId };

  return newWithdraw;
}

export default {
  createDeposit,
  createWithdraw,
};