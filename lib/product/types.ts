type ProductImage = {
    imageType: 'main' | 'detail';
    caption: string;
    imageUrl: string;
}
export type ProductFormData = {
    brandName: string;
    productName: string;
    ingredients: string[];
    keyFeatures: string[];
    regularPrice: string;
    salePrice: string;
    images: ProductImage[];
}