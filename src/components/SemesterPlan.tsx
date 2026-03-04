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

    {/* HEADER */}
    <div className="flex justify-between items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6 transition">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
        Semester Plan
      </h2>

      <div className="flex gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg transition"
        >
          {plan ? 'Edit Plan' : 'Create Plan'}
        </button>

        {plan && (
          <button
            onClick={deletePlan}
            className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-900/50 transition"
          >
            <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </button>
        )}
      </div>
    </div>

    {/* PLAN CONTENT */}
    {plan && (
      <div className="space-y-6">

        {/* TOKEN SUMMARY */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm transition">
          <h3 className="text-xl font-semibold mb-3 text-zinc-800 dark:text-zinc-100">
            Total Tokens: {totalTokens}
          </h3>

          <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalTokens / 16) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* ACTIVITY CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          {plan.map(item => (
            <div
              key={item.name}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                {item.name}
              </h3>

              <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                {item.count} × {item.tokens} Tokens
              </p>

              <p className="mt-2 text-rose-600 dark:text-rose-400 font-bold">
                {item.count * item.tokens} Total
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ================= MODAL ================= */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 w-full max-w-2xl rounded-2xl p-6 space-y-6 shadow-xl relative transition">

          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Plan Activities
          </h3>

          {/* ACTIVITY SELECT LIST */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {activityOptions.map(option => (
              <div
                key={option.name}
                className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 py-3"
              >
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-100">
                    {option.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {option.tokens} Tokens
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => changeCount(option.name, -1)}
                    className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 flex items-center justify-center transition text-zinc-800 dark:text-zinc-100"
                  >
                    -
                  </button>

                  <span className="w-6 text-center text-zinc-800 dark:text-zinc-100">
                    {selected[option.name] || 0}
                  </span>

                  <button
                    onClick={() => changeCount(option.name, 1)}
                    className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 flex items-center justify-center transition text-zinc-800 dark:text-zinc-100"
                  >
                    +
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center">
            <div className="font-semibold text-zinc-800 dark:text-zinc-100">
              Total: {modalTotal} Tokens
            </div>

            <button
              onClick={savePlan}
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition"
            >
              Save Plan
            </button>
          </div>

          {error && (
            <div className="text-rose-600 dark:text-rose-400 text-sm">
              {error}
            </div>
          )}

        </div>
      </div>
    )}
  </div>
);
}