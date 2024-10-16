export interface IProductVariant
{
   color:string,
   Sizes:ISizeQuantity[]
}


export interface ISizeQuantity
{
  id:number,
  size:string ,
  quantity:number
}
