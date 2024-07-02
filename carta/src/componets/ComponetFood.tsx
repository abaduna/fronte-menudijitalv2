"use client";
import { Menu } from "../app/page";
import syledCompone from "./../app/pageComponet.module.css";
import "react-loading-skeleton/dist/skeleton.css";
const ComponetFood = ({
  name,
  price,
  link_img,
  category,
  setCarrito = ()=>{},
  removeProduct =()=>{}
}: Menu) => {
  const product = {
    name,
    price,

  };
  console.log(link_img)
  return (
   
   
    <>
      <div className={syledCompone.fooditem}>
        <div className={syledCompone.wrapper}>
          <p className={syledCompone.title}> {name}</p>
          <p>
            <span className={syledCompone.price}>{price}$</span> <br />
            categoria <b>{category}</b>
          </p>
          <img src={link_img} alt={name} />
        </div>
        <button onClick={() => setCarrito((prev: any) => [...prev, product])} className={syledCompone.addButton}>Agregar</button>
        <button onClick={()=>removeProduct(product)} className={syledCompone.removeButton}>Quitar</button>
      </div>
    </>
  );
};

export default ComponetFood;
