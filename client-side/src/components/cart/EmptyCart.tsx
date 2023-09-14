import { Link } from "react-router-dom";
import "./EmptyCart.css";
function EmptyCart() {
  return (
    <div className="empty_cart">
      <div className="container">
        <div className="text">
          <h1>No Items on your shopping cart</h1>
          <p>
            {" "}
            <Link to="/products">Click here </Link> to continue shopping!
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
