"use client"
import { useFetch } from "@/hock/useFetch";
import  { useEffect, useState } from "react";

interface ordenes{
    id:number,
    id_orden:number,
    tableNumber :number,
    dateTime: String,
    estados: String
}

export default function Page() {
  const { getData } = useFetch();
  const [ordenes,setOrdenes] = useState<ordenes[]>([])
  useEffect(() => {
    const getDatas = async () => {
      const res = await getData(`api/ordenes`);
      if (res) {
        setOrdenes(res.data)
      }
      
    };
    getDatas();
  }, []);
  const seePedido=()=>{
    
  }
  return (
    <>
      <h1>pedidos</h1>
      {ordenes.length > 0 && ordenes.map(orden=>(
        <div key={orden.id}>
            <p>mesa numero: {orden.tableNumber} en el estado {orden.estados}</p>
            <button onClick={seePedido}>Ver pedido</button>
        </div>
      ))}
    </>
  );
}
