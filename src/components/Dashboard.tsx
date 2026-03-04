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

  // 🌙 detect dark mode
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const textColor = isDark ? "#e4e4e7" : "#27272a";      // zinc-200 / zinc-800
  const gridColor = isDark ? "#3f3f46" : "#e4e4e7";      // zinc-700 / zinc-200

  // ✅ DONUT DATA
  const pieData = {
    labels: ['Finished 16 Tokens', 'Below 16 Tokens'],
    datasets: [
      {
        data: [finished, notFinished],
        backgroundColor: ['#00bc7d', '#f43f5e'], // green-500 / rose-500
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // 👈 makes it DONUT
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  };

  const barData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: 'Tokens',
        data: students.map(s => s.tokens),
        backgroundColor: '#f43f5e', // rose-500 (brand consistency)
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: true,
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Total Tokens Growth',
        data: [40, 65, 90, 120, 150],
        borderColor: '#f43f5e',
        backgroundColor: '#f43f5e',
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
        Staff Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* DONUT */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-5 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Eligibility Overview
          </h3>
          <div className="h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* BAR */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-5 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Tokens Per Student
          </h3>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* LINE */}
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
          Monthly Token Growth
        </h3>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}