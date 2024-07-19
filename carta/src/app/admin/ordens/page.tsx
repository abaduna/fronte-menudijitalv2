"use client";

import { useFetch } from "@/hock/useFetch";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
export interface foodsPedidos {
  name: string;
  product: string;
  price: number;
}

export interface ordenes {
  name: string;
  price: number;
}

const Page = () => {
  const [foods, setFoods] = useState<foodsPedidos[]>([]);
  const [ordenes, setOrdenes] = useState<ordenes[]>([]);
  const [table, settable] = useState<number>();
 
  const [serch, setSerch] = useState<string>("api/food");
  const { getData, postOrdenes } = useFetch();

  useEffect(() => {
    const getDatas = async () => {
        if (serch !== "api/food") {
            const res = await getData(`api/food/serch/${serch}`);
      setFoods(res?.data);
        }else{
            const res = await getData(`${serch}`);
            setFoods(res?.data);
        }
      
    };
    getDatas();
  }, [serch]);
  const agregarPedido = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const estados = "pedido"
    const data = {
      dateTime,
      table,
      ordenes,
      estados
    };
    const res = postOrdenes(data, "api/ordenes");
    console.log("res", res);
  };
  const saveOrdenes = (food: ordenes) => {
    const foodnew = {
      name: food.name,
      price: food.price,
    };
    setOrdenes((prev) => [...prev, foodnew]);
  };
  useEffect(() => {
    console.log("ordenes", ordenes);
  }, [ordenes]);
  const handleAddOrder = (food: foodsPedidos) => {
    console.log("click");
    const id_orden = new Date().getTime();
    const newOrder: ordenes = {
      name: food.name,
      price: food.price,
    };
    saveOrdenes(newOrder);
  };
  useEffect(() => {}, []);
  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="mesa"
          onChange={(e) => settable(+e.target.value)}
          className={styles.inputTxt}
        />
        <button type="button" onClick={agregarPedido} className={styles.button}>
          Agregar pedido
        </button>
      </form>
      <input
        placeholder="buscar..."
        onChange={(e) => setSerch(e.target.value)}
        className={styles.inputTxt}
      />
      {foods?.length > 0 &&
        foods.map((food, i) => (
          <div key={i} className={styles.foodItem}>
            <p>{food.name}</p>
            <button
              onClick={() => handleAddOrder(food)}
              className={styles.button}
            >
              Agregar
            </button>
          </div>
        ))}
    </>
  );
};

export default Page;
