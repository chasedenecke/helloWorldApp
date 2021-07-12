import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Tooltip,
  CandleSeries,
  Crosshair
} from '@syncfusion/ej2-react-charts';

const Chart = ({ stock, key }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const priceDate = stock.timeSeries[0].date;
  return (
    <ChartComponent
      key={key}
      primaryXAxis={{
        valueType: 'DateTime',
        labelFormat: 'Hh:mm',
        title: `${days[priceDate.getDay()]} ${
          months[priceDate.getMonth()]
        } ${priceDate.getDate()} ${stock.metaData.TimeZone}`,
        crosshairTooltip: { enable: true }
      }}
      primaryYAxis={{ title: 'Price', crosshairTooltip: { enable: true } }}
      tooltip={{ enable: true }}
      title={stock.metaData.Symbol}
      titleStyle={{ size: 25 }}>
      <Inject services={[CandleSeries, DateTime, Tooltip, Crosshair]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          type="Candle"
          name="Gamestop"
          dataSource={stock.timeSeries}
          xName="date"
          high="high"
          low="low"
          open="open"
          close="close"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Chart;
