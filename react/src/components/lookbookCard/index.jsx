import { formatPrice } from "../../utils/priceFormatter";
import "./lookbookCard.css";

export default function LookBookCard({ product, textColor }) {
    const cardTextColor = {
        color: textColor
    }

    return (
        <div className="lookbook-card">
            <div className="lookbook-card-image">
                <a href={`/products/${product.handle}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                    />
                </a>
            </div>
            <div className="lookbook-card-text">
                <h3 style={cardTextColor}><a href={`/products/${product.handle}`}>{product.title}</a></h3>
                <p style={cardTextColor}>{formatPrice(product.price?.amount, product.price?.currencyCode)}</p>
            </div>
            
        </div>
    )
}