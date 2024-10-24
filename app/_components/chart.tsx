"use client";

import React, { useEffect, useState } from "react";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Spinner } from "@nextui-org/react";
import SectionContainer from "@/components/section-container";

const supabase = createSupabaseClientWithTypes();

// Types for our waste data
type WasteData = {
  id_jenis_sampah: string;
  name: string;
  quantity: number;
};

const WasteBarChart = () => {
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sage green color palette
  const chartColors = {
    primary: "#84a98c", // Sage green
    text: "#374151", // Gray-700
    grid: "#e5e7eb", // Gray-200
    tooltip: {
      background: "#ffffff",
      border: "#d1d5db",
    },
  };

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        // Query with join to get waste type names
        const { data, error } = await supabase
          .from("setor")
          .select(
            `
            quantity,
            jenis_sampah!inner (
              id,
              nama
            )
          `
          )
          .then(result => {
            if (result.data) {
              // Group and sum quantities by waste type
              const groupedData = result.data.reduce((acc, curr) => {
                const existingEntry = acc.find(
                  item => item.id_jenis_sampah === curr.jenis_sampah.id
                );

                if (existingEntry) {
                  existingEntry.quantity += curr.quantity ?? 0;
                } else {
                  acc.push({
                    id_jenis_sampah: curr.jenis_sampah.id,
                    name: curr.jenis_sampah.nama ?? "",
                    quantity: curr.quantity as number,
                  });
                }
                return acc;
              }, [] as WasteData[]);

              return { data: groupedData, error: null };
            }
            return result;
          });

        if (error) throw error;

        // Sort data by quantity in descending order
        const sortedData = data.sort((a, b) => b.quantity - a.quantity);
        setWasteData(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWasteData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center p-6">
        <Spinner color="success" label="Loading waste data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center p-6">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (wasteData.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center p-6">
        <p className="text-default-500">Tidak ada data sampah yang tersedia</p>
      </div>
    );
  }

  return (
    <SectionContainer>
      <div className="w-full">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-default-900">Jenis sampah terbanyak</h2>
          <p className="text-small text-default-500">
            Jumlah jenis sampah yang paling sering di setor
          </p>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={wasteData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis
                dataKey="name"
                tick={{ fill: chartColors.text }}
                tickLine={{ stroke: chartColors.text }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: chartColors.text }}
                tickLine={{ stroke: chartColors.text }}
                label={{
                  value: "Kuantitas",
                  angle: -90,
                  position: "insideLeft",
                  fill: chartColors.text,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltip.background,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                formatter={value => [`${value}`, "Kuantitas"]}
                labelStyle={{ color: chartColors.text }}
              />
              <Legend />
              <Bar
                dataKey="quantity"
                fill={chartColors.primary}
                name="Banyak Jumlah"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SectionContainer>
  );
};

export default WasteBarChart;
