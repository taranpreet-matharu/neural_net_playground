"use client";
import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useNetwork } from "../context/NetworkContext";
import ConfusionMatrix from "./ConfusionMatrix";

export default function ChartsPanel() {
  const { history } = useNetwork();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Training Progress
            </Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="gradAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#2563EB"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="#2563EB"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient id="gradLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#F87171"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="#F87171"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#2563EB"
                    fill="url(#gradAcc)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="loss"
                    stroke="#F87171"
                    fill="url(#gradLoss)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={5}>
        <ConfusionMatrix />
      </Grid>
    </Grid>
  );
}
