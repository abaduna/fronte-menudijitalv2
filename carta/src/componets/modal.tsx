import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "@/componets/styles.modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ordenes } from "@/app/admin/pedidos/page";
import { useFetch } from "@/hock/useFetch";
interface pedidos {
  id: number;
  id_orden: number;
  product: String;
  price: number;
}
const Modal = ({
  isOpen,
  clouseModal,
  id_orden,
}: {
  isOpen: boolean;
  clouseModal: () => void;
  id_orden: number;
}) => {
  const { getData } = useFetch();
  const [ordenes, setOrdenes] = useState<pedidos[]>([]);
  useEffect(() => {
    const data = async () => {
      const res = await getData(`api/allordenes/${id_orden}`);
      if (res) {
        setOrdenes(res.data);
        console.log("ordenes", ordenes);
      }
    };
    data();
  }, [id_orden]);
  console.log("id_orden", id_orden);
  if (isOpen) {
    return;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={clouseModal}
          className={styles.btnClose}
        />
        <table className="table" >
        <thead className={styles.white}>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody className={styles.white}>
          {ordenes.length > 0 &&
            ordenes.map((ordenes) => (
              <tr key={ordenes.id}>
                <td>{ordenes.name}</td>
                <td>{ordenes.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default Modal;
