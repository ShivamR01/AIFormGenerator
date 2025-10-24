import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface AnalyticsChartsProps {
  submissionTrends: { date: string; count: number }[];
  topFields: { field: string; count: number }[];
}

const COLORS = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ submissionTrends, topFields }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ===== Submission Trends ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Submission Trends</h2>
        {submissionTrends.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400">No data available</div>
        ) : (
          <div className="w-full h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionTrends} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ===== Top Fields ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Top Fields Filled</h2>
        {topFields.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400">No data available</div>
        ) : (
          <div className="w-full h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topFields}
                  dataKey="count"
                  nameKey="field"
                  outerRadius={80}
                  label={({ name }) => name.length > 12 ? `${name.slice(0, 12)}...` : name}
                >
                  {topFields.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  );
};
