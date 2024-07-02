import { Menu } from "@/app/page";
import syledCompone from "./component.module.css"
interface ComponetCarritoProps {
  carrito: Menu[];
}
const formattedPhoneNumber = 5493413592493;
function ComponetCarrito({ carrito }: ComponetCarritoProps) {
    const total: number = carrito.reduce((acc, producto) => acc + parseFloat(String(producto.price)), 0);
  

  const titulos = carrito.map(producto => producto.name);
    console.log(titulos);
  const carritoTitleString = titulos.join(','); 
  console.log(carritoTitleString);
  const mensaje = `Hola buen Dia quiro comprar\n
  ____________\n
  ${carritoTitleString}\n
  Precio total: ${total}\n`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
    mensaje
  )}`;
  return (
    <div className={syledCompone.navbar}>
      {carrito.length > 0 && (
        <h5>Cantidad de elementos comprados <span>{carrito.length}</span> </h5>
      )}
      {carrito.length > 0 && (
        <a
        
          href={whatsappLink}
          className={syledCompone.buttoncarrito}
          target="_blank"
          rel="noopener noreferrer"
        >
          Finalizar compra{" "}
        </a>
      )}
    </div>
  );
}

export default ComponetCarrito;
