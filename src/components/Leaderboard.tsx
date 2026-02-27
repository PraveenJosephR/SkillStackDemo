import { useState } from 'react';
import { Award, Crown, Medal } from 'lucide-react';

export interface Student {
  id: number;
  name: string;
  department: string;
  program: string;
  year: string;
  section: string;
  totalTokens: number;
  rank: number;
}

const mockLeaderboard: Student[] = [
  { id: 1, name: 'Arjun Kumar', department: 'CSE', program: 'B-Tech', year: '3rd Year', section: 'C1', totalTokens: 25, rank: 1 },
  { id: 2, name: 'Meera Sharma', department: 'ECE', program: 'B.E', year: '2nd Year', section: 'E2', totalTokens: 22, rank: 2 },
  { id: 3, name: 'Rahul Verma', department: 'CSE', program: 'B-Tech', year: '4th Year', section: 'C3', totalTokens: 20, rank: 3 },
  { id: 4, name: 'Sneha Reddy', department: 'IT', program: 'B-Tech', year: '3rd Year', section: 'I1', totalTokens: 18, rank: 4 },
  { id: 5, name: 'Karthik Das', department: 'CSE', program: 'B-Tech', year: '2nd Year', section: 'C2', totalTokens: 16, rank: 5 },
  { id: 6, name: 'Ananya Gupta', department: 'ECE', program: 'B.E', year: '1st Year', section: 'E1', totalTokens: 15, rank: 6 },
  { id: 7, name: 'Vikram Singh', department: 'CSE', program: 'B-Tech', year: '1st Year', section: 'C1', totalTokens: 14, rank: 7 },
  { id: 8, name: 'Priya Menon', department: 'IT', program: 'B-Tech', year: '2nd Year', section: 'I2', totalTokens: 13, rank: 8 },
];

export default function Leaderboard() {
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [sectionFilter, setSectionFilter] = useState<string>('All');

  // Filters applied dynamically
  const filteredLeaderboard = mockLeaderboard.filter((student) => {
    const deptMatch = departmentFilter === 'All' || student.department === departmentFilter;
    const yearMatch = yearFilter === 'All' || student.year === yearFilter;
    const sectionMatch = sectionFilter === 'All' || student.section === sectionFilter;
    return deptMatch && yearMatch && sectionMatch;
  });

  const topThree = filteredLeaderboard.slice(0, 3);
  const rest = filteredLeaderboard.slice(3);

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
    if (topThree.length < 3) return topThree;
    return [topThree[1], topThree[0], topThree[2]];
  };

  const departments = ['All', ...Array.from(new Set(mockLeaderboard.map(s => s.department)))];
  const years = ['All', ...Array.from(new Set(mockLeaderboard.map(s => s.year)))];
  const sections = ['All', ...Array.from(new Set(mockLeaderboard.map(s => s.section)))];

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* Header & Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Leaderboard</h2>
          <p className="text-gray-600">Top performing students by token count</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Podium */}
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
                className={`w-32 ${getPodiumHeight(student.rank)} bg-gradient-to-t ${
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

      {/* Rest of the leaderboard */}
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
          {rest.length === 0 && (
            <div className="text-center py-6 text-gray-500">No students found for selected filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}