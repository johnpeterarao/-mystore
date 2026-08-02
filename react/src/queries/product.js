export const GET_PRODUCT_BY_HANDLE = `
query GetProduct(
  $handle: String!
  $country: CountryCode
) @inContext(country: $country) {

  product(handle: $handle) {

    id

    handle

    title

    featuredImage {
      url
      altText
    }

    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }

  }

}
`;