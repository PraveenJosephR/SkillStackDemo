import { useState } from "react";
import { Send } from "lucide-react";

export default function NotificationCenter() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    program: "",
    year: "",
  });

  const [toast, setToast] = useState(false);

  const programs = ["B.E", "B-Tech", "M.E", "M-Tech", "MBA", "BBA"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleSend = () => {
    if (!form.title || !form.description || !form.program || !form.year) return;

    console.log("Notification Sent:", form);

    // reset form
    setForm({
      title: "",
      description: "",
      link: "",
      program: "",
      year: "",
    });

    // show toast
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

return (
  <div className="max-w-4xl mx-auto relative">

    <h1 className="text-2xl font-semibold text-gray-800 dark:text-zinc-100 mb-8">
      Notification Center
    </h1>

    <div className="bg-white dark:bg-zinc-800 shadow-sm border dark:border-zinc-700 rounded-2xl p-8 space-y-6">

      {/* Title */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
          Notification Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 placeholder-gray-400 dark:placeholder-zinc-500"
          placeholder="Enter notification title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 placeholder-gray-400 dark:placeholder-zinc-500"
          rows={4}
          placeholder="Enter notification description"
        />
      </div>

      {/* Link */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
          Link (Optional)
        </label>
        <input
          type="text"
          value={form.link}
          onChange={(e) =>
            setForm({ ...form, link: e.target.value })
          }
          className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 placeholder-gray-400 dark:placeholder-zinc-500"
          placeholder="Paste related link"
        />
      </div>

      {/* Program + Year */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            Program
          </label>
          <select
            value={form.program}
            onChange={(e) =>
              setForm({ ...form, program: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500"
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            Year
          </label>
          <select
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500"
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition"
      >
        <Send className="w-4 h-4" />
        Send Notification
      </button>
    </div>

    {/* Toast */}
    {toast && (
      <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
        Notification Sent Successfully
      </div>
    )}
  </div>
);
}