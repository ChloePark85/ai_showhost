'use client'
import Image from "next/image";
import { useState } from "react";
import { getInitialFormData, getProductDataFromUrl } from "@/lib/product/functions";
import { ProductFormData } from "@/lib/product/types";
import { useRouter } from "next/navigation";
import ProfileImageSelector from "@/components/ui/ProfileSelector";
import VoiceSelector from "@/components/ui/VoiceSelector";

export default function Page() {
    const router = useRouter()


    const [urlLoading, setUrlLoading] = useState(false)
    const [regLoading, setRegLoading] = useState(false)
    const [productUrl, setProductUrl] = useState('')
    const [formData, setFormData] = useState<ProductFormData>(getInitialFormData())


    const handleGetProductDataFromUrl = async () => {
        try {
            setUrlLoading(true)
            const productData = await getProductDataFromUrl(productUrl)
            setFormData(productData)
            setUrlLoading(false)
            setProductUrl('')
        } catch (error) {
            console.error('Error fetching product data:', error)
        } finally {
            setUrlLoading(false)
        }
    }
    const handleAddIngredient = () => {
        const ingredientInput = document.getElementById('ingredient') as HTMLInputElement
        const ingredient = ingredientInput.value.trim()
        if (ingredient) {
            setFormData({ ...formData, ingredients: [...formData.ingredients, ingredient] })
            ingredientInput.value = ''
        }
    }
    const handleAddKeyFeature = () => {
        const keyFeatureInput = document.getElementById('keyFeature') as HTMLInputElement
        const keyFeature = keyFeatureInput.value.trim()
        if (keyFeature) {
            setFormData({ ...formData, keyFeatures: [...formData.keyFeatures, keyFeature] })
            keyFeatureInput.value = ''
        }
    }

    const handleDeleteImage = (index: number) => {
        setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
    }

    const handleRegisterProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Register Product')
        setRegLoading(true)
        try {
            //wait for 3 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push('/product/aestura')
        } catch (error) {
            console.log(error)
            alert('An error occurred during the registration')
            setRegLoading(false)
        }
    }
    return (
        <div className="w-full flex justify-center">
            <div className="container flex flex-col gap-4 px-4 px-0:md">
                <div className="text-2xl font-bold py-8 ">
                    Product Management System
                </div>



                <form className="flex flex-col gap-8 mb-40" onSubmit={handleRegisterProduct}>
                    <div className="divider"></div>
                    <div className="text-xl font-bold">Product</div>
                    <div className="flex gap-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Product URL</span>
                                {urlLoading && <span className="loading loading-spinner loading-xs"></span>}
                            </div>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                    disabled={urlLoading || regLoading}
                                    value={productUrl}
                                    onChange={(e) => setProductUrl(e.target.value)} />
                                <button type="button" className="btn"
                                    disabled={urlLoading || regLoading}
                                    onClick={handleGetProductDataFromUrl}>GET</button>
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold">
                            Basic Information
                        </div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Brand Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Brand Name"
                                className="input input-bordered w-full max-w-xs"
                                required
                                value={formData.brandName}
                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                disabled={regLoading}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Product Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                className="input input-bordered w-full max-w-xs"
                                required
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                disabled={regLoading}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Ingredients</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    id="ingredient"
                                    type="text"
                                    placeholder="Enter Product Ingredient"
                                    className="input input-bordered w-full max-w-xs"
                                    disabled={regLoading}
                                />
                                <button type="button" className="btn"
                                    onClick={handleAddIngredient}
                                    disabled={regLoading}
                                >Add</button>
                            </div>
                            <div className="flex gap-2 flex-wrap pt-4">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="badge badge-outline">{ingredient}</div>
                                ))}

                            </div>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Key Features</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    id="keyFeature"
                                    type="text"
                                    placeholder="Enter Key Features"
                                    className="input input-bordered w-full max-w-xs"
                                    disabled={regLoading}
                                />
                                <button type="button" className="btn"
                                    onClick={handleAddKeyFeature}
                                    disabled={regLoading}
                                >Add</button>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap pt-4">
                                {formData.keyFeatures.map((keyFeature, index) => (
                                    <div key={index} className="badge badge-outline">{keyFeature}</div>
                                ))}
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold">
                            Price Information
                        </div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Regular Price</span>
                            </div>
                            <input
                                type="number"
                                className="input input-bordered w-full max-w-xs"
                                required
                                value={formData.regularPrice}
                                onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                                disabled={regLoading}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Sale Price</span>
                            </div>
                            <input
                                type="number"
                                className="input input-bordered w-full max-w-xs"
                                required
                                value={formData.salePrice}
                                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                                disabled={regLoading}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold">
                            Image Information
                        </div>
                        {/* Image Upload - 
                        input type file.
                        when image is uploaded, show the thumbnail and the delete button */}
                        {/* Uploaded Image list */}

                        <div className="flex flex-col gap-2">
                            {formData.images.map((img, index) => {
                                return (
                                    <div className="flex gap-4 border rounded p-4 justify-between" key={index}>
                                        <div className="flex gap-4">
                                            <Image src={img.imageUrl} alt={img.caption} width={100} height={100}
                                                className="rounded" />
                                            <div>
                                                <div><span className="font-bold">Image Type:</span> <span className="badge badge-outline">{img.imageType}</span> </div>
                                                <div><span className="font-bold">Caption:</span> {img.caption}</div>
                                            </div>
                                        </div>

                                        <button type="button" className="btn" onClick={() => handleDeleteImage(index)}
                                            disabled={regLoading}
                                        >Delete</button>
                                    </div>


                                )
                            })}
                        </div>
                        {/* Image Upload */}
                        <div className="border rounded flex flex-col gap-4 p-4">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Image File</span>
                                </div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    disabled={regLoading}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Image Type</span>
                                </div>
                                <select className="select select-bordered"
                                    disabled={regLoading}
                                >
                                    <option disabled selected>Pick one</option>
                                    <option>Main Image</option>
                                    <option>Detail Image</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Caption</span>
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    disabled={regLoading}
                                />
                            </label>
                            <button type="button" className="btn"
                                disabled={regLoading}
                            >Add Image</button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-bold">AI Host</div>
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-bold">Profile Image</div>
                            <ProfileImageSelector />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-bold">Voice</div>
                            <VoiceSelector />
                            {/* <div className="flex p-4 border rounded">
                                <div role="tablist" className="tabs tabs-boxed flex flex-col w-60">
                                    <a role="tab" className="tab w-full">Tab 1</a>
                                    <a role="tab" className="tab tab-active w-full">Tab 2</a>
                                    <a role="tab" className="tab w-full">Tab 3</a>
                                </div>
                                <div>
                                    <div>
                                        <div>voice Name</div>
                                        <div>voice Description</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <input type="submit" className="btn my-12" disabled={regLoading} value={regLoading ? 'Generating...' : 'Generate AI Host'} />
                </form>
            </div>
        </div>
    )
}
