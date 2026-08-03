export const GET_LOOKBOOK = `
query GetLookbook($handle: String!) {
  metaobject( handle: { type: "lookbook", handle: $handle }) {
    fields {
      key
      value

      reference {
        ... on MediaImage {
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }

}
`;

export const GET_METAOBJECTS = `
query {
  metaobjects(type: "lookbook", first: 15) {
    nodes {
      id
      handle
      fields {
        key
        value
      }
    }
  }
}
`;

export const GET_LOOKBOOKS = `
query GetLookbooks($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Metaobject {
      id
      handle
      fields {
        key
        value

        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
}
`;