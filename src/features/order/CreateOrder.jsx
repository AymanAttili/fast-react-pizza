import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartTotalPrice } from "../cart/cartSlice";
import EmptyCart from '../cart/EmptyCart.jsx'
import store from '../../store.js'
import { formatCurrency } from "../../utils/helpers.js";
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getCartTotalPrice);
  const { username, address, status, position, error } = useSelector(state => state.user);


  const dispatch = useDispatch();
  const navigation = useNavigation()
  const formErrors = useActionData();

  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const isSubmitting = navigation.state === 'submitting'

  const handleGetAddress = (e) => {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length)
    return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&apos;s go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username.split(' ')[0]}
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <h6 className="text-xs mt-2 p-2 text-red-700 bg-red-100 rounded-md">{formErrors.phone}</h6>}

          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"
              type="text" name="address" disabled={status === 'loading'} defaultValue={address} required />
            {status === 'error' && <h6 className="text-xs mt-2 p-2 text-red-700 bg-red-100 rounded-md">{error}</h6>}

          </div>
          {!position.latitude && !position.longitude &&
            <span className="absolute right-[3px] top-[3px] md:top-[5px] md:right-[5px]">
              <Button type='small' onClick={handleGetAddress}>{
                status === 'idle' ? 'Get Address'
                  : status === 'error' ? 'Error ❌'
                    : 'Loading ...'
              }</Button>
            </span>
          }
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={(position.latitude && position.longitude) ? `${position.latitude}, ${position.longitude}` : ''} />
          <Button type="primary" disabled={isSubmitting || status === 'loading'}>
            {isSubmitting ? 'Placing order...' : `Order now (${formatCurrency(totalPrice + priorityPrice)})`}
          </Button>
        </div>

      </Form >
    </div >
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = await Object.fromEntries(formData)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your phone number, We might need it to contact you."
  }

  if (Object.keys(errors).length > 0)
    return errors

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
