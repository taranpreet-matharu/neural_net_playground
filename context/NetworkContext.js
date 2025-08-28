"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const Ctx = createContext(null);

export default function NetworkProvider({ children }) {
  const [state, setState] = useState({
    networkType: "Feedforward",
    layers: 2,
    neurons: 4,
    biasMode: "Adjustable",
    threshold: 0.5,
    learningRate: 0.03,
    dataset: "XOR",
    isTraining: true
  });

  const [history, setHistory] = useState([{ epoch: 1, accuracy: 0.2, loss: 0.8 }]);
  useEffect(()=>{
    if(!state.isTraining) return;
    const t = setInterval(()=>{
      setHistory(prev=>{
        const e = prev.length+1;
        const last = prev[prev.length-1];
        const loss = Math.max(0.05, last.loss - (0.02 + Math.random()*0.01));
        const acc = Math.min(0.98, last.accuracy + (0.03 + Math.random()*0.02));
        return [...prev, { epoch:e, accuracy:+acc.toFixed(3), loss:+loss.toFixed(3)}].slice(-60);
      });
    }, 700);
    return ()=>clearInterval(t);
  },[state.isTraining]);

  const value = useMemo(()=>({state,setState,history}),[state,history]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNetwork(){
  const v = useContext(Ctx);
  if(!v) throw new Error("useNetwork must be used within NetworkProvider");
  return v;
}
