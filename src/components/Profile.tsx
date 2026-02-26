import { useEffect } from 'react';

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
  };

  const activities: Activity[] = [
    { id: 1, title: 'Internship', description: '2 Month Software Internship', tokens: 6 },
    { id: 2, title: 'Hackathon', description: 'National Level Hackathon', tokens: 4 },
    { id: 3, title: 'NPTEL', description: 'Completed Python Course', tokens: 3 },
    { id: 4, title: 'Udemy', description: 'React Development Course', tokens: 2 },
    { id: 5, title: 'NCC', description: 'Participated in NCC Camp', tokens: 3 },
  ];

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* LEFT PANEL */}
      <div className="col-span-1 bg-white rounded-2xl shadow-sm border p-6">

        <div className="flex flex-col items-center">
          <img
            src="/assets/img/student.jpg"
            className="w-28 h-28 rounded-full object-cover border mb-4"
          />

          <h2 className="text-xl font-semibold">{student.name}</h2>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-600">
          <p><span className="font-medium">Roll No:</span> {student.rollNo}</p>
          <p><span className="font-medium">Register No:</span> {student.registerNo}</p>
          <p><span className="font-medium">Department:</span> {student.department}</p>
          <p><span className="font-medium">Program:</span> {student.program}</p>
          <p><span className="font-medium">Section:</span> {student.section}</p>
          <p><span className="font-medium">Year:</span> {student.year}</p>
          <p><span className="font-medium">Gender:</span> {student.gender}</p>
          <p><span className="font-medium">Blood Goup:</span> {student.bloodGrp}</p>
          <p><span className="font-medium">Supervisor:</span> {student.supervisor}</p>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-2 space-y-6">

        <h2 className="text-xl font-semibold">Activities</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{activity.title}</h3>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {activity.tokens} Tokens
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}