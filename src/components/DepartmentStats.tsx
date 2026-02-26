import { TrendingUp } from 'lucide-react';

export default function DepartmentStats() {
  const departments = [
    { name: 'CSE', total: 320 },
    { name: 'ECE', total: 280 },
    { name: 'BSc', total: 190 },
    { name: 'BALLB', total: 150 },
    { name: 'MBA', total: 210 },
  ];

  const maxTokens = Math.max(...departments.map((d) => d.total));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Department Performance</h2>
        <p className="text-gray-600 mt-1">
          Total tokens earned by each department
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
          const percentage = (dept.total / maxTokens) * 100;

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{dept.name}</h3>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>

              <p className="text-3xl font-bold text-blue-600">
                {dept.total}
              </p>
              <p className="text-sm text-gray-500 mb-4">Total Tokens</p>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {percentage.toFixed(0)}% of highest department
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
