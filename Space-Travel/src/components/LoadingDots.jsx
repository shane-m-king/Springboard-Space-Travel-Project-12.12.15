import styles from "./LoadingDots.module.css";
import { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length === 3 ? "" : prev + "."));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
      <span>{dots}</span>
  );
};

export default LoadingDots;