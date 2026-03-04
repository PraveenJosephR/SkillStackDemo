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
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
        Department Performance
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mt-1">
        Total tokens earned by each department
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept, index) => {
        const percentage = (dept.total / maxTokens) * 100;

        return (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                {dept.name}
              </h3>
              <TrendingUp className="w-5 h-5 text-rose-500 dark:text-rose-400" />
            </div>

            <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
              {dept.total}
            </p>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Total Tokens
            </p>

            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div
                className="bg-rose-600 dark:bg-rose-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {percentage.toFixed(0)}% of highest department
            </p>
          </div>
        );
      })}
    </div>

  </div>
);
}
