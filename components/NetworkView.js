"use client";
import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNetwork } from "../context/NetworkContext";

export default function NetworkView() {
  const { state } = useNetwork();

  const diagram = useMemo(() => {
    const width = 800,
      height = 440,
      pad = 50;
    const sizes = [2, ...Array(state.layers).fill(state.neurons), 2];
    const xStep = (width - pad * 2) / (sizes.length - 1);
    const nodes = [];
    for (let i = 0; i < sizes.length; i++) {
      const count = sizes[i];
      const yStep = (height - pad * 2) / (count - 1 || 1);
      for (let j = 0; j < count; j++) {
        nodes.push({
          id: `${i}-${j}`,
          layer: i,
          x: pad + i * xStep,
          y: pad + j * yStep,
        });
      }
    }
    const edges = [];
    for (let i = 0; i < sizes.length - 1; i++) {
      const from = nodes.filter((n) => n.layer === i);
      const to = nodes.filter((n) => n.layer === i + 1);
      for (const a of from) for (const b of to) edges.push({ a, b });
    }
    return { width, height, nodes, edges };
  }, [state.layers, state.neurons]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Network Visualization
        </Typography>
        <Box sx={{ width: "100%", overflow: "auto" }}>
          <svg width="100%" viewBox={`0 0 ${diagram.width} ${diagram.height}`}>
            {diagram.edges.slice(0, 700).map((e, i) => (
              <line
                key={i}
                x1={e.a.x}
                y1={e.a.y}
                x2={e.b.x}
                x2={e.b.x}
                y2={e.b.y}
                stroke="#E6E3FF"
                strokeWidth="1"
              />
            ))}
            {diagram.nodes.map((n) => (
              <circle
                key={n.id}
                cx={n.x}
                cy={n.y}
                r="8"
                fill="#2563EB"
                opacity="0.95"
              />
            ))}
          </svg>
        </Box>
      </CardContent>
    </Card>
  );
}
