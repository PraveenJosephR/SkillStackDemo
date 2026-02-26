import { useState } from 'react';
import { X, Trash2, Pencil } from 'lucide-react';

const activityOptions = [
  { name: 'Internship', tokens: 6 },
  { name: 'Event', tokens: 2 },
  { name: 'Workshop', tokens: 2 },
  { name: 'Volunteering', tokens: 2 },
  { name: 'Startup', tokens: 12 },
  { name: 'NPTEL', tokens: 4 },
  { name: 'Global Certification', tokens: 2 },
  { name: 'Udemy Course', tokens: 2 },
  { name: 'LeetCode Practice', tokens: 1 },
];

interface Activity {
  name: string;
  tokens: number;
  count: number;
}

export default function SemesterPlan() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [plan, setPlan] = useState<Activity[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const totalTokens =
    plan?.reduce((sum, item) => sum + item.tokens * item.count, 0) || 0;

  const modalTotal = activityOptions.reduce(
    (sum, option) =>
      sum + option.tokens * (selected[option.name] || 0),
    0
  );

  const changeCount = (name: string, delta: number) => {
    const current = selected[name] || 0;
    const updated = Math.max(0, current + delta);
    setSelected({ ...selected, [name]: updated });
  };

  const savePlan = () => {
    if (modalTotal < 16) {
      setError('Plan must have at least 16 tokens.');
      return;
    }

    const newPlan: Activity[] = activityOptions
      .filter(option => (selected[option.name] || 0) > 0)
      .map(option => ({
        name: option.name,
        tokens: option.tokens,
        count: selected[option.name],
      }));

    setPlan(newPlan);
    setIsModalOpen(false);
    setError('');
  };

  const deletePlan = () => {
    setPlan(null);
    setSelected({});
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-3xl font-bold">Semester Plan</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {plan ? 'Edit Plan' : 'Create Plan'}
          </button>

          {plan && (
            <button
              onClick={deletePlan}
              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          )}
        </div>
      </div>

      {plan && (
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              Total Tokens: {totalTokens}
            </h3>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${Math.min((totalTokens / 16) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plan.map(item => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 mt-1">
                  {item.count} × {item.tokens} Tokens
                </p>
                <p className="mt-2 text-blue-600 font-bold">
                  {item.count * item.tokens} Total
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-6 shadow-lg relative">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h3 className="text-2xl font-semibold">Plan Activities</h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {activityOptions.map(option => (
                <div
                  key={option.name}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <p className="font-medium">{option.name}</p>
                    <p className="text-sm text-gray-500">
                      {option.tokens} Tokens
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeCount(option.name, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>

                    <span className="w-6 text-center">
                      {selected[option.name] || 0}
                    </span>

                    <button
                      onClick={() => changeCount(option.name, 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="font-semibold">
                Total: {modalTotal} Tokens
              </div>

              <button
                onClick={savePlan}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Plan
              </button>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}