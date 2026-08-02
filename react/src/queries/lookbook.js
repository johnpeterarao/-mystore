export const GET_LOOKBOOK = `
query GetLookbook($handle: String!) {

  metaobject(
    handle:{
      type:"lookbook",
      handle:$handle
    }
  ) {

    fields{

      key

      value

    }

  }

}
`;