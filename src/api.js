import axios from 'axios';

// Sadly the alphantage API's free tier only supports up to 500 requests per day, so the 10 second refresh interval is not going to work.
// at 500 requests per day, I can check roughly once every 3 minutes.
const timeInterval = '15min';

const instance = axios.create({
  baseURL: 'https://www.alphavantage.co',
  params: {
    apikey: process.env.REACT_APP_API_KEY,
    interval: timeInterval
  }
});

const getStockTimeSeriesIntraday = async tickers => {
  const data = await Promise.all(
    tickers.map(ticker =>
      instance.get('/query', {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: ticker
        }
      })
    )
  );

  return data
    .map(({ data }) => data)
    .map(data => {
      const metaData = Object.entries(data['Meta Data'])
        .map(([key, value]) => [key.replace(/[0-9]\. /, '').replace(/ /, ''), value])
        .reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {});
      const firstTimeSeries = Object.entries(data[`Time Series (${timeInterval})`]).map(
        ([key, value]) => [
          key.replace(/[0-9]\. /, ''),
          Object.entries(value)
            .map(([key, value]) => [key.replace(/[0-9]\. /, '').replace(/ /, ''), value])
            .reduce((acc, [key, val]) => {
              acc[key] = val;
              return acc;
            }, {})
        ]
      );
      const timeSeries = firstTimeSeries
        .reduce((acc, [key, val]) => {
          acc.push({ date: new Date(key), ...val });
          return acc;
        }, [])
        .reverse();
      return { metaData, timeSeries };
    });
};

export { getStockTimeSeriesIntraday, timeInterval };
