"use client";
import ChartsLine from "@/componets/ChartsLine";
import LinesChart from "@/componets/grafico.lineChart";
import { useFetch } from "@/hock/useFetch";
import { pedidos } from "@/typs/typs";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { getDataV2 } = useFetch();
  const [pedidos, setPedidos] = useState<Number[]>([]);
  const [start, setStart] = useState<String>();
  const [end, setEnd] = useState<String>();
  const [cant, setCant] = useState({});
  useEffect(() => {
    const getData = async () => {
      ///
      const data = await getDataV2(
        `api/grafic/moth/?start=${start} 01:01:01&end=${end} 23:59:59`
      );
      setPedidos(data?.data);
      const cantRes = await getDataV2(
        `api/amount?start=${start} 01:01:01&end=${end} 23:59:59`
      );
      setCant(cantRes?.data);
      console.log("cant", cant);
      
    };
    getData();
  }, [start, end]);
  return (
    <div>
      <label>Empeiza</label>
      <input type="date" onChange={(e) => setStart(e.target.value)} />
      <label>Termina</label>
      <input type="date" onChange={(e) => setEnd(e.target.value)} />
      <LinesChart pedidos={pedidos} />
      <ChartsLine cantidad={cant}/>
    </div>
  );
};

export default Page;
