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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Journey</h2>
        <p className="text-gray-600">Your path to eligibility through completed activities</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Tokens Earned</h3>
            <p className="text-sm text-gray-600">
              {isEligible ? 'You are eligible!' : `${16 - totalTokens} more tokens needed`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{totalTokens}</div>
              <div className="text-sm text-gray-600">/ 16 tokens</div>
            </div>
            {isEligible && <Trophy className="w-12 h-12 text-yellow-500" />}
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              isEligible ? 'bg-green-500' : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min((totalTokens / 16) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Timeline</h3>

        <div className="relative">
          {mockCompletedActivities.map((activity, index) => {
            runningTotal += activity.tokensEarned;
            const wasEligibilityReached = runningTotal >= 16 && runningTotal - activity.tokensEarned < 16;

            return (
              <div key={activity.id} className="relative pb-8 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        wasEligibilityReached
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {wasEligibilityReached ? (
                        <Trophy className="w-5 h-5 text-white" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    {index < mockCompletedActivities.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 absolute top-10" />
                    )}
                  </div>

                  <div
                    className={`flex-1 ${
                      wasEligibilityReached
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-gray-50'
                    } rounded-lg p-4`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {activity.activityName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.completedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        {wasEligibilityReached && (
                          <div className="mt-2 inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Eligibility Reached!
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Award className="w-5 h-5" />
                        <span className="text-xl font-bold">+{activity.tokensEarned}</span>
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
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Completed Activities Yet</h4>
            <p className="text-gray-600">Start and complete activities to see your journey</p>
          </div>
        )}
      </div>
    </div>
  );
}
