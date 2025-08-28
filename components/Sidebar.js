"use client";
import React, { useState } from "react";
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import GrainIcon from "@mui/icons-material/Grain";

const expanded = 240;
const collapsed = 78;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open?expanded:collapsed,
        flexShrink:0,
        "& .MuiDrawer-paper":{
          width: open?expanded:collapsed,
          transition:"width .25s",
          boxSizing:"border-box",
          borderRight:"1px solid #E5E7EB",
          background:"#1b1740",
          color:"#fff"
        }
      }}
    >
      <Box sx={{ display:"flex", alignItems:"center", justifyContent: open? "space-between":"center", px:1.5, height:64 }}>
        {open && <Typography sx={{ fontWeight:700 }}>Neural Playground</Typography>}
        <IconButton onClick={()=>setOpen(!open)} size="small" sx={{ color:"#fff" }}><MenuIcon/></IconButton>
      </Box>
      <List dense sx={{ px:1 }}>
        {[
          {label:"Home",icon:<HomeIcon/>},
          {label:"Pattern Classification",icon:<TimelineIcon/>},
          {label:"Pattern Association",icon:<GrainIcon/>}
        ].map(i=>(
          <ListItemButton key={i.label} sx={{ borderRadius:2, mb:.5, color:"#fff", "&:hover":{ background:"rgba(255,255,255,0.08)"} }}>
            <ListItemIcon sx={{ minWidth:36, color:"#c7b9ff" }}>{i.icon}</ListItemIcon>
            {open && <ListItemText primary={i.label}/>}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
