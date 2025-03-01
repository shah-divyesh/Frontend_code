import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BASE_URL = "http://127.0.0.1:8000";

const StockChart = ({ symbol }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchStockChartData = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/api/stocks/stock_history`, { symbol });
                setChartData(response.data);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };
        fetchStockChartData();
    }, [symbol]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StockChart;