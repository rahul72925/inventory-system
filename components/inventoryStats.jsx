import {
  TotalProductIcon,
  TotalStoreValueIcon,
  OutOfStocksIcon,
  NumOfCategoryIcon,
} from "@/assets/icons";
import { useSelector } from "react-redux";

export const InventoryStats = () => {
  const { products, totalProducts, totalStoreValue, outOfStock, categories } =
    useSelector((state) => state.inventory);

  const stats = [
    {
      title: "Total Products",
      icon: TotalProductIcon,
      value: totalProducts,
    },
    {
      title: "Total Store Value",
      icon: TotalStoreValueIcon,
      value: totalStoreValue,
    },
    {
      title: "Out of stocks",
      icon: OutOfStocksIcon,
      value: outOfStock,
    },
    {
      title: "No of Category",
      icon: NumOfCategoryIcon,
      value: categories.length,
    },
  ];
  return (
    <section className="px-4">
      <header className="my-4">
        <h1 className="text-3xl">Inventory Stats</h1>
      </header>
      <main className="h-36 flex ">
        {stats.map((eachStats) => (
          <StatsCard key={eachStats.title} stats={eachStats} />
        ))}
      </main>
    </section>
  );
};

const StatsCard = ({ stats }) => {
  const { icon: Icon, title, value } = stats;
  return (
    <div className="p-4 flex grow bg-lime-950 rounded-md mr-4">
      <div>
        <Icon />
      </div>
      <div className="ml-4">
        <p className="text-lg mb-4">{title}</p>
        <p className="text-4xl mt-6">{value}</p>
      </div>
    </div>
  );
};
