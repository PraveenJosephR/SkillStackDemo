import { Github, Linkedin, Award, BookOpen, Trophy, FileText } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  tokens: number;
}

export default function Profile() {

  const student = {
    name: 'Arjun Kumar',
    rollNo: '22CSE001',
    registerNo: 'REG2022001',
    department: 'CSE',
    program: 'B-Tech',
    year: '3rd Year',
    gender: 'Male',
    bloodGrp: 'O+',
    section: 'A1',
    supervisor: 'Dr. Rajesh',
    github: 'https://github.com/arjun',
    linkedin: 'https://linkedin.com/in/arjun',
    hackerrank: 'arjun_hr',
    leetcode: 'arjun_lc',
    codechef: 'arjun_cc',
  };

  const certifications: Activity[] = [
    { id: 1, title: 'NPTEL - Python', description: 'Completed Python Programming', tokens: 3 },
    { id: 2, title: 'AWS Cloud', description: 'AWS Practitioner Certification', tokens: 4 },
  ];

  const workshops: Activity[] = [
    { id: 3, title: 'AI Workshop', description: 'Hands-on AI Workshop', tokens: 2 },
    { id: 4, title: 'Cybersecurity Bootcamp', description: 'Ethical Hacking Basics', tokens: 2 },
  ];

  const achievements: Activity[] = [
    { id: 5, title: 'NCC Camp', description: 'Participated in NCC Annual Camp', tokens: 3 },
    { id: 6, title: 'Intercollege Sports', description: 'Won 2nd place in Football', tokens: 3 },
  ];

  const publications: Activity[] = [
    { id: 7, title: 'AI Research Paper', description: 'Published in IEEE Conference', tokens: 5 },
  ];

  const Section = ({
    title,
    icon,
    data
  }: {
    title: string;
    icon: React.ReactNode;
    data: Activity[];
  }) => (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-zinc-800 dark:text-zinc-100">
                {item.title}
              </h3>
              <span className="text-xs bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-2 py-1 rounded-full">
                {item.tokens} Tokens
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* LEFT PANEL */}
      <div className="col-span-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">

        <div className="flex flex-col items-center">
          <img
            src="/assets/img/student.jpg"
            className="w-28 h-28 rounded-md object-cover border border-zinc-200 dark:border-zinc-700 mb-4"
          />
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            {student.name}
          </h2>
        </div>

        {/* DETAILS */}
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6 flex text-sm text-zinc-600 dark:text-zinc-400">

          <div className="w-1/2 space-y-2 pr-4">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Roll No:</span> {student.rollNo}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Register No:</span> {student.registerNo}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Department:</span> {student.department}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Program:</span> {student.program}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Section:</span> {student.section}</p>
          </div>

          <div className="w-px bg-zinc-200 dark:bg-zinc-700 mx-3"></div>

          <div className="w-1/2 space-y-2 pl-4">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Year:</span> {student.year}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Gender:</span> {student.gender}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Blood Group:</span> {student.bloodGrp}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Supervisor:</span> {student.supervisor}</p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6">

          <div className="flex justify-center gap-6 mb-4 text-zinc-700 dark:text-zinc-300">
            <a href={student.github} target="_blank">
              <Github className="w-5 h-5 hover:text-rose-500 transition cursor-pointer" />
            </a>

            <a href={student.linkedin} target="_blank">
              <Linkedin className="w-5 h-5 hover:text-rose-500 transition cursor-pointer" />
            </a>
          </div>

          <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">LeetCode:</span> {student.leetcode}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">HackerRank:</span> {student.hackerrank}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">CodeChef:</span> {student.codechef}</p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-2 space-y-8">

        <Section
          title="Certifications Completed"
          icon={<Award className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          data={certifications}
        />

        <Section
          title="Workshops Attended"
          icon={<BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          data={workshops}
        />

        <Section
          title="Achievements"
          icon={<Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
          data={achievements}
        />

        <Section
          title="Research Publications"
          icon={<FileText className="w-5 h-5 text-green-600 dark:text-green-400" />}
          data={publications}
        />

      </div>
    </div>
  );
}