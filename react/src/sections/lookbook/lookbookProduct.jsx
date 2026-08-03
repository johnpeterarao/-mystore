import "./lookbook.css";
import { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getMetaObjects } from "../../services/lookbookService";
import LookbookSection from "./lookbookSection";

export default function LookbookProduct({ config }) {
    const handle = config?.settings?.lookbookHandle;
    const { data: lookbooks, loading, error } = useFetch(() => getMetaObjects(handle));
    
    return (
        <div>
            { (!loading && lookbooks) ? 
                lookbooks.map(lookbook => (
                    <LookbookSection config={config} lookbook={lookbook} />
                ))
                :
                (
                    <div className="page-width">
                        { loading && (<p> Loading lookbook...</p>)}
                        { error && (<p>Error loading lookbook.</p>)}
                        { !lookbooks && (<p> No lookbooks data. </p>)}
                    </div>
                )
            }
        </div>
    )
}