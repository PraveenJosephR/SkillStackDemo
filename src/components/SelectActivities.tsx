import { availableActivities } from '../mockData';
import { Award, Play } from 'lucide-react';
import { useState } from 'react';

export default function SelectActivities() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleStart = (activityId: string, activityName: string) => {
    setSelectedActivity(activityId);
    setTimeout(() => {
      alert(`Started activity: ${activityName}. This would be tracked in your Current Activities.`);
      setSelectedActivity(null);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Activities</h2>
        <p className="text-gray-600">Choose activities to earn tokens and become eligible</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.name}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{activity.tokens}</span>
                <span className="text-gray-600 text-sm">tokens</span>
              </div>

              <button
                onClick={() => handleStart(activity.id, activity.name)}
                disabled={selectedActivity === activity.id}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
