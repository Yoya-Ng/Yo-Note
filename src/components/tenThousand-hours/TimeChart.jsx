
import { useState, useEffect } from 'react';
import { getProjectStats } from 'src/utils/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TimeChart() {
  const [chartData, setChartData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const stats = getProjectStats();
      setChartData(stats);
    }
  }, []);

  if (!isClient) {
    return <div className="loading">Loading chart...</div>;
  }

  if (chartData.length === 0) {
    return <div className="text-center py-10 text-gray-500">尚無數據可顯示</div>;
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 10000]} />
          <YAxis type="category" dataKey="name" width={100} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'totalHours') return [`${value.toFixed(1)} 小時`, '累計時數'];
              return [`${value.toFixed(2)}%`, '完成度'];
            }}
          />
          <Legend />
          <Bar dataKey="totalHours" fill="#3b82f6" name="累計時數" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">一萬小時進度</h3>
        {chartData.map(project => (
          <div key={project.name} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{project.name}</span>
              <span>{project.percentage.toFixed(2)}% ({project.totalHours.toFixed(1)} / 10,000 小時)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(project.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
