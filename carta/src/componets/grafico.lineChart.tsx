
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { pedidos } from "@/typs/typs";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
function LinesChart({pedidos}:{pedidos:Number[]}) {

let dias = [];
  for (let index = 0; index < 32; index++) {
    
    dias.push(index)
  }
  
  let midata = {
    labels: dias,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label: "Ventas por hora",
        data: pedidos,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      }
      
    ],
  };
  let misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
};
  return <Line data={midata}  options={misoptions} />;
}
export default LinesChart