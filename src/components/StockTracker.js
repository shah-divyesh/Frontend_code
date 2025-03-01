import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StockChart from "./StockChart";
import "../App.css"; // Import the global CSS file

const BASE_URL = "http://127.0.0.1:8000";

const defaultStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

const StockTracker = () => {
    const [stocks, setStocks] = useState(defaultStocks);
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchStockPrices = useCallback(async () => {
        setLoading(true);
        try {
            const responses = await Promise.all(
                stocks.map(symbol => axios.post(`${BASE_URL}/api/stocks/stock_price`, { symbol }))
            );

            const updatedData = {};
            responses.forEach((response, index) => {
                if (response.data.price) {
                    updatedData[stocks[index]] = response.data.price;
                }
            });

            setStockData(updatedData);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
    }, [stocks]);

    useEffect(() => {
        fetchStockPrices();
        const interval = setInterval(fetchStockPrices, 30000);
        return () => clearInterval(interval);
    }, [fetchStockPrices]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && !stocks.includes(searchQuery.toUpperCase())) {
            setStocks([searchQuery.toUpperCase(), ...stocks]);
        }
        setSearchQuery("");
    };

    return (
        <div className="stock-container">
            <h2 className="stock-title">📈 Live Stock Prices</h2>

            <form onSubmit={handleSearch} className="stock-search-form">
                <input
                    type="text"
                    placeholder="🔍 Search stock (e.g. TSLA)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="stock-search-input"
                />
                <button type="submit" className="stock-search-button">Search</button>
            </form>

            {loading && <p className="stock-loading-text">Loading stock data...</p>}

            <div className="stock-list">
                {stocks.map((symbol) => (
                    <button
                        key={symbol}
                        onClick={() => setSelectedStock(symbol)}
                        className="stock-button"
                    >
                        {symbol}: {stockData[symbol] ? `$${parseFloat(stockData[symbol]).toFixed(2)}` : "Loading..."}
                    </button>
                ))}
            </div>

            {selectedStock && <StockChart symbol={selectedStock} />}
        </div>
    );
};

export default StockTracker;