"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Activity, Heart, AlertCircle } from "lucide-react"

export default function AnalyticsPage() {
  // Monthly health score data
  const healthScoreData = [
    { month: "Jan", score: 72 },
    { month: "Feb", score: 75 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 76 },
    { month: "May", score: 80 },
    { month: "Jun", score: 82 },
    { month: "Jul", score: 85 },
    { month: "Aug", score: 83 },
    { month: "Sep", score: 84 },
    { month: "Oct", score: 85 },
  ]

  // Activity distribution
  const activityData = [
    { name: "Cardio", value: 35, color: "var(--color-chart-1)" },
    { name: "Strength", value: 25, color: "var(--color-chart-2)" },
    { name: "Flexibility", value: 20, color: "var(--color-chart-3)" },
    { name: "Rest", value: 20, color: "var(--color-chart-4)" },
  ]

  // Weekly vitals comparison
  const vitalsData = [
    { week: "Week 1", bp: 120, hr: 72, temp: 98.6 },
    { week: "Week 2", bp: 119, hr: 71, temp: 98.5 },
    { week: "Week 3", bp: 121, hr: 73, temp: 98.7 },
    { week: "Week 4", bp: 120, hr: 72, temp: 98.6 },
  ]

  const insights = [
    {
      icon: TrendingUp,
      title: "Health Score Improvement",
      description: "Your health score has improved by 13 points since January",
      color: "text-green-500",
    },
    {
      icon: Activity,
      title: "Activity Consistency",
      description: "You've maintained 85% consistency in your exercise routine",
      color: "text-blue-500",
    },
    {
      icon: Heart,
      title: "Heart Health",
      description: "Your resting heart rate has decreased by 5 bpm",
      color: "text-red-500",
    },
    {
      icon: AlertCircle,
      title: "Hydration Alert",
      description: "Remember to increase water intake during exercise",
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Health Analytics</h1>
        <p className="text-muted-foreground mt-2">Comprehensive insights into your health journey</p>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon
          return (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  <Icon className={`w-5 h-5 ${insight.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Health Score Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Health Score Trend</CardTitle>
          <CardDescription>Your overall health score progression over the past 10 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
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
                dataKey="score"
                stroke="var(--color-primary)"
                dot={{ fill: "var(--color-primary)" }}
                name="Health Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Your exercise breakdown this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Vitals Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Vitals Comparison</CardTitle>
            <CardDescription>Average vitals by week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
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
                <Bar dataKey="bp" fill="var(--color-chart-1)" name="BP (Systolic)" />
                <Bar dataKey="hr" fill="var(--color-chart-2)" name="Heart Rate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
          <CardDescription>October 2024 statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reports Analyzed</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Vitals Logged</p>
              <p className="text-2xl font-bold text-foreground">48</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Health Score</p>
              <p className="text-2xl font-bold text-foreground">85%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Days Tracked</p>
              <p className="text-2xl font-bold text-foreground">28</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
