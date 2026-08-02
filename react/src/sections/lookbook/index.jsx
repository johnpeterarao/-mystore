import useFetch from "../../hooks/useFetch";

import {
  getLookbook
} from "../../services/lookbookService";


export default function Lookbook({
  config
}) {

  const handle =
    config?.settings?.lookbookHandle;

  console.log("COUNTRY", config.settings.country);

  const {
    data: lookbook,
    loading,
    error

  } = useFetch(
    () => getLookbook(handle, config.settings.country),
    [handle]
  );


  console.log("LOOKBOOK STATE", {
    handle,
    lookbook,
    loading,
    error
  });


  if (loading) {
    return (
      <section
        id={`lookbook-${config.sectionId}`}
        className="lookbook-section"
      >
        Loading lookbook...
      </section>
    );
  }


  if (error) {
    return (
      <section
        id={`lookbook-${config.sectionId}`}
        className="lookbook-section"
      >
        Error loading lookbook.
      </section>
    );
  }


  if (!lookbook) {
    return (
      <section
        id={`lookbook-${config.sectionId}`}
        className="lookbook-section"
      >
        No lookbook data.
      </section>
    );
  }


  const styles = {

    backgroundColor:
      config.settings.backgroundColor,

    color:
      config.settings.textColor,

    paddingTop:
      `${config.settings.paddingTop}px`,

    paddingBottom:
      `${config.settings.paddingBottom}px`

  };


  return (

    <section

      id={`lookbook-${config.sectionId}`}

      className="lookbook-section"

      style={styles}

    >

      <h2>
        {lookbook.title}
      </h2>


      <p>
        {lookbook.description}
      </p>


      <pre>
        {JSON.stringify(
          lookbook.products,
          null,
          2
        )}
      </pre>


    </section>

  );

}