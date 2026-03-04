export default function RaceTo16() {
  const students = [
    { name: 'Arjun', tokens: 16 },
    { name: 'Priya', tokens: 15 },
    { name: 'Karthik', tokens: 14 },
    { name: 'Sneha', tokens: 12 },
    { name: 'Rahul', tokens: 9 },
    { name: 'Meena', tokens: 7 },
  ];

 return (
  <div className="space-y-6">

    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
      Race to 16
    </h2>

    {students.map((student, index) => {
      const percentage = Math.min((student.tokens / 16) * 100, 100);

      return (
        <div
          key={index}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-sm transition"
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              {student.name}
            </span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {student.tokens} / 16
            </span>
          </div>

          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                student.tokens >= 16
                  ? 'bg-emerald-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {student.tokens >= 16 && (
            <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2 font-medium">
              🎉 Reached 16 Tokens!
            </p>
          )}
        </div>
      );
    })}

  </div>
);
}
