import Lookbook from "./sections/Lookbook";

const sectionRegistry = {
  lookbook: Lookbook,
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