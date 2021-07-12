import './App.css';
import { getStockTimeSeriesIntraday } from './api';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
const stocks = ['GME', 'AMC', 'WISH'];

function App() {
  const [stockData, setStockData] = useState(null);
  useEffect(() => {
    (async () => {
      const stockResults = await getStockTimeSeriesIntraday(stocks);
      setStockData(stockResults);
    })();
  }, []);

  return (
    <React.Fragment>
      {!stockData ? null : stockData.map((stock, i) => <Chart stock={stock} key={i} />)}
    </React.Fragment>
  );
}

export default App;
