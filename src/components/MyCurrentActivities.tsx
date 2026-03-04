import { mockCurrentActivities } from '../mockData';
import { Award, Clock } from 'lucide-react';

export default function MyCurrentActivities() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-rose-100 text-rose-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
  <div className="max-w-4xl mx-auto">

    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-6 mb-6 transition">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
        My Current Activities
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Track your ongoing activities and progress
      </p>
    </div>

    {mockCurrentActivities.length === 0 ? (
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-12 text-center transition">
        <Clock className="w-16 h-16 text-zinc-400 dark:text-zinc-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
          No Active Activities
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Start a new activity to begin earning tokens
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {mockCurrentActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-6 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  {activity.activityName}
                </h3>

                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(
                    activity.status
                  )}`}
                >
                  {activity.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Award className="w-5 h-5" />
                <span className="text-2xl font-bold">
                  {activity.tokensToEarn}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  tokens
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                <span>Progress</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {activity.progress}%
                </span>
              </div>

              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
                <div
                  className="bg-rose-600 dark:bg-rose-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${activity.progress}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    )}

  </div>
);
}
