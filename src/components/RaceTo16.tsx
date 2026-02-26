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
      <h2 className="text-2xl font-bold">Race to 16</h2>

      {students.map((student, index) => {
        const percentage = Math.min((student.tokens / 16) * 100, 100);

        return (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{student.name}</span>
              <span className="font-semibold">{student.tokens} / 16</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  student.tokens >= 16 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {student.tokens >= 16 && (
              <p className="text-green-600 text-sm mt-2 font-medium">
                🎉 Reached 16 Tokens!
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
