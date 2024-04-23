import React, { useEffect, useState } from 'react';

const StockDataTable = () => {
    const [stocks, setStocks] = useState([]);
    const [prevStocks, setPrevStocks] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch('http://161.97.165.65:30869/api/stocks');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPrevStocks(stocks.reduce((acc, stock) => {
                acc[stock.symbol] = stock;
                return acc;
            }, {}));
            setStocks(data);
        } catch (error) {
            console.error("Could not fetch stocks: ", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, []);

    const formatPrice = price => parseFloat(price).toFixed(2);

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
                <th>Trend</th>
            </tr>
            </thead>
            <tbody>
            {stocks.map((stock, index) => {
                const previous = prevStocks[stock.symbol];
                const lastSaleChange = previous ? stock.lastSale - previous.lastSale : 0;
                const trendSymbol = lastSaleChange === 0 ? '' : lastSaleChange > 0 ? '↑' : '↓';
                const trendColor = lastSaleChange > 0 ? 'green' : 'red';

                return (
                    <tr key={index}>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                        <td style={{ color: trendColor }}>{trendSymbol}</td>
                        <td>{formatPrice(stock.lastSale)}</td>
                        <td>{formatPrice(stock.highSale)}</td>
                        <td>{formatPrice(stock.lowSale)}</td>
                        <td>{formatPrice(stock.volatilityIndex)}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default StockDataTable;
