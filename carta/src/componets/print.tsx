"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';
import { Productos } from '@/typs/typs';
import { ordenes } from '@/app/admin/ordens/page';

const Print = ({productos,ordenes,componentRef}:{productos:Productos[],ordenes:ordenes,componentRef:any}) => {
  //const componentRef = useRef<HTMLDivElement | null>(null);
///  const handlePrint = useReactToPrint({content: () => componentRef.current});


  return (
    <div>
      <ComponentToPrint ref={componentRef} productos={productos} ordenes={ordenes}/>

    </div>
  );
};

export default Print