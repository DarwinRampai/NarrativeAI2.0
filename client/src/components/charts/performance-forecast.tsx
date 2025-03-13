import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, ChartLine, TrendingUp } from "lucide-react";

// Mock data - in production this would come from an API
const generateForecastData = (days: number) => {
  const data = [];
  const metrics = {
    engagement: { initial: 8.2, trend: 0.1, variance: 0.05 },
    conversion: { initial: 2.4, trend: 0.05, variance: 0.02 },
    roi: { initial: 315, trend: 2, variance: 5 }
  };

  for (let i = 0; i < days; i++) {
    const dayData = {
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      engagement: metrics.engagement.initial + (metrics.engagement.trend * i) + (Math.random() * metrics.engagement.variance),
      conversion: metrics.conversion.initial + (metrics.conversion.trend * i) + (Math.random() * metrics.conversion.variance),
      roi: metrics.roi.initial + (metrics.roi.trend * i) + (Math.random() * metrics.roi.variance)
    };
    data.push(dayData);
  }
  return data;
};

export function PerformanceForecast() {
  const [timeframe, setTimeframe] = useState("30");
  const [forecastData, setForecastData] = useState(() => generateForecastData(30));

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    setForecastData(generateForecastData(parseInt(value)));
  };

  const getConfidenceLevel = (value: number) => {
    if (value > 90) return "text-green-500";
    if (value > 70) return "text-yellow-500";
    return "text-red-500";
  };

  const metrics = [
    {
      name: "Engagement Rate",
      current: "8.2%",
      predicted: "9.5%",
      confidence: 92,
      trend: "up"
    },
    {
      name: "Conversion Rate",
      current: "2.4%",
      predicted: "2.8%",
      confidence: 85,
      trend: "up"
    },
    {
      name: "ROI",
      current: "315%",
      predicted: "342%",
      confidence: 78,
      trend: "up"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-primary" />
            Performance Forecast
          </CardTitle>
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Next 7 days</SelectItem>
              <SelectItem value="30">Next 30 days</SelectItem>
              <SelectItem value="90">Next 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-card"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{metric.name}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.predicted}</p>
                  <p className="text-sm text-muted-foreground">from {metric.current}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getConfidenceLevel(metric.confidence)}`}>
                    {metric.confidence}% confidence
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Trending up</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-[400px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(17 24 39)",
                  border: "1px solid rgb(75 85 99)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                name="Engagement Rate"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="conversion"
                name="Conversion Rate"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="roi"
                name="ROI"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
