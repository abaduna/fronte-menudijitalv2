"use client";
import { useFetch } from "@/hock/useFetch";
import { useEffect, useState } from "react";
import { ordenes } from "../page";
import Navbar from "@/componets/navbar";
import { Button } from "react-bootstrap";
type Props = {};

const Page = (props: Props) => {
  const { getData } = useFetch();
  const [ordenes, serOrdenes] = useState<ordenes[]>([]);
  useEffect(() => {
    const getDatos = async () => {
      const { data } = await getData("api/ordenes/aceptados");
      console.log("data", data);
      serOrdenes(data);
    };
    getDatos();
  }, []);
  const token = localStorage.getItem("token");
  return (
    <>
      <h2>Pedidos terminados</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Numero de mesa</th>
            <th scope="col">id</th>
            <th scope="col">fecha</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length > 0 &&
            ordenes.map((orden) => (
              <tr key={orden.id}>
                
                <td>{orden.tableNumber} </td>
                <td> {orden.id_orden}</td>
                <td> {orden.dateTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Page;
