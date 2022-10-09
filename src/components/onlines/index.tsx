import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
  ChartData,
  ScatterDataPoint,
} from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import 'chartjs-adapter-moment';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

type PrometheusQuery = {
  status: string
  data: {
    result: QueryResult[]
  }
}

type QueryResult = {
  metric: any
  values: any[]
}


// this needs to be async to be .then() able
async function transformData(input: PrometheusQuery): Promise<ChartData<"line", any[], string>> {
  return {
    datasets: input.data.result.flatMap((set) => {
      return {        
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        borderColor: "#ff8258",
        backgroundColor: "#ff8258",        
        data: set.values.map(([timestamp, valueAsString]) => {
          return { x: timestamp * 1000, y: +valueAsString }
        }),
      }
    }),
    labels: ["a"]
  }
}


async function fetchData() {
  const res = await fetch("https://public-metrics.decentraland.org/onlineUsers30d")
  return res.json()  
}



export default function Stats() {
  const [data, setData] = useState<ChartData<"line", ScatterDataPoint[], string>>()  
  
  useEffect(() => {
    fetchData()
      .then(($) => $.json())
      .then(setData)
  }, [])

  return (      
        <Line
          height={50}
          data={data || {
            datasets: [],
            labels: [],            
          }}
          options={                        
            {
              interaction: {
                intersect: false,
            },
            plugins: {
              legend: false,
              title: {
                display: true, 
                text: 'Concurrent users'
              }
            } as any,
            scales: {
              x: {
                type: "time",
                bounds: "data",
                min: new Date().getTime() - 30 * 86400 * 1000 /* 30 days */,
                time: {
                  round: "minute",
                },
              },
              y: {
                min: 0
              }
            },
          }}
        />    
  )
}
