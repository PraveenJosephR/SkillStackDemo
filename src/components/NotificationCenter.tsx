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
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Notification Center
      </h1>

      <div className="bg-white shadow-sm border rounded-2xl p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Notification Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notification title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter notification description"
          />
        </div>

        {/* Link */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Link (Optional)
          </label>
          <input
            type="text"
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Paste related link"
          />
        </div>

        {/* Program + Year */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Program
            </label>
            <select
              value={form.program}
              onChange={(e) =>
                setForm({ ...form, program: e.target.value })
              }
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            <label className="text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
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