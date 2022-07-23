export default interface IOrderBody {
  id?: number,
  codCliente: number,
  codAtivo: number,
  qtdeAtivo: number,
  valor?: number,
  message?: string
}