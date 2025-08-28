"use client";
import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNetwork } from "../context/NetworkContext";

export default function Controls(){
  const { state, setState } = useNetwork();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth size="small">
          <InputLabel id="nn-type">Neural Network Type</InputLabel>
          <Select labelId="nn-type" label="Neural Network Type" value={state.networkType}
            onChange={(e)=>setState(s=>({...s, networkType:e.target.value}))}>
            <MenuItem value="Feedforward">Feedforward</MenuItem>
            <MenuItem value="CNN">Convolutional</MenuItem>
            <MenuItem value="RNN">Recurrent</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Typography variant="subtitle1">Architecture</Typography></AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" gutterBottom>Hidden layers: {state.layers}</Typography>
                <Slider size="small" min={1} max={6} step={1} value={state.layers}
                  onChange={(_,v)=>setState(s=>({...s, layers:v}))}/>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" gutterBottom>Neurons / layer: {state.neurons}</Typography>
                <Slider size="small" min={2} max={16} step={1} value={state.neurons}
                  onChange={(_,v)=>setState(s=>({...s, neurons:v}))}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Typography variant="subtitle1">Hyperparameters</Typography></AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="bias">Bias</InputLabel>
                  <Select labelId="bias" label="Bias" value={state.biasMode}
                    onChange={(e)=>setState(s=>({...s, biasMode:e.target.value}))}>
                    <MenuItem value="Adjustable">Adjustable</MenuItem>
                    <MenuItem value="Fixed">Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField size="small" fullWidth type="number" label="Threshold" value={state.threshold}
                  onChange={(e)=>setState(s=>({...s, threshold: Number(e.target.value)}))}/>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>Learning rate: {state.learningRate.toFixed(2)}</Typography>
                <Slider size="small" min={0.01} max={1} step={0.01} value={state.learningRate}
                  onChange={(_,v)=>setState(s=>({...s, learningRate:v}))}/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="dataset">Dataset</InputLabel>
                  <Select labelId="dataset" label="Dataset" value={state.dataset}
                    onChange={(e)=>setState(s=>({...s, dataset:e.target.value}))}>
                    <MenuItem value="XOR">XOR Pattern</MenuItem>
                    <MenuItem value="Circles">Concentric Circles</MenuItem>
                    <MenuItem value="Moons">Two Moons</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth variant={state.isTraining? "contained":"outlined"}
          onClick={()=>setState(s=>({...s, isTraining:!s.isTraining}))}>
          {state.isTraining ? "Pause" : "Resume"} Training
        </Button>
      </Grid>
    </Grid>
  );
}
