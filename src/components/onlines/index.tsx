import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title as TitleJS,
  Tooltip,
  Legend,
  ChartData,
  ScatterDataPoint,
} from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-moment"
import { Container} from "decentraland-ui"
import Title from "../Title"
import Subtitle from "../Subtitle"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TitleJS, Tooltip, Legend, TimeScale)

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
        borderColor: "#000",
        backgroundColor: "#000",
        data: set.values.map(([timestamp, valueAsString]) => {
          return { x: timestamp * 1000, y: +valueAsString }
        }),
      }
    }),
    labels: ["a"],
  }
}

async function fetchData() {
  const res = await fetch("https://public-metrics.decentraland.org/onlineUsers30d")
  return res.json()
}

export default function Stats() {
  const [data, setData] = useState<ChartData<"line", ScatterDataPoint[], string>>()

  useEffect(() => {
    fetchData().then(transformData).then(setData)
  }, [])


  if (data)
    data.datasets[0].borderColor = '#5388D8'

  return (
    <Container>
      <Title title='Live Metrics' paragraph="Below you can find live metrics related with the status of the platform."/>
      <Subtitle subtitle='Online users' paragraph="Count of players walking around the Metaverse"/>
      <Line
        height={210}
        style={{marginBottom: 32}}
        data={
          data || {
            datasets: [],
            labels: [],
          }
        }
        options={{
          aspectRatio: 3,
          responsive: true,
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: false
          } as any,
          scales: {
            x: {
              type: "time",
              bounds: "data",
              min: new Date().getTime() - 21 * 86400 * 1000 /* 21 days */,
              time: {
                round: "minute",
              },
              grid: {
                display: false
              }
            },
            y: {
              min: 0,
            },
            
          },
        }}
      />
    </Container>
  )
}
