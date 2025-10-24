import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { Form } from '../lib/supabase';

interface DashboardChartsProps {
  forms: (Form & { submissionCount: number })[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ forms }) => {
  // 1️⃣ Submissions per Form (Bar Chart)
  const submissionsPerForm = forms.map((form) => ({
    name: form.title,
    submissions: form.submissionCount,
  }));

  // 2️⃣ Forms Created per Day (Line Chart)
  const formsPerDay = forms.reduce<{ date: string; count: number }[]>((acc, form) => {
    const date = new Date(form.created_at).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) existing.count += 1;
    else acc.push({ date, count: 1 });
    return acc;
  }, []);

  // 3️⃣ Submission Distribution (Pie Chart)
  const submissionDistribution = [
    { name: '0 Submissions', value: forms.filter((f) => f.submissionCount === 0).length },
    { name: '1-5 Submissions', value: forms.filter((f) => f.submissionCount >= 1 && f.submissionCount <= 5).length },
    { name: '6-20 Submissions', value: forms.filter((f) => f.submissionCount >= 6 && f.submissionCount <= 20).length },
    { name: '21+ Submissions', value: forms.filter((f) => f.submissionCount >= 21).length },
  ];

  // 🎨 Colors
  const barColors = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const lineColor = '#6366f1';
  const pieColors = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Submissions per Form - Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Submissions per Form</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={submissionsPerForm} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={false} /> {/* removed X-axis labels */}
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="submissions">
              {submissionsPerForm.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Forms Created per Day - Smooth Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Forms Created per Day</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formsPerDay} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke={lineColor} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Submission Distribution - Pie Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Submission Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={submissionDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name }) => name.length > 12 ? `${name.slice(0, 12)}...` : name}
            >
              {submissionDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
