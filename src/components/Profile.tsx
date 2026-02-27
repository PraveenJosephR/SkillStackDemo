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
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{item.title}</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {item.tokens} Tokens
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* LEFT PANEL */}
      <div className="col-span-1 bg-white rounded-2xl shadow-sm border p-6">

        <div className="flex flex-col items-center">
          <img
            src="/assets/img/student.jpg"
            className="w-28 h-28 rounded-md object-cover border mb-4"
          />
          <h2 className="text-xl font-semibold">{student.name}</h2>
        </div>

        {/* DETAILS 2 COLUMN SPLIT */}
        <div className="mt-6 border-t pt-6 flex text-sm text-gray-600">

          <div className="w-1/2 space-y-2 pr-4">
            <p><span className="font-medium">Roll No:</span> {student.rollNo}</p>
            <p><span className="font-medium">Register No:</span> {student.registerNo}</p>
            <p><span className="font-medium">Department:</span> {student.department}</p>
            <p><span className="font-medium">Program:</span> {student.program}</p>
            <p><span className="font-medium">Section:</span> {student.section}</p>
          </div>

          <div className="w-px bg-gray-200 mx-3"></div>

          <div className="w-1/2 space-y-2 pl-4">
            <p><span className="font-medium">Year:</span> {student.year}</p>
            <p><span className="font-medium">Gender:</span> {student.gender}</p>
            <p><span className="font-medium">Blood Group:</span> {student.bloodGrp}</p>
            <p><span className="font-medium">Supervisor:</span> {student.supervisor}</p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 border-t pt-6">

          <div className="flex justify-center gap-6 mb-4">
            <a href={student.github} target="_blank" title="GitHub Profile">
              <Github className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            </a>

            <a href={student.linkedin} target="_blank" title="LinkedIn Profile">
              <Linkedin className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            </a>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p><span className="font-medium">LeetCode:</span> {student.leetcode}</p>
            <p><span className="font-medium">HackerRank:</span> {student.hackerrank}</p>
            <p><span className="font-medium">CodeChef:</span> {student.codechef}</p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-2 space-y-8">

        <Section
          title="Certifications Completed"
          icon={<Award className="w-5 h-5 text-blue-600" />}
          data={certifications}
        />

        <Section
          title="Workshops Attended"
          icon={<BookOpen className="w-5 h-5 text-purple-600" />}
          data={workshops}
        />

        <Section
          title="Achievements"
          icon={<Trophy className="w-5 h-5 text-yellow-600" />}
          data={achievements}
        />

        <Section
          title="Research Publications"
          icon={<FileText className="w-5 h-5 text-green-600" />}
          data={publications}
        />

      </div>
    </div>
  );
}