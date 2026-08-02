import { storefrontFetch } from "./storefront";
import { GET_LOOKBOOK } from "../queries/lookbook";
import { getProducts } from "./productService";


function normalizeFields(fields) {
  return fields.reduce((result, field) => {
    result[field.key] = field.key == 'image' ? field?.reference?.image?.url : field.value;

    return result;
  }, {});
}


export async function getLookbook(handle, country) {
  if (!handle) return null;
  const data = await storefrontFetch( GET_LOOKBOOK, { handle } );

  if (!data?.metaobject) return null;
  console.log(data.metaobject.fields)
  const fields = normalizeFields(data.metaobject.fields);
  console.log(fields)
  const productHandles = fields.products ? JSON.parse(fields.products) : [];
  const products = await getProducts( productHandles, country);

  return {
    title: fields.title ?? "",
    description: fields.description ?? "",
    image: fields.image ?? null,
    products
  };
}