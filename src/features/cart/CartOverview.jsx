import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getCartTotalQuantity } from "./cartSlice";
import { formatCurrency } from '../../utils/helpers'
function CartOverview() {
  const numOfPizzas = useSelector(getCartTotalQuantity);
  const totalPrice = useSelector(getCartTotalPrice);

  if (!numOfPizzas)
    return null;
  return (
    <div className="p-4 sm:px-6 bg-stone-800 text-stone-200 text-sm md:text-base uppercase flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{numOfPizzas} pizzas</span>
        <span>${formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
