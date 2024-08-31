import { DeleteIcon, EditIcon, ShowIcon } from "@/assets/icons";
import classNames from "classnames";
import { useSelector } from "react-redux";

export const ProductTable = () => {
  const { products } = useSelector((state) => state.inventory);
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
            className={classNames({
              "opacity-30": product.quantity === 0,
            })}
          >
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.value}</td>
            <td>
              <ActionButton disabled={product.quantity === 0}>
                <EditIcon />
              </ActionButton>
              <ActionButton disabled={product.quantity === 0}>
                <ShowIcon />
              </ActionButton>
              <ActionButton disabled={product.quantity === 0}>
                <DeleteIcon />
              </ActionButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ActionButton = ({ children, disabled }) => {
  const role = useSelector((state) => state.role);

  return (
    <button
      className={classNames("mx-1", {
        "cursor-not-allowed opacity-30":
          role.currentRole === "USER" || disabled,
      })}
    >
      {children}
    </button>
  );
};
