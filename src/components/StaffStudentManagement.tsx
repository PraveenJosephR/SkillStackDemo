import { useState } from 'react';
import StudentDetail from './StudentDetail';

interface Student {
  id: number;
  name: string;
  registerNo: string;
  rollNo: string;
  department: string;
  program: string;
  semester: number;
  batch: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  tokens: number;
}

export default function StaffStudentManagement() {

  const dummyStudents: Student[] = [
  {
    id: 1,
    name: 'Arjun Kumar',
    registerNo: '22CSE001',
    rollNo: 'CSE-01',
    department: 'CSE',
    program: 'BTech',
    semester: 6,
    batch: '2022-2026',
    gender: 'Male',
    bloodGroup: 'B+',
    email: 'arjun.kumar@college.edu',
    contactNo: '9876543210',
    tokens: 18,
  },
  {
    id: 2,
    name: 'Meera Nair',
    registerNo: '22ECE014',
    rollNo: 'ECE-14',
    department: 'ECE',
    program: 'BTech',
    semester: 6,
    batch: '2022-2026',
    gender: 'Female',
    bloodGroup: 'O+',
    email: 'meera.nair@college.edu',
    contactNo: '9123456780',
    tokens: 22,
  },
  {
    id: 3,
    name: 'Rahul Verma',
    registerNo: '23EEE032',
    rollNo: 'EEE-32',
    department: 'EEE',
    program: 'BTech',
    semester: 4,
    batch: '2023-2027',
    gender: 'Male',
    bloodGroup: 'A+',
    email: 'rahul.verma@college.edu',
    contactNo: '9988776655',
    tokens: 10,
  },
  {
    id: 4,
    name: 'Divya Sharma',
    registerNo: '21CSE045',
    rollNo: 'CSE-45',
    department: 'CSE',
    program: 'BTech',
    semester: 8,
    batch: '2021-2025',
    gender: 'Female',
    bloodGroup: 'AB+',
    email: 'divya.sharma@college.edu',
    contactNo: '9090909090',
    tokens: 30,
  },
];

  const [students, setStudents] = useState(dummyStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        goBack={() => setSelectedStudent(null)}
        updateTokens={(newTokens) => {
          setStudents((prev) =>
            prev.map((s) =>
              s.id === selectedStudent.id ? { ...s, tokens: newTokens } : s
            )
          );
          setSelectedStudent({ ...selectedStudent, tokens: newTokens });
        }}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Student Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <p className="text-xs text-gray-500">{student.registerNo}</p>

            <div className="mt-4 text-sm text-gray-600">
              <p>{student.department}</p>
              <p>{student.batch}</p>
            </div>

            <div className="mt-4">
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                {student.tokens} Tokens
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}