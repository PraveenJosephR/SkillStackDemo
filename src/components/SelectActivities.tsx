import { useState, useEffect } from "react";
import {availableActivities} from "../mockData";

export interface Activity {
  id: string;
  name: string;
  tokens: number;
  description?: string;
}

export default function SelectActivities() {
  const activities: Activity[] = availableActivities;

  const [startOpen, setStartOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const [form, setForm] = useState({
    title: "",
    organization: "",
    description: "",
    fromDate: "",
    toDate: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleStart = () => {
    if (!form.title || !form.organization || !form.fromDate || !form.toDate) {
      setToast({ show: true, message: "Please fill all required fields" });
      return;
    }

    setStartOpen(false);

    setToast({
      show: true,
      message: "Activity Started Successfully",
    });

    setForm({
      title: "",
      organization: "",
      description: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="relative p-8">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-6">Select Activities</h1>

      {/* ACTIVITY GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{activity.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {activity.tokens} Tokens
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {activity.description}
            </p>

            <button
              onClick={() => {
                setSelectedActivity(activity);
                setStartOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap"
            >
              Start
            </button>
          </div>
        ))}
      </div>

      {/* START ACTIVITY MODAL */}
      {startOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setStartOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-[500px] z-50">
            <h3 className="text-xl font-semibold mb-6">
              Start {selectedActivity.name}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Organization"
                value={form.organization}
                onChange={(e) =>
                  setForm({ ...form, organization: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              <div className="flex gap-4">
                <input
                  type="date"
                  value={form.fromDate}
                  onChange={(e) =>
                    setForm({ ...form, fromDate: e.target.value })
                  }
                  className="w-1/2 border px-3 py-2 rounded-lg"
                />

                <input
                  type="date"
                  value={form.toDate}
                  onChange={(e) =>
                    setForm({ ...form, toDate: e.target.value })
                  }
                  className="w-1/2 border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setStartOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleStart}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM TOAST */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[100]">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slideIn">
            {toast.message}
          </div>
        </div>
      )}

      {/* Simple animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}