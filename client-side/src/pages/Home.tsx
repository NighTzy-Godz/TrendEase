import { useDispatch, useSelector } from "react-redux";

import { State } from "../store/store";
import { useEffect } from "react";
import { getLatestProducts, getTopProducts } from "../store/slices/product";
function Home() {
  const dispatch = useDispatch();

  const latestProducts = useSelector(
    (state: State) => state.entities.product.latestProducts
  );

  const topProducts = useSelector(
    (state: State) => state.entities.product.topProducts
  );

  console.log(latestProducts);
  console.log(topProducts);

  useEffect(() => {
    dispatch(getLatestProducts());
    dispatch(getTopProducts());
  }, []);

  return (
    <div>
      <h1>Im the Home</h1>
    </div>
  );
}

export default Home;
