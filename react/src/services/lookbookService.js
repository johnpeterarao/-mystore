import { storefrontFetch } from "./storefront";
import { GET_LOOKBOOK, GET_METAOBJECTS, GET_LOOKBOOKS } from "../queries/lookbook";
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
  const fields = normalizeFields(data.metaobject.fields);
  const productHandles = fields.products ? JSON.parse(fields.products) : [];
  const products = await getProducts( productHandles, country);

  return {
    title: fields.title ?? "",
    description: fields.description ?? "",
    image: fields.image ?? null,
    products
  };
}

function filterMetaObjects(handle, data) {
  let matchedLookBooks = [];
  
  data?.metaobjects?.nodes.forEach((metaobject) => {
    const productsField = metaobject.fields.find((field) => field.key === "products");
    const products = JSON.parse(productsField.value);
    
    if (!products.length) return;

    if (products.includes(handle) && matchedLookBooks.length < 2) {
      matchedLookBooks.push(metaobject.id);
    }
  });

  return matchedLookBooks;
}

async function dataMappingPerLookBook(data) {
  const lookbooks = await Promise.all(
    data.map(async (item) => {
      return await getLookbook(item.handle, window.selectedCountry);
    })
  );

  return lookbooks;
}

export async function getMetaObjects(handle) {
  const data = await storefrontFetch( GET_METAOBJECTS, { } );
  const filteredLookBooks = await filterMetaObjects(handle, data);
  const lookbooksData = await storefrontFetch( GET_LOOKBOOKS, { ids: filteredLookBooks } );
  const lookbooksMappedData = await dataMappingPerLookBook(lookbooksData?.nodes);


  return [...lookbooksMappedData];
}