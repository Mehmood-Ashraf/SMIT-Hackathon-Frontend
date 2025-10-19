"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function VitalDetailPage() {
  const router = useRouter()
  const params = useParams()
  const vitalType = params.type as string

  // Mock data for chart
  const chartData = [
    { date: "Oct 1", value: 118 },
    { date: "Oct 3", value: 120 },
    { date: "Oct 5", value: 119 },
    { date: "Oct 7", value: 121 },
    { date: "Oct 9", value: 120 },
    { date: "Oct 11", value: 119 },
    { date: "Oct 13", value: 120 },
    { date: "Oct 15", value: 120 },
  ]

  const stats = {
    current: "120/80",
    average: "119.6",
    highest: "121",
    lowest: "118",
    unit: "mmHg",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{vitalType} Trends</h1>
          <p className="text-muted-foreground mt-1">View your historical data and trends</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.current}
              <span className="text-sm text-muted-foreground ml-1">{stats.unit}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.average}
              <span className="text-sm text-muted-foreground ml-1">{stats.unit}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {stats.highest}
              <span className="text-sm text-muted-foreground ml-1">{stats.unit}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {stats.lowest}
              <span className="text-sm text-muted-foreground ml-1">{stats.unit}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Chart</CardTitle>
          <CardDescription>Last 15 days of measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                dot={{ fill: "var(--color-primary)" }}
                name={vitalType}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-foreground">
              Your {vitalType.toLowerCase()} readings have been stable over the past two weeks, averaging{" "}
              <span className="font-semibold">
                {stats.average} {stats.unit}
              </span>
              . This is within the normal range.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-foreground">
              Continue monitoring regularly and maintain your current healthy lifestyle. If you notice any significant
              changes, consult with your healthcare provider.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
