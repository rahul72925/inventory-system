import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slice/inventory";
import roleReducer from "./slice/role";

export const makeStore = () => {
  return configureStore({
    reducer: {
      inventory: inventoryReducer,
      role: roleReducer,
    },
  });
};
