import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  // Mock student data
  const students = [
    { name: 'Arjun', tokens: 18 },
    { name: 'Priya', tokens: 15 },
    { name: 'Karthik', tokens: 17 },
    { name: 'Sneha', tokens: 20 },
    { name: 'Rahul', tokens: 9 },
    { name: 'Meena', tokens: 16 },
    { name: 'Vikram', tokens: 14 },
    { name: 'Anu', tokens: 22 },
  ];

  const finished = students.filter(s => s.tokens >= 16).length;
  const notFinished = students.length - finished;

  const pieData = {
    labels: ['Finished 16 Tokens', 'Below 16 Tokens'],
    datasets: [
      {
        data: [finished, notFinished],
        backgroundColor: ['#16a34a', '#ef4444'],
      },
    ],
  };

  const barData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: 'Tokens',
        data: students.map(s => s.tokens),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Total Tokens Growth',
        data: [40, 65, 90, 120, 150],
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Staff Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
  <div className="bg-white p-5 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-4">
      Eligibility Overview
    </h3>

    <div className="h-64">
      <Pie
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-4">
      Tokens Per Student
    </h3>

    <div className="h-64">
      <Bar
        data={barData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  </div>
</div>


      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Token Growth
        </h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}
