"use client";
import React, { useMemo } from "react";
import { Card, CardContent, Typography } from "@mui/material";

function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16),
    pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255,
    ag = (pa >> 8) & 255,
    ab = pa & 255;
  const br = (pb >> 16) & 255,
    bg = (pb >> 8) & 255,
    bb = pb & 255;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

export default function ConfusionMatrix() {
  // Dummy 2x2 data
  const labels = ["True", "False"];
  const data = [
    [45, 7],
    [5, 43],
  ];

  const maxVal = useMemo(() => Math.max(...data.flat(), 1), [data]);
  const size = 260,
    pad = 20,
    n = 2,
    cell = size / n;
  const blueLight = "#b4c5eaff",
    blueDeep = "#2563EB";
  const peachLight = "#f7cacaff",
    peachDeep = "#F87171";

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Confusion Matrix
        </Typography>
        <svg width={size + 140} height={size + pad * 2}>
          {/* Top label */}
          <text
            x={size / 2 + pad}
            y={14}
            textAnchor="middle"
            fontSize="12"
            fill="#64748B"
          >
            Actual Values
          </text>
          {/* Side label */}
          <g transform={`translate(0, ${pad}) rotate(-90)`}>
            <text
              x={-(size / 2)}
              y={12}
              textAnchor="middle"
              fontSize="12"
              fill="#64748B"
            >
              Predicted Values
            </text>
          </g>

          {/* Grid */}
          <g transform={`translate(${pad}, ${pad})`}>
            {/* Axes tick labels */}
            {labels.map((l, i) => (
              <text
                key={`x-${i}`}
                x={cell * i + cell / 2}
                y={-6}
                textAnchor="middle"
                fontSize="12"
                fill="#64748B"
              >
                {labels[i]}
              </text>
            ))}
            {labels.map((l, i) => (
              <text
                key={`y-${i}`}
                x={-8}
                y={cell * i + cell / 2 + 4}
                textAnchor="end"
                fontSize="12"
                fill="#64748B"
              >
                {labels[i]}
              </text>
            ))}
            {/* Cells */}
            {Array.from({ length: n }).map((_, r) =>
              Array.from({ length: n }).map((_, c) => {
                const v = data[r][c];
                const t = v / maxVal; // normalized
                const diag = r === c;
                const base = diag ? peachLight : blueLight;
                const deep = diag ? peachDeep : blueDeep;
                const fill = lerpColor(base, deep, Math.min(1, t * 0.9));
                return (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={c * cell}
                      y={r * cell}
                      width={cell - 2}
                      height={cell - 2}
                      rx="10"
                      ry="10"
                      fill={fill}
                      stroke="#E5E7EB"
                    />
                    <text
                      x={c * cell + cell / 2 - 1}
                      y={r * cell + cell / 2 + 5}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="700"
                      fill="#1E293B"
                    >
                      {v}
                    </text>
                  </g>
                );
              })
            )}
          </g>

          {/* Legend / scale bar */}
          <g transform={`translate(${size + pad + 20}, ${pad})`}>
            <text x={0} y={0} fontSize="12" fill="#64748B">
              Scale
            </text>
            {/* Gradient bar */}
            {Array.from({ length: 100 }).map((_, i) => {
              const t = i / 99;
              const color = lerpColor(blueLight, blueDeep, t);
              return (
                <rect
                  key={i}
                  x={0}
                  y={10 + 1.8 * i}
                  width={14}
                  height={1.8}
                  fill={color}
                />
              );
            })}
            {/* Ticks */}
            <text x={22} y={14} fontSize="12" fill="#64748B">
              0
            </text>
            <text x={22} y={10 + 1.8 * 99 + 4} fontSize="12" fill="#64748B">
              {maxVal}
            </text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
