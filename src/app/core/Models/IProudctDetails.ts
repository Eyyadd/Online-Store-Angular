export interface IProudctDetails
{
  productID: number,
  name: string,
  seller: string,
  price: number,
  categoryName: string,
  coverImage:string,
  variants: [
    {
      id: number,
      color: string,
      size: string,
      quantity: number,
      image: string
    }
  ]
}
