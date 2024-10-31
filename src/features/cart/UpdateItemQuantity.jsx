import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, getQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getQuantity(pizzaId))
    return (
        <div className="flex gap-1 md:gap-3 items-center">
            <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            {currentQuantity}
            <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity