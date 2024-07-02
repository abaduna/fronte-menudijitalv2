"use client";

import { useFetch } from "@/hock/useFetch";
import { useEffect, useState } from "react";

export interface foodsPedidos {
    name: string;
    product: string;
    price: number;
}

export interface ordenes {
    product: string;
    price: number;
    
}

const Page = () => {
    const [foods, setFoods] = useState<foodsPedidos[]>([]);
    const [ordenes, setOrdenes] = useState<ordenes[]>([]);
    const [table, settable] = useState<number>();
    const { getData ,postOrdenes} = useFetch();

    useEffect(() => {
        const getDatas = async () => {
            const res = await getData("api/food");
            setFoods(res?.data);
            console.log('foods', res?.data);
        }
        getDatas();
    }, []);
const agregarPedido=()=>{
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTime =`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const data = {
        dateTime,
        table,
        ordenes,
        
        }
       const res = postOrdenes(data,"api/ordenes")
        console.log('res', res)
}
    const saveOrdenes = (food: ordenes) => {
        const foodnew={
            product:food.product,
            price:food.price
        }
        setOrdenes(prev => [...prev, foodnew]);
      
        
        
    }
useEffect(()=>{
    console.log('ordenes', ordenes);
},[ordenes])
    const handleAddOrder = (food: foodsPedidos) => {
        console.log("click");
        const id_orden = new Date().getTime();
        const newOrder: ordenes = {
            product: food.name,
            price: food.price,
            
        };
        saveOrdenes(newOrder);
    }

    return (
        <>
            <form>
                <input type="text" placeholder="mesa" onChange={e=>settable(+e.target.value)}/>
                <button type="button" onClick={agregarPedido}>Agregar pedido</button>
            </form>
            {foods?.length > 0 && foods.map((food, i) => (
                <div key={i}>
                    <p>{food.name}</p>
                    <button onClick={() => handleAddOrder(food)}>Agregar</button>
                </div>
            ))}
        </>
    );
}

export default Page;
