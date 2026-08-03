import "./lookbook.css";
import { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLookbook } from "../../services/lookbookService";
import LookBookCard from "../../components/lookbookCard";
import useEmblaCarousel from "embla-carousel-react";
import LookbookSection from "./lookbookSection";

export default function Lookbook({ config }) {
  const handle = config?.settings?.lookbookHandle;
  const { data: lookbook, loading, error } = useFetch(() => getLookbook(handle, config.settings.country), [handle]);
  
  return (
      <div>
          { (!loading && lookbook) ? 
              <LookbookSection config={config} lookbook={lookbook} />
              :
              (
                  <div className="page-width">
                      { loading && (<p> Loading lookbook...</p>)}
                      { error && (<p>Error loading lookbook.</p>)}
                      { !lookbook && (<p> No lookbook data. </p>)}
                  </div>
              )
          }
      </div>
  )
}