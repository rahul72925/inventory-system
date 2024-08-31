import { DeleteIcon, EditIcon, HideIcon, ShowIcon } from "@/assets/icons";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./modal";
import { EditProductForm } from "./productEditForm";
import { useRef } from "react";
import { deleteProduct, updateProduct } from "@/lib/slice/inventory";

export const ProductTable = () => {
  const { products } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  return (
    <table className="products-table w-full bg-gray-950 m-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.name}
            className={classNames({ "opacity-30": !product.isActive })}
          >
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.value}</td>
            <td>
              <div className="flex">
                <EditHandler product={product} />
                <ActionButton
                  onClick={() =>
                    dispatch(
                      updateProduct({ ...product, isActive: !product.isActive })
                    )
                  }
                >
                  {product.isActive ? <ShowIcon /> : <HideIcon />}
                </ActionButton>
                <ActionButton onClick={() => dispatch(deleteProduct(product))}>
                  <DeleteIcon />
                </ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ActionButton = ({ children, ...props }) => {
  const role = useSelector((state) => state.role);

  return (
    <button
      className={classNames("mx-1", {
        "cursor-not-allowed opacity-30": role.currentRole === "USER",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

const EditHandler = ({ product }) => {
  const modalRef = useRef();
  const disableEditButton = !product.isActive;

  const handleEditClick = () => {
    if (!disableEditButton) {
      modalRef.current.open();
    }
  };

  const handleClose = () => {
    modalRef.current.close();
  };

  return (
    <div>
      <Modal ref={modalRef}>
        <EditProductForm product={product} handleClose={handleClose} />
      </Modal>
      <ActionButton disabled={disableEditButton} onClick={handleEditClick}>
        <EditIcon />
      </ActionButton>
    </div>
  );
};
