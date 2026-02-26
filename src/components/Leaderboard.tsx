import { mockLeaderboard } from '../mockData';
import { Award, Crown, Medal, Trophy } from 'lucide-react';

export default function Leaderboard() {
  const topThree = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  const getPodiumIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 'h-48';
      case 2:
        return 'h-40';
      case 3:
        return 'h-32';
      default:
        return 'h-32';
    }
  };

  const getPodiumOrder = () => {
    return [topThree[1], topThree[0], topThree[2]];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Leaderboard</h2>
        <p className="text-gray-600">Top performing students by token count</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-end justify-center gap-4 mb-4">
          {getPodiumOrder().map((student) => (
            <div key={student.id} className="flex flex-col items-center">
              <div className="mb-2">{getPodiumIcon(student.rank)}</div>
              <div className="text-center mb-3">
                <div className="font-semibold text-gray-800 text-lg">{student.name}</div>
                <div className="flex items-center justify-center gap-1 text-blue-600 mt-1">
                  <Award className="w-4 h-4" />
                  <span className="font-bold text-xl">{student.totalTokens}</span>
                </div>
              </div>
              <div
                className={`w-32 ${getPodiumHeight(
                  student.rank
                )} bg-gradient-to-t ${
                  student.rank === 1
                    ? 'from-yellow-400 to-yellow-300'
                    : student.rank === 2
                    ? 'from-gray-400 to-gray-300'
                    : 'from-orange-500 to-orange-400'
                } rounded-t-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-3xl">{student.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Rankings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {rest.map((student) => (
            <div
              key={student.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-700">{student.rank}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{student.name}</div>
                  {student.totalTokens >= 16 && (
                    <span className="text-xs text-green-600 font-medium">Eligible</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Award className="w-5 h-5" />
                <span className="font-bold text-xl">{student.totalTokens}</span>
                <span className="text-sm text-gray-600">tokens</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
