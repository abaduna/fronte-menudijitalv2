"use client";
import { useFetch } from "@/hock/useFetch";
import { useEffect, useState } from "react";
import Modal from "@/componets/modal";
import { Button } from "react-bootstrap";
export interface ordenes {
  id: number;
  id_orden: number;
  tableNumber: String;
  dateTime: String;
  estados: String;
}

export default function Page() {
  const { getData, postOrdenes } = useFetch();
  const [ordenes, setOrdenes] = useState<ordenes[]>([]);
  const [id_orden, setId_orden] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [idOrdenes, setIdOrden] = useState<bigint[]>([]);
  const getDatas = async () => {
    const res = await getData(`api/ordenes`);
    if (res) {
      setOrdenes(res.data);
    }
  };
  useEffect(() => {
    getDatas();
  }, []);
  useEffect(() => {
    console.log(ordenes);
  }, [ordenes]);
  const seePedido = (id: number) => {
    console.log("click");
    setId_orden(id);
    console.log("id", id);
    setIsOpen(false);
  };
  const aceptPediddo = (id: number) => {
    const postAceptar = async () => {
      try {
        await postOrdenes({}, `api/ordenes/aceptados/${id}`);
      } catch (error) {}
    };
    postAceptar();
    getDatas();
  };
  const formattedPhoneNumber = 5493413592493;
  const mensaje = `Hola buen dia tu compra es aceptada\n
  ____________\n
gracias por comprar
  `;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
    mensaje
  )}`;
  return (
    <>
      <Modal
        isOpen={isOpen}
        id_orden={id_orden}
        clouseModal={() => setIsOpen(true)}
      ></Modal>
      <h1>pedidos</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Numero de mesa</th>
            <th scope="col">estado</th>
            <th scope="col">Ver pedido</th>
            <th scope="col">Aceptar pedido</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length > 0 &&
            ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.tableNumber} </td>
                <td> {orden.estados}</td>
                <td>
                  {" "}
                  <button onClick={() => seePedido(orden.id_orden)}>
                    Ver pedido
                  </button>
                </td>
                <td>
                  {orden.tableNumber === "Pedido" && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => aceptPediddo(orden.id_orden)}
                    >
                      Aceptar
                    </a>
                  )}
                  {orden.tableNumber !== "Pedido" && (
                    <button onClick={() => aceptPediddo(orden.id_orden)}>
                      Aceptar
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
