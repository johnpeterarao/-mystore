import "./lookbook.css";
import useFetch from "../../hooks/useFetch";
import { getLookbook } from "../../services/lookbookService";
import LookBookCard from "../../components/lookbookCard";
import useEmblaCarousel from "embla-carousel-react";

export default function Lookbook({ config }) {
  const handle = config?.settings?.lookbookHandle;
  const { data: lookbook, loading, error } = useFetch(() => getLookbook(handle, config.settings.country), [handle]);
  const [ emblaRef ] = useEmblaCarousel({ loop: true, align: "start" });

  const sectionStyles = {
    backgroundColor:
      config.settings.backgroundColor,
    color:
      config.settings.textColor,
    paddingTop:
      `${config.settings.paddingTop}px`,
    paddingBottom:
      `${config.settings.paddingBottom}px`
  };

  const textStyles = {
    color:
      config.settings.textColor,
  }

  return (
    <section id={`lookbook-${config.sectionId}`} className="lookbook-section" style={sectionStyles}>
      <div className="page-width">
        { loading && (<p> Loading lookbook...</p>)}
        { error && (<p>Error loading lookbook.</p>)}
        { !lookbook && (<p> No lookbook data. </p>)}
        { (!loading && lookbook) && (
          <>
            <div className="lookbook-hldr">
              <div className="lookbook-text">
                <h2 style={textStyles}> {lookbook.title} </h2>
                { lookbook?.description ? <p style={textStyles}> {lookbook.description} </p> : ''} 
              </div>
              <div className="lookbook-media">
                <img src={lookbook.image} alt={lookbook.title} loading="lazy"/>
              </div>
              <div className="lookbook-products">
                <div className="lookbook-slider" ref={emblaRef}>
                  <div className="lookbook-products_slider lookbook-slider-track">
                    { lookbook?.products?.map((product, ind) => (
                      <div key={ind} className="lookbook-slide">
                        <LookBookCard product={product} country={config.settings.country} textColor={config.settings.textColor}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>

  );

}