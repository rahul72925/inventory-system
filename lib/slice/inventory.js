import { priceCurrencyRemover } from "@/utils/price";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalProducts: 0,
  totalStoreValue: 0,
  outOfStock: 0,
  categories: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory: (state, action) => {
      state.products = action.payload;
      state.totalProducts = action.payload.length;
      state.totalStoreValue = action.payload.reduce(
        (acc, product) => acc + priceCurrencyRemover(product.value),
        0
      );
      state.outOfStock = action.payload.filter(
        (product) => product.quantity === 0
      ).length;
      state.categories = [
        ...new Set(action.payload.map((product) => product.category)),
      ];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload
      );
      state.totalProducts--;
      const deletedProduct = state.products.find(
        (product) => product.name === action.payload
      );
      state.totalStoreValue -= deletedProduct.price * deletedProduct.quantity;
      if (deletedProduct.quantity === 0) {
        state.outOfStock--;
      }
      state.categories = [
        ...new Set(state.products.map((product) => product.category)),
      ];
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.name === action.payload.name
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        state.totalStoreValue = state.products.reduce(
          (acc, product) => acc + priceCurrencyRemover(product.value),
          0
        );
        state.outOfStock = state.products.filter(
          (product) => product.quantity === 0
        ).length;
        state.categories = [
          ...new Set(state.products.map((product) => product.category)),
        ];
      }
    },
    disableProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.name === action.payload
      );
      if (product) {
        product.disabled = true;
      }
    },
  },
});

export const { setInventory, deleteProduct, updateProduct, disableProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
