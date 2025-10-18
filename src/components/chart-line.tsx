"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useMemo } from "react";
import { Transaction } from "@/types";
import { formatDate } from "@/lib/utils";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartLineProps {
  transactions: Transaction[];
}

const chartConfig = {
  desktop: {
    label: "Amount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function transformTransactionsToChartData(transactions: Transaction[]) {
  if (transactions.length === 0) return [];

  const dates = transactions.map((t) => new Date(t.date));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const dailyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const dayKey = date.toISOString().split("T")[0];

    if (!acc[dayKey]) {
      acc[dayKey] = {
        day: dayKey,
        desktop: 0,
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      };
    }

    acc[dayKey].desktop += transaction.amount;

    return acc;
  }, {} as Record<string, { day: string; desktop: number; date: Date }>);

  let startDate: Date;
  let endDate: Date;

  if (transactions.length > 0) {
    startDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    endDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
  } else {
    const now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  const result = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayKey = current.toISOString().split("T")[0];
    result.push({
      day: formatDate(current),
      desktop: dailyData[dayKey]?.desktop || 0,
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

export function ChartLine({ transactions }: ChartLineProps) {
  const chartData = useMemo(() => {
    return transformTransactionsToChartData(transactions);
  }, [transactions]);
  return (
    <div className="w-full h-[300px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          width="100%"
          height="100%"
          margin={{
            left: 50,
            right: 50,
            top: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={25}
            interval={0}
            tickCount={2}
            ticks={
              chartData.length > 0
                ? [chartData[0].day, chartData[chartData.length - 1].day]
                : []
            }
            tickFormatter={(value) => {
              const date = new Date(value);
              const formattedDate = formatDate(date);
              const parts = formattedDate.split(" ");
              return `${parts[0]} ${parts[1]}, ${parts[2]}`;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
