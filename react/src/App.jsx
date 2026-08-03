import Lookbook from "./sections/Lookbook";
import LookbookProduct from "./sections/lookbook/lookbookProduct";

const sectionRegistry = {
  lookbook: Lookbook,
  lookbookProduct: LookbookProduct
};

export default function App({ config }) {
  const Section = sectionRegistry[config.sectionType];
  console.log(config);
  if (!Section) {
    console.log(`unregistered section`);
    return null;
  }

  return <Section config={config} />;
}