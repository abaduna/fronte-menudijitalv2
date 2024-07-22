import { Menu } from "@/app/page";
import syledCompone from "./component.module.css";
import { useFetch } from "@/hock/useFetch";
import { useState } from "react";
interface ComponetCarritoProps {
  carrito: Menu[];
}

function ComponetCarrito({ carrito }: ComponetCarritoProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<Number>(0);
  const [address, setAddress] = useState<String>("");
  const [envio,setEnvio] = useState<boolean>(true)
  const { postOrdenes } = useFetch();
  const updata = () => {
    setModal(true);
  };
  const save = () => {
    let fecha = new Date();

    // Obtener los componentes de la fecha
    let año = fecha.getFullYear();
    let mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    let dia = String(fecha.getDate()).padStart(2, "0");
    let horas = String(fecha.getHours()).padStart(2, "0");
    let minutos = String(fecha.getMinutes()).padStart(2, "0");
    let segundos = String(fecha.getSeconds()).padStart(2, "0");

    // Formatear la fecha en el formato deseado
    let fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    console.error("carrito", carrito);
    const data = {
      dateTime: fechaFormateada,
      table: "envio",
      phone: phone,
      ordenes: carrito,
      estados: "pedido",
      address: address,
    };
    console.log("carrito", carrito);
    postOrdenes(data, "api/ordenes");
  };
  const handlerEnvio=(envio:string)=>{
    console.log('envio', envio)
if (envio === "No") {
  setEnvio(false)
}
  }
  return (
    <div className={syledCompone.navbar}>
      {carrito.length > 0 && (
        <h5>
          Cantidad de elementos comprados <span>{carrito.length}</span>{" "}
        </h5>
      )}
      {carrito.length > 0 && <button onClick={updata}>Finalizar compra</button>}
      {modal && (
        <div className={syledCompone.modal}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Introducir tus datos</h5>
              </div>
              <div className={syledCompone.modalBody}>
                <label>Cual es tu numero?</label>
                <input
                  placeholder="ingresa tu telefono"
                  onChange={(e) => setPhone(+e.target.value)}
                />
                <br />
                <p>Queres con envio</p>
                <select  onChange={(e)=>handlerEnvio(e.target.value)}>
                  <option>Si</option>
                  <option>No</option>
                </select>
              {envio&&<input
                  placeholder="ingresa tu direccion"
                  onChange={(e) => setAddress(e.target.value)}
                />}  
              
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={save}
                  className="btn btn-primary"
                >
                  Enviar pedido
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModal(false)}
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponetCarrito;
