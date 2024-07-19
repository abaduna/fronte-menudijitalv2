"use client";
import { useFetch } from "@/hock/useFetch";
import { useEffect, useRef, useState } from "react";
import Modal from "@/componets/modal";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";

import printInvoice from "@/componets/printInvoice";
import Print from "@/componets/print";
import { Productos } from "@/typs/typs";
import { useReactToPrint } from "react-to-print";

export interface ordenes {
  id: number;
  id_orden: number;
  tableNumber: String;
  dateTime: String;
  estados: String;
  phone:number
  address:string
}

export default function Page() {
  const { getData, postOrdenes } = useFetch();
  const [ordenes, setOrdenes] = useState<ordenes[]>([]);
  const [id_orden, setId_orden] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [idOrdenes, setIdOrden] = useState<bigint[]>([]);
  const [productos,setProductos] = useState<Productos[]>([])
  const getDatas = async () => {
    const res = await getData(`api/ordenes`);
    if (res) {
      setOrdenes(res.data);
      console.log('ordenes', ordenes)
    }
  };
  useEffect(() => {
    getDatas();
  }, []);

  const seePedido = (id: number) => {
    setId_orden(id);
    setIsOpen(false);
  };
  const aceptPediddobtn = (id: number) => {
    const postAceptar = async () => {
      try {
        const res = await getData(`api/allordenes/${id}`);
        setProductos(res?.data)
        console.log('productos', productos)
        //await postOrdenes({}, `api/ordenes/aceptados/${id}`);
      } catch (error) {}
    };
    setTimeout(() => {
      handlePrint()
    }, 500);
    
    postAceptar();
    getDatas();
  };
  const aceptPediddo = async (id: number) => {
    const postAceptar = async () => {
      try {
        const res = await getData(`api/allordenes/${id}`);
        setProductos(res?.data)
        console.error('productos', productos)
        let productosStr = "";
        if (res) {
        
          const titulos = productos.map((producto) => producto.name);
          productosStr = titulos.join(",");
          
        }
        getDatas();
        const formattedPhoneNumber = 5493413592493;
        const mensaje = `Hola buen dia tu compra es aceptada\n
  ____________\n


${productosStr}\n
gracias por comprar
  `;
        const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
          mensaje
        )}`;
       // await postOrdenes({}, `api/ordenes/aceptados/${id}`);
       // window.open(whatsappLink, "_blank");
      } catch (error) {
        console.log("error", error);
      }
    };

    setTimeout(() => {
      handlePrint()
    }, 500);
    postAceptar();
  };
  useEffect(()=>{
console.log('productos', productos)
  },[productos])
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({content: () => componentRef.current});
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
                <Print  productos={productos} ordenes={orden} componentRef={componentRef}/>
                  {orden.tableNumber === "Pedido" && (
                    <button onClick={() => aceptPediddobtn(orden.id_orden)}>
                      Aceptar
                    </button>
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
