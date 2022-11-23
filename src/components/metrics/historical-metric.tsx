import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title as TitleJS,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js"
import { FC, useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import "chartjs-adapter-moment"
import { Container} from "decentraland-ui"
import Subtitle from "../Subtitle"

ChartJS.register(CategoryScale, LinearScale, BarElement, TitleJS, Tooltip, Legend, TimeScale)

type CDNQuery = {
  name: string
  granularity: string
  description: string
  dimensions: string[]
  dimension_display_names: string[]
  dimension_descriptions: string[]
  values: any[]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Needs to be async to be .then() able
async function transformData(input: CDNQuery): Promise<ChartData<"bar", any[], string>> {
  console.log(input)
  return {
    datasets:[{
      borderWidth: 2,
      borderColor: "#5388D8",
      backgroundColor: "rgba(83, 136, 216, 0.6)",
      barThickness: 60,
      data: input.values.map(([date, value]) => {
        const moment: Date = new Date(date)
        return { x: `${months[moment.getUTCMonth()]}, ${moment.getUTCFullYear()}`, y: value }
      })
    }],
    labels: []
  }
}

async function fetchData(name: string) {
  const res = await fetch(`https://cdn-data.decentraland.org/public/monthly/${name}.json`)
  return res.json()
}

interface HistoricalMetricProps {
  name: string
}

const HistoricalMetric: FC<HistoricalMetricProps> = ({name}) => {
  const [data, setData] = useState<ChartData<"bar", any[], string>>()

  useEffect(() => {
    fetchData(name).then(transformData).then(setData)
  }, [name])

  return (
    <>
      <Bar
        height={210}
        style={{marginBottom: 32}}
        data={
          data || {
            datasets: [],
            labels: [],
          }
        }
        options={{
          aspectRatio: 1.5,
          responsive: true,
          interaction: {
            intersect: true,
          },
          plugins: {
            legend: false
          } as any
        }}
      />
    </>
  )
}

export default HistoricalMetric