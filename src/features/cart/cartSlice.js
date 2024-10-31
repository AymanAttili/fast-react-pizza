import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            // state.cart = state.cart.map(item => {
            //     if (item.id === action.payload) {
            //         item.quantity++;
            //         item.totalPrice = item.unitPrice * item.quantity;
            //     }

            //     return item;
            // });

            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        decreaseItemQuantity(state, action) {
            // state.cart = state.cart.map(item => {
            //     if (item.id === action.payload) {
            //         item.quantity--;
            //         if (item.quantity == 0)
            //             return null;

            //         item.quantity++;
            //         item.totalPrice = item.unitPrice * item.quantity;
            //     }

            //     return item;
            // });
            const item = state.cart.find(item => item.pizzaId === action.payload);

            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity;

            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action);

        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export const getCartTotalQuantity = state => state.cart.cart.reduce((count, item) => count += item.quantity, 0)
export const getCartTotalPrice = state => state.cart.cart.reduce((count, item) => count += item.totalPrice, 0)
export const getCart = state => state.cart.cart;
export const getQuantity = (pizzaId) => {
    return state => state.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity || 0;
}
export default cartSlice.reducer;
