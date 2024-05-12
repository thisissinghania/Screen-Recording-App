import React, { useEffect, useState } from "react";
import { Spin, Progress } from "antd";
import "./style.css";

const Loader = ({ fileLoading }) => {
  const [loadData, setLoadData] = useState(0);

  useEffect(() => {
    console.log("fileLoading>>", fileLoading);
    const interval = setInterval(() => {
      setLoadData((prev) => {
        if (!fileLoading) {
          clearInterval(interval);
          return 100;
        }
        if (prev == 99) return prev;
        return prev + 9;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [fileLoading]);

  return (
    <div className="loader-section">
      <Spin />
      <div className="progressBar">
        <Progress percent={loadData} />
      </div>
    </div>
  );
};

export default Loader;
