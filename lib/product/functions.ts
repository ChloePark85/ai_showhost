import { ProductFormData } from "./types";

export const getInitialFormData = () => {
    return {
        brandName: '',
        productName: '',
        ingredients: [],
        keyFeatures: [],
        regularPrice: '',
        salePrice: '',
        images: [],
    } as ProductFormData
}

export const getProductDataFromUrl = async (url: string) => {
    // return a product data from the url after 2seconds.
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(url)
    const ingredients = ['Water', 'Butylene Glycol', 'Glycerin', 'Butylene Glycol Dicaprylate/Dicaprate', 'Cetyl Ethylhexanoate', 'Squalane', 'Pentaerythrityl Tetraisostearate', 'Dicaprylyl Carbonate', 'Behenyl Alcohol', 'Dimethicone', 'Hydroxypropyl Bispalmitamide MEA', 'Stearic Acid', 'Betaine', 'Mannitol', 'C14-22 Alcohols', 'Palmitic Acid', 'Hydroxypropyl Bislauramide MEA', 'Arachidyl Alcohol', 'Cholesterol', 'Polyacrylate-13', 'C12-20 Alkyl Glucoside', 'Allantoin', 'Arachidyl Glucoside', 'Niacinamide', 'Ceramide NP', 'Glyceryl Caprylate', 'Ethylhexylglycerin', 'Hydrogenated Polyisobutene', 'Carbomer', 'Tromethamine', 'Dimethiconol', 'Polyglyceryl-10 Laurate', 'Hydrogenated Lecithin', 'Ethylhexyl Palmitate', 'Acrylates/Ammonium Methacrylate Copolymer', 'Sorbitan Isostearate', 'Silica', 'Phytosphingosine', 'Sphingolipids', 'Arachidic Acid', 'Tocopherol', 'Oleic Acid']
    return {
        brandName: 'AESTURA',
        productName: 'AESTURA Atobarrier365 Cream 80ml Double Set',
        ingredients,
        keyFeatures: ['Intensified hydration with high-density ceramide capsules', 'Long-chain ceramides for sensitive skin', '120-hour lasting hydration', 'Dermatologically tested'],
        regularPrice: '50000',
        salePrice: '45000',
        images: [
            {
                imageType: 'main',
                caption: `A white tube of AESTURA ATOBARRIER365 Cream showing the product packaging design with blue accents. The label indicates it's a moisturizing cream with ceramide for dry & sensitive skin, featuring a circular certification emblem.`,
                imageUrl: '/images/product/AESTURA/Atobarrier365_main01.png',
            },
            {
                imageType: 'detail',
                caption: `Side-by-side comparison showing the upgrade of AESTURA ATOBARRIER365 Cream. The left shows the original gray design, and the right shows the new white design with 'NEW' label, connected by a blue arrow labeled 'UPGRADE'.`,
                imageUrl: '/images/product/AESTURA/Atobarrier365_main02.png',
            },
            {
                imageType: 'detail',
                caption: `Close-up product demonstration showing white cream being applied to skin, displaying the texture and consistency of AESTURA ATOBARRIER365 Cream.`,
                imageUrl: '/images/product/AESTURA/Atobarrier365_main03.webp',
            },
            {
                imageType: 'detail',
                caption: `Marketing infographic on blue background showing the ATOBARRIER365 Cream tube alongside white cream texture. The infographic explains product development motivation and features, highlighting ceramide technology and sensitive skin focus.`,
                imageUrl: '/images/product/AESTURA/Atobarrier365_main04.jpg',
            },
            {
                imageType: 'detail',
                caption: `Product demonstration photo showing the AESTURA ATOBARRIER365 Cream tube being held next to a face with a small amount of white cream applied to the cheek, demonstrating the application method.`,
                imageUrl: '/images/product/AESTURA/Atobarrier365_use01.jpg',
            }
        ]
    } as ProductFormData
}