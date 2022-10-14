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
  ChartData,
  ScatterDataPoint,
} from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-moment"
import styled from "styled-components"
import { Container, Header, HeaderMenu } from "decentraland-ui"
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
  const [isVisible, setVisible] = useState<boolean>(shouldBeVisible())

  function shouldBeVisible() {
    return window.innerWidth > 768
  }

  useEffect(() => {
    fetchData().then(transformData).then(setData)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setVisible(shouldBeVisible())
    })
  }, [])

  return (
    <Container>
      {isVisible && (
        <>
          <HeaderMenu>
            <HeaderMenu.Left>
              <Header size="medium">Live metrics</Header>
            </HeaderMenu.Left>
          </HeaderMenu>
          <Line
            height={50}
            style={{marginBottom: 32}}
            data={
              data || {
                datasets: [],
                labels: [],
              }
            }
            options={{
              aspectRatio: 6,
              responsive: true,
              interaction: {
                intersect: false,
              },
              plugins: {
                legend: false,
                title: {
                  display: true,
                  text: "Online Users",
                },
              } as any,
              scales: {
                x: {
                  type: "time",
                  bounds: "data",
                  min: new Date().getTime() - 21 * 86400 * 1000 /* 21 days */,
                  time: {
                    round: "minute",
                  },
                },
                y: {
                  min: 0,
                },
              },
            }}
          />
        </>
      )}
    </Container>
  )
}
