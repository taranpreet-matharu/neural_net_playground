"use client";
import React from "react";
import { Box } from "@mui/material";
import NetworkProvider from "../context/NetworkContext";
import Sidebar from "../components/Sidebar";
import NetworkView from "../components/NetworkView";
import ChartsPanel from "../components/ChartsPanel";
import RightPanel from "../components/RightPanel";

export default function Page(){
  return (
    <NetworkProvider>
      <Box sx={{ display:"flex", height:"100vh", bgcolor:"background.default" }}>
        {/* Left nav (fixed width) */}
        <Sidebar />

        {/* Center */}
        <Box sx={{ flexGrow:1, p:2, display:"flex", flexDirection:"column", gap:2 }}>
          <NetworkView />
          <ChartsPanel />
        </Box>

        {/* Right controls */}
        <Box sx={{ width:360, borderLeft:1, borderColor:"divider", p:2, display:{ xs:"none", md:"block" } }}>
          <RightPanel />
        </Box>
      </Box>
    </NetworkProvider>
  );
}
