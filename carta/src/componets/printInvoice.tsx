"use client";

import { createRoot } from "react-dom/client";
import ComponentFactura from "./componentFactura";

const printInvoice = () => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write('<html><head><title>Factura</title></head><body><div id="print-root"></div></body></html>');
  iframeDoc.close();

  const portalDiv = iframeDoc.getElementById('print-root');
  if (portalDiv) {
    createRoot(portalDiv).render(<ComponentFactura />);
  }

  // Esperar un momento y luego llamar a la función de impresión
  setTimeout(() => {
    const iframeWindow = iframe.contentWindow;
  iframeWindow.onafterprint = () => {
    document.body.removeChild(iframe);
  };
  iframeWindow.print();
  }, 500); // Esperar medio segundo para asegurar que todo esté renderizado
};

export default printInvoice;
