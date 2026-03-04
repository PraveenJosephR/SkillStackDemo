import { useState, useMemo } from 'react';
import { Search, Award, User, BookOpen } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  tokens: number;
  status: 'Completed' | 'Ongoing';
}
interface StudentWithMatches extends Student {
  matchedActivities: Activity[];
}

interface Student {
  id: number;
  name: string;
  department: string;
  program: string;
  year: string;
  section: string;
  staffIncharge: string;
  tokens: number;
  activities: Activity[];
}

export default function SkillConnect() {
  const [keyword, setKeyword] = useState('');

  const students: Student[] = [
    {
      id: 1,
      name: 'Arjun Kumar',
      department: 'CSE',
      program: 'B-Tech',
      year: '3rd Year',
      section: 'C1',
      staffIncharge: 'Dr. Rajesh',
      tokens: 18,
      activities: [
        { id: 1, title: 'AI Hackathon', description: 'Built ML prediction model', tokens: 4, status: 'Completed' },
        { id: 2, title: 'Web Internship', description: 'Frontend React Developer', tokens: 6, status: 'Completed' },
      ],
    },
    {
      id: 2,
      name: 'Meera Sharma',
      department: 'ECE',
      program: 'B.E',
      year: '2nd Year',
      section: 'E2',
      staffIncharge: 'Dr. Priya',
      tokens: 14,
      activities: [
        { id: 3, title: 'IoT Workshop', description: 'Smart sensor systems', tokens: 3, status: 'Completed' },
        { id: 4, title: 'Robotics Event', description: 'Autonomous bot design', tokens: 5, status: 'Completed' },
      ],
    },
    {
      id: 3,
      name: 'Rahul Verma',
      department: 'CSE',
      program: 'B-Tech',
      year: '4th Year',
      section: 'C3',
      staffIncharge: 'Dr. Manoj',
      tokens: 22,
      activities: [
        { id: 5, title: 'Data Science Internship', description: 'Worked on ML pipelines', tokens: 6, status: 'Completed' },
        { id: 6, title: 'Cyber Security Bootcamp', description: 'Ethical hacking and pentesting', tokens: 4, status: 'Completed' },
      ],
    },
    {
  id: 4,
  name: 'Ananya Iyer',
  department: 'CSE',
  program: 'B-Tech',
  year: '1st Year',
  section: 'C2',
  staffIncharge: 'Dr. Rajesh',
  tokens: 12,
  activities: [
    { id: 7, title: 'Python Certification', description: 'Completed NPTEL Python course', tokens: 3, status: 'Completed' },
    { id: 8, title: 'UI/UX Workshop', description: 'Design thinking and prototyping', tokens: 2, status: 'Completed' },
  ],
},
{
  id: 5,
  name: 'Karthik Nair',
  department: 'EEE',
  program: 'B.E',
  year: '3rd Year',
  section: 'E1',
  staffIncharge: 'Dr. Suresh',
  tokens: 19,
  activities: [
    { id: 9, title: 'EV Design Project', description: 'Electric vehicle prototype build', tokens: 5, status: 'Completed' },
    { id: 10, title: 'Power Systems Internship', description: 'Worked at renewable energy plant', tokens: 6, status: 'Completed' },
  ],
},
{
  id: 6,
  name: 'Divya R',
  department: 'MBA',
  program: 'MBA',
  year: '2nd Year',
  section: 'M1',
  staffIncharge: 'Dr. Kavitha',
  tokens: 16,
  activities: [
    { id: 11, title: 'Marketing Strategy Workshop', description: 'Brand positioning and analytics', tokens: 3, status: 'Completed' },
    { id: 12, title: 'Business Analytics Certification', description: 'Data-driven decision making', tokens: 4, status: 'Completed' },
  ],
},
{
  id: 7,
  name: 'Sanjay Patel',
  department: 'CSE',
  program: 'B-Tech',
  year: '2nd Year',
  section: 'C4',
  staffIncharge: 'Dr. Manoj',
  tokens: 15,
  activities: [
    { id: 13, title: 'Open Source Contribution', description: 'Contributed to React GitHub repo', tokens: 4, status: 'Completed' },
    { id: 14, title: 'Hackathon Finalist', description: 'Blockchain-based voting system', tokens: 5, status: 'Completed' },
  ],
},
{
  id: 8,
  name: 'Lakshmi Priya',
  department: 'ECE',
  program: 'B.E',
  year: '4th Year',
  section: 'E3',
  staffIncharge: 'Dr. Priya',
  tokens: 21,
  activities: [
    { id: 15, title: 'Embedded Systems Internship', description: 'Worked on microcontroller firmware', tokens: 6, status: 'Completed' },
    { id: 16, title: 'VLSI Workshop', description: 'ASIC design basics', tokens: 3, status: 'Completed' },
  ],
},
{
  id: 9,
  name: 'Mohammed Faiz',
  department: 'BBA',
  program: 'BBA',
  year: '1st Year',
  section: 'B1',
  staffIncharge: 'Dr. Kavitha',
  tokens: 10,
  activities: [
    { id: 17, title: 'Entrepreneurship Seminar', description: 'Startup pitch fundamentals', tokens: 2, status: 'Completed' },
    { id: 18, title: 'Finance Internship', description: 'Worked in accounting department', tokens: 4, status: 'Completed' },
  ],
},
{
  id: 10,
  name: 'Sneha Menon',
  department: 'CSE',
  program: 'M-Tech',
  year: '1st Year',
  section: 'MT1',
  staffIncharge: 'Dr. Rajesh',
  tokens: 17,
  activities: [
    { id: 19, title: 'Research Publication', description: 'Published AI research paper', tokens: 6, status: 'Completed' },
    { id: 20, title: 'Cloud Certification', description: 'AWS Solutions Architect', tokens: 4, status: 'Completed' },
  ],
},
{
  id: 11,
  name: 'Vikram Singh',
  department: 'CSE',
  program: 'B-Tech',
  year: '3rd Year',
  section: 'C1',
  staffIncharge: 'Dr. Manoj',
  tokens: 20,
  activities: [
    { id: 21, title: 'Cybersecurity Internship', description: 'Penetration testing and security audits', tokens: 6, status: 'Completed' },
    { id: 22, title: 'Competitive Coding', description: 'Solved 300+ LeetCode problems', tokens: 5, status: 'Completed' },
  ],
},
  ];

const filteredStudents: StudentWithMatches[] = useMemo(() => {
  if (!keyword.trim()) {
    return students.map((student) => ({
      ...student,
      matchedActivities: student.activities.filter(
        (activity: Activity) => activity.status === 'Completed'
      ),
    }));
  }

  const lowerKeyword = keyword.toLowerCase();

  return students
    .map((student) => {
      const matched = student.activities.filter(
        (activity: Activity) =>
          activity.status === 'Completed' &&
          (activity.title.toLowerCase().includes(lowerKeyword) ||
            activity.description.toLowerCase().includes(lowerKeyword))
      );

      if (matched.length > 0) {
        return { ...student, matchedActivities: matched };
      }

      return null;
    })
    .filter(
      (student): student is StudentWithMatches => student !== null
    );
}, [keyword]);

 return (
  <div className="space-y-8">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
        Skill Connect
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mt-1">
        Discover skilled students based on completed activities.
      </p>
    </div>

    {/* Search */}
    <div className="relative max-w-2xl">
      <Search className="absolute left-4 top-3.5 text-zinc-400 dark:text-zinc-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Search skills (AI, React, Robotics...)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
      />
    </div>

    {/* Results */}
    <div className="grid md:grid-cols-2 gap-6">

      {filteredStudents.length === 0 && (
        <div className="col-span-full text-center text-zinc-400 dark:text-zinc-500 py-10">
          No matching students found.
        </div>
      )}

      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6 hover:shadow-md dark:hover:bg-zinc-700 transition"
        >

          {/* Student Info */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
                {student.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {student.department} • {student.program} • {student.year}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Section: {student.section} • Incharge: {student.staffIncharge}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
              <Award className="w-4 h-4" />
              {student.tokens} Tokens
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            {(keyword
              ? student.matchedActivities
              : student.activities.filter(a => a.status === 'Completed')
            ).map((activity) => (
              <div
                key={activity.id}
                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                    <BookOpen className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                    {activity.title}
                  </h4>
                  <span className="text-xs bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-2 py-1 rounded-full">
                    {activity.tokens} Tokens
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  </div>
);
}