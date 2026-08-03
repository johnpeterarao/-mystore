import { SHOPIFY } from "../constants/constants";

export async function storefrontFetch(query, variables = {}) {
    const response = await fetch(`${SHOPIFY.SHOP}/api/2025-10/graphql.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": SHOPIFY.TOKEN
            },
            body: JSON.stringify({
                query,
                variables
            })
        }
    );

    const json = await response.json();

    if (json.errors) {
        console.error(json.errors);
    }

    return json.data;
}