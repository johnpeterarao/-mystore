import { storefrontFetch } from "./storefront";
import { GET_PRODUCT_BY_HANDLE } from "../queries/product";


export async function getProducts( handles, country ) {
  if (!handles || handles.length === 0) return [];

  const products = await Promise.all(
    handles.map(async (handle) => {
      const data = await storefrontFetch( GET_PRODUCT_BY_HANDLE, { handle, country });

      return data.product;
    })
  );

  console.log(products)
  return products.filter(Boolean).map(product => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      image: product.featuredImage?.url ?? null,
      price: product.priceRange?.minVariantPrice
    }));
}