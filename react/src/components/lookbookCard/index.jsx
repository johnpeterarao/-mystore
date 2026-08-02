import { formatPrice } from "../../utils/priceFormatter";
import "./lookbookCard.css";

export default function LookBookCard({ product, country, textColor }) {
    const cardTextColor = {
        color: textColor
    }
    return (
        <div className="lookbook-card">
            <div className="lookbook-card-image">
                <img
                    src={product.image}
                    alt={product.title}
                />
            </div>
            <h3 style={cardTextColor}>{product.title}</h3>
            <p style={cardTextColor}>{formatPrice(product.price?.amount, product.price?.currencyCode, country)}</p>
            
        </div>
    )
}