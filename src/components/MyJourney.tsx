import { mockCompletedActivities, currentUserTokens } from '../mockData';
import { Award, CheckCircle, Trophy } from 'lucide-react';

export default function MyJourney() {
  const totalTokens = mockCompletedActivities.reduce(
    (sum, activity) => sum + activity.tokensEarned,
    0
  );
  const isEligible = totalTokens >= 16;
  let runningTotal = 0;

  return (
  <div className="max-w-4xl mx-auto">

    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-6 mb-6 transition">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
        My Journey
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Your path to eligibility through completed activities
      </p>
    </div>

    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-6 mb-6 transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
            Total Tokens Earned
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {isEligible ? 'You are eligible!' : `${16 - totalTokens} more tokens needed`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-4xl font-bold text-rose-600 dark:text-rose-400">
              {totalTokens}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              / 16 tokens
            </div>
          </div>
          {isEligible && (
            <Trophy className="w-12 h-12 text-yellow-500" />
          )}
        </div>
      </div>

      <div className="mt-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            isEligible ? 'bg-green-500' : 'bg-rose-600'
          }`}
          style={{ width: `${Math.min((totalTokens / 16) * 100, 100)}%` }}
        />
      </div>
    </div>

    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm p-6 transition">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-6">
        Activity Timeline
      </h3>

      <div className="relative">
        {mockCompletedActivities.map((activity, index) => {
          runningTotal += activity.tokensEarned;
          const wasEligibilityReached =
            runningTotal >= 16 &&
            runningTotal - activity.tokensEarned < 16;

          return (
            <div key={activity.id} className="relative pb-8 last:pb-0">
              <div className="flex items-start gap-4">

                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      wasEligibilityReached
                        ? 'bg-green-500'
                        : 'bg-rose-500'
                    }`}
                  >
                    {wasEligibilityReached ? (
                      <Trophy className="w-5 h-5 text-white" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {index < mockCompletedActivities.length - 1 && (
                    <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-600 absolute top-10" />
                  )}
                </div>

                <div
                  className={`flex-1 ${
                    wasEligibilityReached
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                      : 'bg-zinc-50 dark:bg-zinc-900'
                  } rounded-lg p-4 transition`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                        {activity.activityName}
                      </h4>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {new Date(activity.completedDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>

                      {wasEligibilityReached && (
                        <div className="mt-2 inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Eligibility Reached!
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                      <Award className="w-5 h-5" />
                      <span className="text-xl font-bold">
                        +{activity.tokensEarned}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {mockCompletedActivities.length === 0 && (
        <div className="text-center py-8">
          <Award className="w-16 h-16 text-zinc-400 dark:text-zinc-500 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
            No Completed Activities Yet
          </h4>
          <p className="text-zinc-600 dark:text-zinc-400">
            Start and complete activities to see your journey
          </p>
        </div>
      )}
    </div>

  </div>
);
}
