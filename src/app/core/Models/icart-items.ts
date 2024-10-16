// cart-item.model.ts

export interface CartItems {
    cartItemId: number;
    productVariantId: number;
    productName: string;
    size: Size;
    color: Color;
    cartProductQuantity: number;
    price: number;
    productImage: string;
  }
  
// enums.ts

export enum Color {
    Red = 'Red',
    Blue = 'Blue',
    Green = 'Green',
    Yellow = 'Yellow',
    Black = 'Black',
    White = 'White',
    Gray = 'Gray',
    Brown = 'Brown',
    Orange = 'Orange',
    Pink = 'Pink',
    Purple = 'Purple'
}

export enum Size {
    XXS = 'XXS',
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
    XXXL = 'XXXL',
    Size28 = 28,
    Size30 = 30,
    Size32 = 32,
    Size34 = 34,
    Size36 = 36,
    Size38 = 38,
    Size40 = 40
}

  