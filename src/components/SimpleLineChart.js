import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
const SimpleLineChart = ({ data }) => {
  const finalData = [];
  const createArray = (dateRate) => {
    finalData.push({
      date: dateRate,
      rate: Object.values(data[dateRate]),
    });
  };
  for (let dateRate in data) {
    createArray(dateRate);
  }
  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          width={300}
          height={300}
          data={finalData}
          margin={{ top: 5, right: 5, bottom: 5 }}
        >
          <XAxis dataKey='date' />
          <YAxis dataKey='rate' />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='rate'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleLineChart;
