"use client";
import actionPath from "@/action";
import { useFetch } from "@/hock/useFetch";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import styles from "./pageformulaeio.module.css"
interface paramsProps {
  params: {
    id: string;
  };
}
export interface food {
  id?: string;
  price?: number;
  name?: string;
  category?:string;
  description?:string;
  stock?:string;
}
const FormAdmin = ({ params }: paramsProps) => {
  const { getDataForid, upDateID } = useFetch();
  const [food, setFood] = useState<food>();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [description , setDescription ] = useState<string>("");
  const [stock , setStock ] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const verificar = () => {
     
    };
    verificar();
    const fetchFoodData = async () => {
      const response = await getDataForid(params.id);
      if (response) {
        setFood(response.data);
        console.log(response);
        console.log(food);
      }
    };

    fetchFoodData();
  }, []);
  const updateform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      upDateID(params.id, food as food);
      actionPath;
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 700);
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle = (newTitle: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      name: newTitle,
    }));
  };
  const updatePrice = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      price: +newPrice,
    }));  }
    const updateDescription = (newPrice: string) => {
      setFood((prevFood) => ({
        ...prevFood,
        description: newPrice,
      }));
    }
    const updateStock = (newPrice: string) => {
      setFood((prevFood) => ({
        ...prevFood,
        stock: newPrice,
      }));
    }

  

  return (
    <div>
      {successful && <span>Modificacion exitosa</span>}
      <form onSubmit={updateform} className={styles.formulario}>
        {food && (
          <input
          className={styles.input}
            value={food.name}
            onChange={(e) => updateTitle(e.target.value)}
          />
        )}
        {food && (
          <input
          className={styles.input}
            value={food.description}
            onChange={(e) => updateDescription(e.target.value)}
          />
        )}
        {food && (
          <input
          className={styles.input}
            type="number"
            value={food.price}
            onChange={(e) => updatePrice(e.target.value)}
          />
        )}
       {food && (
          <input
          className={styles.input}
            type="number"
            value={food.stock}
            onChange={(e) => updateStock(e.target.value)}
          />
        )}
      
        <button  className={styles.btn} type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default FormAdmin;
