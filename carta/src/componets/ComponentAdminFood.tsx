"use client";
import actionPath from "@/action";

import { useFetch } from "@/hock/useFetch";

import Link from "next/link";
import React, { useState } from "react";
import stylesAdmin from "./../app/admin/pageAdmin.module.css"
function ComponentAdminFood({
  name,
  price,
  link_img,
  id,
  setUpdate,
  updata,
  category,
  stock,
  description
}: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { deletID } = useFetch();
  const [successful, setSuccessful] = useState<boolean>(false);
  const handleDeleteClick = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    console.log(`deletID`);

    deletID(id);
    actionPath();
    setUpdate(!updata);
    setSuccessful(true);
    setTimeout(() => {
      setSuccessful(false);
    }, 500);
  };
  return (
    <>
      {successful && <span>Eliminado con exito</span>}
      <div className={stylesAdmin.fooditem}>
        <form onSubmit={(e) => handleDeleteClick(e, id as string)} className={stylesAdmin.formularinputFood}>
        <h1>{name}</h1>
        <p>
          {price}-{category}<br/>
          Stock:{stock}<br/>
          {description}
        </p>
        <img src={link_img} />
        <div className={stylesAdmin.btndeletdform}>
         <button  className={stylesAdmin.btndelet} type="submit">Eliminar</button> 
        </div>
        
        <Link  className={stylesAdmin.link} href={`/admin/formulario/${id}`}>Actualizar</Link>
      </form>
      </div>
      
    </>
  );
}

export default ComponentAdminFood;
