import { updateProduct } from "@/lib/slice/inventory";

const { priceCurrencyRemover } = require("@/utils/price");
const { useState } = require("react");
const { useSelector, useDispatch } = require("react-redux");

export const EditProductForm = ({ product, handleClose }) => {
  const { category, price, quantity, value } = product;
  const { categories } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = Object.fromEntries(new FormData(e.target));
    updateData["value"] = "$" + +updateData.quantity * +updateData.price;
    updateData["price"] = "$" + updateData.price;
    updateData["quantity"] = +updateData.quantity;
    updateData["name"] = product.name;
    updateData["isActive"] = product.isActive;

    dispatch(updateProduct(updateData));
    handleClose();
  };
  return (
    <div className="w-2/3 bg-slate-950 min-h-1/2 z-10 p-4 rounded-lg">
      <header className="flex justify-between m-4 relative">
        <div>
          <p className="text-3xl ">Edit Product</p>
          <p className="my-2">{product.name}</p>
        </div>
        <button
          className="bg-black-400 rounded-md h-8 w-8 border-2 border-slate-700"
          onClick={handleClose}
        >
          x
        </button>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="product-category">Category</label>
        <select
          id="product-category"
          name="category"
          defaultValue={category}
          className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          type="number"
          name="price"
          defaultValue={priceCurrencyRemover(price)}
          placeholder="Enter price..."
          className="bg-gray-700 p-2.5 rounded-lg mt-2"
          min={0}
        />
        <br />
        <label htmlFor="product-quantity">Quantity</label>
        <input
          id="product-quantity"
          type="number"
          name="quantity"
          defaultValue={quantity}
          className="bg-gray-700 p-2.5 rounded-lg mt-2"
          min={0}
        />
        <br />
        <label htmlFor="product-value">Value</label>
        <input
          id="product-value"
          type="number"
          readOnly
          name="value"
          defaultValue={priceCurrencyRemover(value)}
          className="bg-gray-700 p-2.5 rounded-lg opacity-30 mt-2"
        />

        <footer className="flex justify-end mt-4 items-center">
          <button
            type="button"
            className="mx-4 py-2 px-4 rounded-lg mt-2 "
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mx-4 bg-gray-900 py-2 px-4 rounded-lg mt-2"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
