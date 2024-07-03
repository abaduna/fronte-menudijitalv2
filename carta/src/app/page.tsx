"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import ComponetFood from "../componets/ComponetFood";
import { useFetch } from "@/hock/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faBottleWater } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonHome } from "@/componets/SkeletonHome";
import ComponetCarrito from "@/componets/ComponetCarrito";
export interface Menu {
  name: string;
  price: number;
  link_img: string;
  id?: string;
  category: string;
  setCarrito?: Function;
  removeProduct?: Function
}

export default function Home() {
  // const data = await getUser();
  const [serch, setSerch] = useState<string>("");
  const [foods, setFoods] = useState<Menu[]>([]);
  const [endpoint, setEndpoint] = useState<string>("api/food/serch/");
  const [hamburger, setHamburger] = useState<Menu[]>([]);
  const [bottle, setBottle] = useState<Menu[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [carrito, setCarrito] = useState<Menu[]>([]);
  const { getData } = useFetch();
  useEffect(() => {
    const getDataFoods = async () => {
      try {
        const foods = await getData(endpoint);
        if (typeof foods !== "undefined") {
          setFoods(foods.data);
          console.log(foods.data);
        } else {
          console.log(`undefind`);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    getDataFoods();
  }, [endpoint]);

  
  

  const handleSerchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    setEndpoint(`api/food/serch/${serch}`);
  };
  useEffect(() => {
    const sendCategory = async () => {
      const bottle = await getData("api/food");
      if (typeof bottle !== "undefined") {
        setBottle(bottle.data);
        console.error(bottle.data);
      } else {
        console.log(`undefind`);
      }
     
    };
    sendCategory();
  }, []);
  const removeProduct=(product:Menu)=>{
    
    setCarrito((prev: Menu[]) =>
      prev.filter((item: Menu) => item.name !== product.name)
    );
  }
  
  return (
    <div>
      <div className={styles.header}>
        <img
          className={styles.headerImg}
          src="/sanmartin.png"
          alt="San Martin"
        />
      </div>

      <form className={styles.formContainerSerch} onSubmit={handleSerchClick}>
        <input
          placeholder="buscar"
          onChange={(e) => setSerch(e.target.value)}
          value={serch}
          className={styles.searchInput}
        />
        <div className={styles.containerBtn}>
          <button className={styles.searchButton} type="submit">
            Buscar
          </button>
        </div>
      </form>
     
      <ComponetCarrito carrito={carrito} />
      {show ? (
        <>
          <div className={styles.fooditem}>
            {foods.length > 0 &&
              foods?.map((food:any) => (
                <Suspense key={food.id} fallback={<SkeletonHome />}>
                  <ComponetFood
                    setCarrito={setCarrito}
                    removeProduct={removeProduct}
                 
                    
                    {...food}
                  ></ComponetFood>
                </Suspense>
              ))}
          </div>
        </>
      ) : (
        <>

          {/* <p className={styles.categoryBottle}>Botellas</p> */}
          <div className={styles.fooditem}>
            {bottle.length > 0 &&
              bottle?.map((food: Menu) => (
                <Suspense key={food.id} fallback={<SkeletonHome />}>
                  <ComponetFood
                    setCarrito={setCarrito}
                    removeProduct={removeProduct}

                    {...food}
                  ></ComponetFood>
                </Suspense>
              ))}
          </div>
          
        </>
      )}
    </div>
  );
}
