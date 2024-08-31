"use client";
import { InventoryStats } from "@/components/inventoryStats";
import { ProductTable } from "@/components/productTable";
import { Spinner } from "@/components/spinner";
import { setInventory } from "@/lib/slice/inventory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("LOADING");
  useEffect(() => {
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((res) => res.json())
      .then((products) => {
        dispatch(
          setInventory(
            products.map((eachProduct) => ({ ...eachProduct, isActive: true }))
          )
        );

        setStatus("SUCCESS");
      })
      .catch((err) => {
        console.log("product fetch err", err);
        setStatus("ERROR");
      });
  }, [dispatch]);

  if (status === "LOADING")
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (status === "ERROR")
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Something went wrong</p>
      </div>
    );

  return (
    <main>
      <InventoryStats />
      <ProductTable />
    </main>
  );
}

const p = [
  {
    name: "Bluetooth",
    category: "Electronic",
    value: "$150",
    quantity: 5,
    price: "$30",
  },
  {
    name: "Edifier M43560",
    category: "Electronic",
    value: "0",
    quantity: 0,
    price: "$0",
  },
  {
    name: "Sony 4k ultra 55 inch TV",
    category: "Electronic",
    value: "$1190",
    quantity: 17,
    price: "$70",
  },
  {
    name: "Samsumg 55 inch TV",
    category: "Electronic",
    value: "$600",
    quantity: 50,
    price: "$12",
  },
  {
    name: "samsumg S34 Ultra",
    category: "phone",
    value: "$0",
    quantity: 0,
    price: "$0",
  },
];
