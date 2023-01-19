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
import { severities } from "../incidents/incident"
import { stringify } from "querystring"

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

async function transformData(input: CDNQuery): Promise<ChartData<"bar", any[], string>> {
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

async function transformSeveritiesData(input: CDNQuery): Promise<ChartData<"bar", any[], string>> {
  // Initialize severity map
  const valuesBySeverity = new Map<string, {date: string, value: number}[]>([
    ['sev-1', []],
    ['sev-2', []],
    ['sev-3', []],
    ['sev-4', []],
    ['sev-5', []]
  ])

  // Fill map with response
  input.values.forEach(([date, severity, value]: [string, string, number]) => {
    valuesBySeverity.get(severity)?.push({date: date, value: value})
  })

  return {
    datasets: Array.from(valuesBySeverity.entries()).map(([severity, values]) => {
      return {
        label: severity,
        borderWidth: 1,
        borderColor: severities[severity].borderColor,
        backgroundColor: severities[severity].backgroundColor,
        barThickness: 60,
        data: values.map(({date, value}: {date: string, value: number}) => {
          const moment: Date = new Date(date)
          return { x: `${months[moment.getUTCMonth()]}, ${moment.getUTCFullYear()}`, y: value }
        })
      }
    }),
    labels: []
  }
}

async function fetchData(name: string) {
  // const res = await fetch(`https://cdn-data.decentraland.org/public/monthly/${name}.json`)
  if (name === 'incidents-by-severity') {
    return {
      name: '',
      granularity: 'string',
      description: 'string',
      dimensions: [],
      dimension_display_names: [],
      dimension_descriptions: [],
      values: [
        ["2022-08-01T00:00:00.00Z", "sev-1", 53711],
        ["2022-09-01T00:00:00.00Z", "sev-1", 56763],
        ["2022-10-01T00:00:00.00Z", "sev-1", 54403],
        ["2022-08-01T00:00:00.00Z", "sev-2", 53711],
        ["2022-09-01T00:00:00.00Z", "sev-2", 56763],
        ["2022-10-01T00:00:00.00Z", "sev-2", 54403],
        ["2022-08-01T00:00:00.00Z", "sev-3", 53711],
        ["2022-09-01T00:00:00.00Z", "sev-3", 56763],
        ["2022-10-01T00:00:00.00Z", "sev-3", 54403],
        ["2022-08-01T00:00:00.00Z", "sev-4", 53711],
        ["2022-09-01T00:00:00.00Z", "sev-4", 56763],
        ["2022-10-01T00:00:00.00Z", "sev-4", 54403],
        ["2022-08-01T00:00:00.00Z", "sev-5", 53711],
        ["2022-09-01T00:00:00.00Z", "sev-5", 56763],
        ["2022-10-01T00:00:00.00Z", "sev-5", 54403]
      ]  
    }
  }
  return {
    name: '',
    granularity: 'string',
    description: 'string',
    dimensions: [],
    dimension_display_names: [],
    dimension_descriptions: [],
    values: [
      ["2022-08-01T00:00:00.00Z",221],
      ["2022-09-01T00:00:00.00Z",221],
      ["2022-10-01T00:00:00.00Z",221]
    ]
  }
}

interface HistoricalMetricProps {
  name: string,
  hour?: boolean
}

const HistoricalMetric: FC<HistoricalMetricProps> = ({name, hour}) => {
  const [data, setData] = useState<ChartData<"bar", any[], string>>()

  useEffect(() => {
    fetchData(name).then(name === 'incidents-by-severity' ? transformSeveritiesData : transformData).then(setData)
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
          } as any,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              ticks: {
                callback: function(val) {
                  if (hour)
                    return val + "h"
                  return val
                }
              }
            }
          }
        }}
      />
    </>
  )
}

export default HistoricalMetric
