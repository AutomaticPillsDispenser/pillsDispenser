"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Sun",
    total: 3,
  },
  {
    name: "Mon",
    total: 4,
  },
  {
    name: "Tues",
    total: 4,
  },
  {
    name: "Wed",
    total: 5,
  },
  {
    name: "Thurs",
    total: 2,
  },
  {
    name: "Fri",
    total: 4,
  },
  {
    name: "Sat",
    total: 4,
  }
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} pills`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
