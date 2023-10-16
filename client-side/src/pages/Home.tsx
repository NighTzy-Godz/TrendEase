import { useDispatch, useSelector } from "react-redux";

import { State } from "../store/store";
import { useEffect } from "react";
import { getLatestProducts } from "../store/slices/product";
function Home() {
  const dispatch = useDispatch();

  const latestProducts = useSelector(
    (state: State) => state.entities.product.latestProducts
  );

  console.log(latestProducts);

  useEffect(() => {
    dispatch(getLatestProducts());
  }, []);

  return (
    <div>
      <h1>Im the Home</h1>
    </div>
  );
}

export default Home;
