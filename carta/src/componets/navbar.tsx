"use client"
import Link from "next/link"

type Props = {}

const Navbar = (props: Props) => {
 const token = localStorage.getItem("token")
if (!token) {
  return null
} 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">San martin</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
        <a className="nav-link" ><Link href="/">Carta</Link></a> 
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link href="/admin">Admin</Link></a>
        </li>
      
        <li className="nav-item">
          <a className="nav-link" ><Link href="/admin/ordens">Realizar pedido</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link " ><Link href="/admin/pedidos">Pedidos</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link " ><Link href="/admin/pedidos/aceptados">Historial</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link " ><Link href="/admin/pedidos/aceptados/grafico">Grafico</Link></a>
        </li>
      </ul>
     
    </div>
    
  </nav>
  )
}

export default Navbar