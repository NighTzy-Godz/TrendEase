import "../../assets/css/common/Counter.css";

interface CounterProps {
  handleIncrement: () => void;
  qty: number;
  handleDecrement: () => void;
}

function Counter({ handleDecrement, handleIncrement, qty }: CounterProps) {
  return (
    <div className="counter">
      <button onClick={handleIncrement}>+</button>
      <input type="text" value={qty} readOnly />
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}

export default Counter;
