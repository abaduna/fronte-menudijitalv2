import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

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

export default function ChartsLine({cantidad}:{cantidad:any}) {
    const foods = Object.keys(cantidad);
      const cantFoods = Object.values(cantidad);
 var midata = {
    labels: foods,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'ventas por producto',
            data: cantFoods,
            tension: 0.5,
            fill : true,
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgba(255, 255, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 255, 132)',
            pointBackgroundColor: 'rgba(255, 125, 132)',
        }
        
    ],
};     
let options = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
};

    return <Line data={midata} options={options}/>
}