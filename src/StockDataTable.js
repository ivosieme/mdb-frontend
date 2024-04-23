import React, { useEffect, useState } from 'react';

const StockDataTable = () => {
    const [stocks, setStocks] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://161.97.165.65:30869/api/stocks');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setStocks(data);
        } catch (error) {
            console.error("Could not fetch stocks: ", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);  // Clear the interval when the component unmounts
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Last Sale</th>
                <th>High Sale</th>
                <th>Low Sale</th>
                <th>Volatility Index</th>
            </tr>
            </thead>
            <tbody>
            {stocks.map((stock, index) => (
                <tr key={index}>
                    <td>{stock.symbol}</td>
                    <td>{stock.name}</td>
                    <td>{stock.lastSale}</td>
                    <td>{stock.highSale}</td>
                    <td>{stock.lowSale}</td>
                    <td>{stock.volatilityIndex}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default StockDataTable;
