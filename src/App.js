import './App.css';
import mascot from './assets/mascot.jpg';
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
      <img src={mascot} alt="Stonks" width="198" height="112" />
      {!stockData ? null : stockData.map((stock, i) => <Chart stock={stock} key={i} />)}
    </React.Fragment>
  );
}

export default App;
