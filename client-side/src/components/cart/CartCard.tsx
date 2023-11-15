import "./CartCard.css";
import Button, { ButtonSize } from "../common/Button";
import Counter from "../common/Counter";
import formatCurrency from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { cartQtyChange, deleteCart } from "../../store/slices/cart";

import { CartData } from "../../interfaces/cart";
import useDeviceWidth from "../../hooks/useDeviceWidth";

interface CartCardProps {
  data: CartData;
}

function CartCard({ data }: CartCardProps) {
  const { _id, item, quantity } = data || {};
  const { title, images = [], category, price } = item || {};

  const { deviceWidth } = useDeviceWidth();

  const dispatch = useDispatch();

  const handleIncrement = () => {
    const qty = quantity + 1;
    dispatch(cartQtyChange({ _id, qty }));
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    dispatch(cartQtyChange({ _id, qty }));
  };

  const handleCartDelete = () => {
    dispatch(deleteCart(_id));
  };

  if (deviceWidth < 575)
    return (
      <div className="cart_card">
        <div className="cart_card_left">
          <div className="cart_card_img">
            <img src={images[0]} alt="" />
          </div>
        </div>
        <div className="cart_card_right">
          <div className="cart_card_info">
            <h3>{title}</h3>
            <p>{category}</p>
          </div>

          <div className="cart_card_currPrice">
            <p>P {formatCurrency(price * quantity)}</p>
          </div>

          <div className="cart_card_counter">
            <Counter
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              qty={quantity}
            />
          </div>

          <div className="cart_card_delete">
            <Button
              handleClick={handleCartDelete}
              className="danger"
              size={ButtonSize.SMALL}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="cart_card">
      <div className="cart_card_img">
        <img src={images[0]} alt="" />
      </div>

      <div className="cart_card_info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <div className="cart_card_currPrice">
        <p>P {formatCurrency(price * quantity)}</p>
      </div>

      <div className="cart_card_counter">
        <Counter
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          qty={quantity}
        />
      </div>

      <div className="cart_card_delete">
        <Button
          handleClick={handleCartDelete}
          className="danger"
          size={ButtonSize.SMALL}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CartCard;
