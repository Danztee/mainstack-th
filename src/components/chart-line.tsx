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
    color: "#FF5403",
  },
} satisfies ChartConfig;

function transformTransactionsToChartData(transactions: Transaction[]) {
  let startDate: Date;
  let endDate: Date;

  if (transactions.length === 0) {
    const now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      result.push({
        day: formatDate(current),
        desktop: 0,
      });

      current.setDate(current.getDate() + 1);
    }

    return result;
  }

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

  startDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  endDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

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
    <div className="w-full h-[300px] sm:h-[350px]">
      <ChartContainer
        config={chartConfig}
        className="h-full w-full !aspect-none [&_.recharts-cartesian-axis-tick_text]:!overflow-visible [&_.recharts-cartesian-axis-tick_text]:!white-space-nowrap [&_.recharts-cartesian-axis-tick_text]:!text-left"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          width={100}
          height={100}
          margin={{
            left: 50,
            right: 50,
            top: 20,
            bottom: 140,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={20}
            interval={0}
            tickCount={2}
            ticks={
              chartData.length > 0
                ? [chartData[0].day, chartData[chartData.length - 1].day]
                : []
            }
            tickFormatter={(value) => {
              const date = new Date(value);
              const month = date.toLocaleDateString("en-US", {
                month: "short",
              });
              const day = String(date.getDate()).padStart(2, "0");
              const year = date.getFullYear();
              return `${month} ${day}, ${year}`;
            }}
            fontSize={12}
            angle={0}
            textAnchor="middle"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
