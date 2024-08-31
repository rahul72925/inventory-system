"use client";
import { setInventory } from "@/lib/slice/inventory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { products, totalProducts, totalStoreValue, outOfStock, categories } =
    useSelector((state) => state.inventory);
  useEffect(() => {
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((res) => res.json())
      .then((products) => dispatch(setInventory(products)))
      .catch((err) => {
        console.log("prduct fetch err", err);
      });
  }, []);

  return null;
}
