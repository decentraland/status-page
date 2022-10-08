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
        borderColor: "#000",
        borderWidth: 1,
        pointRadius: 0,
        data: set.values.map(([timestamp, valueAsString]) => {
          return { x: timestamp * 1000, y: +valueAsString }
        }),
      }
    }),
    labels: ["a"]
  }
}

export default function Stats() {
  const [data, setData] = useState<ChartData<"line", ScatterDataPoint[], string>>()

  useEffect(() => {
    fetch("/data.json")
      .then(($) => $.json())
      .then(transformData)
      .then(setData)
  }, [])

  console.log({data})

  return (
    <Line
      height={50}
      data={data || {
        datasets: [],
        labels: [],
      }}
      options={{
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: false,
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
        },
      }}
    />
  )
}
