export interface ICCategory {
    name:string,
    createdAt:Date,
    categoryType:CategoryType
}

export enum CategoryType{
    Men = 'Men',
    Women = 'Women',
    Children = 'Children'
}
