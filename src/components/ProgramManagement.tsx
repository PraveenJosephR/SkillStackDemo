import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Course {
  id: number;
  program: string;
  branch: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

const defaultCourses: Course[] = [
  { id: 1, program: 'BE', branch: 'CSE', duration: 4, createdAt: '05/01/2026, 09:00:00', updatedAt: '05/01/2026, 09:00:00' },
  { id: 2, program: 'BE', branch: 'Mechanical', duration: 4, createdAt: '05/01/2026, 09:10:00', updatedAt: '05/01/2026, 09:10:00' },
  { id: 3, program: 'BE', branch: 'EEE', duration: 4, createdAt: '05/01/2026, 09:20:00', updatedAt: '05/01/2026, 09:20:00' },
  { id: 4, program: 'ME', branch: 'CSE', duration: 2, createdAt: '06/01/2026, 10:00:00', updatedAt: '06/01/2026, 10:00:00' },
  { id: 5, program: 'ME', branch: 'Bio Tech', duration: 2, createdAt: '06/01/2026, 10:10:00', updatedAt: '06/01/2026, 10:10:00' },
  { id: 6, program: 'ME', branch: 'Data Science', duration: 2, createdAt: '06/01/2026, 10:20:00', updatedAt: '06/01/2026, 10:20:00' },
  { id: 7, program: 'ME', branch: 'AI', duration: 2, createdAt: '06/01/2026, 10:30:00', updatedAt: '06/01/2026, 10:30:00' },
];

export default function ProgramManagement() {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [form, setForm] = useState({
    program: '',
    branch: '',
    duration: '',
  });

  const formatDateTime = () => new Date().toLocaleString('en-GB');

  const openCreate = () => {
    setEditingId(null);
    setForm({ program: '', branch: '', duration: '' });
    setDrawerOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      program: course.program,
      branch: course.branch,
      duration: course.duration.toString(),
    });
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.program || !form.branch || !form.duration) return;

    if (editingId) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                program: form.program,
                branch: form.branch,
                duration: Number(form.duration),
                updatedAt: formatDateTime(),
              }
            : c
        )
      );
    } else {
      const newCourse: Course = {
        id: Date.now(),
        program: form.program,
        branch: form.branch,
        duration: Number(form.duration),
        createdAt: formatDateTime(),
        updatedAt: formatDateTime(),
      };
      setCourses((prev) => [...prev, newCourse]);
    }

    setDrawerOpen(false);
  };

  const handleDelete = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

return (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border dark:border-zinc-700">
    {/* Header */}
    <div className="flex justify-between items-center p-6 border-b dark:border-zinc-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Program & Branch Management
      </h2>
      <button
        onClick={openCreate}
        className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition"
      >
        <Plus className="w-4 h-4" />
        Add Program
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Program</th>
            <th className="px-6 py-4">Branch</th>
            <th className="px-6 py-4">Duration (Years)</th>
            <th className="px-6 py-4">Created On</th>
            <th className="px-6 py-4">Upadated On</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              className="border-t dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              <td className="px-6 py-4 text-gray-800 dark:text-zinc-200">
                {course.program}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-zinc-200">
                {course.branch}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-zinc-200">
                {course.duration}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-zinc-200">
                {course.createdAt}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-zinc-200">
                {course.updatedAt}
              </td>
              <td className="px-6 py-4 flex gap-3 relative">
                <button onClick={() => openEdit(course)}>
                  <Pencil className="w-4 h-4 text-rose-600" />
                </button>
                <button onClick={() => setDeleteConfirm(course.id)}>
                  <Trash2 className="w-4 h-4 text-rose-600" />
                </button>

                {deleteConfirm === course.id && (
                  <div className="absolute top-8 right-0 bg-white dark:bg-zinc-800 shadow-lg border dark:border-zinc-700 rounded-lg p-4 text-sm z-50 text-gray-800 dark:text-zinc-200">
                    <p className="mb-3">Are you sure?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="px-3 py-1 bg-rose-600 text-white rounded"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 dark:text-zinc-200 rounded"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Drawer */}
    <div
      className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 bg-white dark:bg-zinc-900 shadow-2xl z-40 transform transition-transform duration-300 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-6 border-b dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {editingId ? 'Edit Program' : 'Add Program'}
        </h2>
        <button onClick={() => setDrawerOpen(false)}>
          <X className="w-5 h-5 text-gray-700 dark:text-zinc-300" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <input
          type="text"
          placeholder="Program (BE / ME)"
          className="w-full border dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200"
          value={form.program}
          onChange={(e) =>
            setForm({ ...form, program: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Branch"
          className="w-full border dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200"
          value={form.branch}
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Duration (Years)"
          className="w-full border dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        <button
          onClick={handleSave}
          className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
}