import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon.jsx';

const DepartmentProgressChart = ({ departmentData, chartType, onChartTypeChange }) => {
  const COLORS = ['#2E7D32', '#1565C0', '#FF8F00', '#D32F2F', '#7B1FA2', '#00695C'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-sm text-popover-foreground">
            Progress: {data?.value}%
          </p>
          <p className="text-sm text-muted-foreground">
            {data?.payload?.enrolled} staff enrolled
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Department Progress</h3>
          <p className="text-sm text-muted-foreground">Training completion by department</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChartTypeChange('bar')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="BarChart3" size={20} />
          </button>
          <button
            onClick={() => onChartTypeChange('pie')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'pie' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="PieChart" size={20} />
          </button>
        </div>
      </div>
      <div className="h-80">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="department"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="progress"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name="Progress"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="progress"
                label={({ department, progress }) => `${department}: ${progress}%`}
                labelLine={false}
              >
                {departmentData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Department Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {departmentData?.map((dept, index) => (
          <div key={dept?.department} className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{dept?.department}</p>
              <p className="text-xs text-muted-foreground">
                {dept?.enrolled} staff • {dept?.progress}% complete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentProgressChart;