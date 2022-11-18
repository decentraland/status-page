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
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import "chartjs-adapter-moment"
import { Container} from "decentraland-ui"
import Title from "../Title"
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
      backgroundColor: "#5388D8",
      data: input.values.map(([month, value]) => {
        return { x: months[new Date(month).getUTCMonth()], y: value }
      })
    }],
    labels: []
  }
}

async function fetchData() {
  const res = await fetch("https://cdn-data.decentraland.org/public/monthly/active-users.json")
  return res.json()
}

export default function HistoricalMetrics() {
  const [data, setData] = useState<ChartData<"bar", any[], string>>()

  useEffect(() => {
    fetchData().then(transformData).then(setData)
  }, [])

  return (
    <Container>
      <Title title='Historical Metrics' paragraph="The graphs below show the last three months platform statistics and are automatically updated at the begining of each month."/>
      <Subtitle subtitle='Active Users' paragraph="How many unique users have logged into Decentraland and moved out of their initial tile"/>
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
          aspectRatio: 3,
          responsive: true,
          interaction: {
            intersect: true,
          },
          plugins: {
            legend: false
          } as any
        }}
      />
    </Container>
  )
}
