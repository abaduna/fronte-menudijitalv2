"use client"


import { ordenes } from "@/app/admin/pedidos/page"
import { Productos } from "@/typs/typs"
import React, { useEffect } from "react"
import styles from "../componets/styles.toPrint.module.css"
   
interface ComponentToPrintProps {
    productos:Productos[]
    ordenes:any
  }
 
  // eslint-disable-next-line react/display-name 
  export const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
    const {productos,ordenes} = props
  let total = 0  
  for (let i = 0; i < productos.length; i++) {
         total =  total + +productos[i].price
        
    }
    
useEffect(()=>{
    
    
},[productos])
    return (
      <div ref={ref} className={styles.print} >
        
      mesa:  {ordenes.tableNumber}<br/>
      direcion:{ordenes.address}
      <hr></hr>
        {productos.length > 0 && productos.map(producto=>(
            <p key={producto.id}>
                {producto.name}
            </p>
        ))}
        total: {total}
      </div>
    );
})
