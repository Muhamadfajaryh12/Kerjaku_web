"use client";
import StastistikCard from "@/components/card/StastistikCard";
import CompanyLayout from "@/layouts/CompanyLayout";
import React from "react";
import {
  MdAssignment,
  MdClose,
  MdOutlineVerified,
  MdPeople,
  MdTimer,
  MdWork,
} from "react-icons/md";
import { BarList, type BarListData, Chart, useChart } from "@chakra-ui/charts";
import { Box, Card } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFetch } from "@/hooks/useFetch";

const DashboardAdminPage = () => {
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/dashboard`);
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data:
      data?.total_applicant_by_name?.map((item) => ({
        name: item.name_vacancy,
        value: item.count,
      })) || [],
    series: [{ name: "name", color: "teal.subtle" }],
  });

  const chartLine = useChart({
    data:
      data?.total_applicant_by_month?.map((item) => ({
        applicant: item.count,
        month: item.name_month,
      })) || [],
    series: [{ name: "applicant", color: "teal.solid" }],
  });

  return (
    <CompanyLayout>
      <div className="grid grid-cols-6 gap-6">
        <StastistikCard
          icon={<MdWork size="40" className="text-white" />}
          title="Total Application"
          color="black"
          value={data?.total_data?.total_applicant}
        />
        <StastistikCard
          icon={<MdTimer size="40" className="text-white" />}
          title="Total Waiting"
          color="purple"
          value={data?.total_data?.total_waiting}
        />
        <StastistikCard
          icon={<MdAssignment size="40" className="text-white" />}
          title="Total Assesment"
          color="orange"
          value={data?.total_data?.total_assesment}
        />{" "}
        <StastistikCard
          icon={<MdPeople size="40" className="text-white" />}
          title="Total Interview"
          color="blue"
          value={data?.total_data?.total_interview}
        />{" "}
        <StastistikCard
          icon={<MdOutlineVerified size="40" className="text-white" />}
          title="Total Accepted"
          color="green"
          value={data?.total_data?.total_completed}
        />{" "}
        <StastistikCard
          icon={<MdClose size="40" className="text-white" />}
          title="Total Rejected"
          color="red"
          value={data?.total_data?.total_rejected}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card.Root mt="5">
          <Card.Header>
            <Card.Title>Applicants by Vacancy</Card.Title>
          </Card.Header>
          <Card.Body>
            <BarList.Root chart={chart}>
              <BarList.Content>
                <BarList.Bar />
                <BarList.Value />
              </BarList.Content>
            </BarList.Root>
          </Card.Body>
        </Card.Root>

        <Card.Root mt="5">
          <Card.Header>
            <Card.Title>Applicants by Month</Card.Title>
          </Card.Header>
          <Card.Body>
            <Chart.Root maxH="sm" chart={chartLine}>
              <LineChart data={chartLine.data}>
                <CartesianGrid
                  stroke={chartLine.color("border")}
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey={chartLine.key("month")}
                  tickFormatter={(value) => value.slice(0, 3)}
                  stroke={chartLine.color("border")}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  stroke={chartLine.color("border")}
                />
                <Tooltip
                  animationDuration={100}
                  cursor={false}
                  content={<Chart.Tooltip />}
                />
                {chartLine.series.map((item) => (
                  <Line
                    key={item.name}
                    isAnimationActive={false}
                    dataKey={chartLine.key(item.name)}
                    stroke={chartLine.color(item.color)}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </Chart.Root>
          </Card.Body>
        </Card.Root>
      </div>
    </CompanyLayout>
  );
};

export default DashboardAdminPage;
