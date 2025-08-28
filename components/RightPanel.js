"use client";
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Controls from "./Controls";

export default function RightPanel(){
  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Training Controls</Typography>
          <Controls />
        </CardContent>
      </Card>
    </Box>
  );
}
