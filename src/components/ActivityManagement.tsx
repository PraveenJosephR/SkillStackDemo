import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Activity {
    id: number;
    name: string;
    description: string;
    tokens: number;
    type: 'Internal' | 'External';
    createdAt: string;
    updatedAt: string;
}

export default function ActivityManagement() {
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const defaultActivities: Activity[] = [
  {
    id: 1,
    name: 'Startup',
    description: 'Launch your own startup project',
    tokens: 12,
    type: 'External',
    createdAt: '05/01/2026, 09:15:00',
    updatedAt: '10/01/2026, 14:30:00',
  },
  {
    id: 2,
    name: 'Internship',
    description: 'Complete an internship program',
    tokens: 6,
    type: 'External',
    createdAt: '12/01/2026, 11:00:00',
    updatedAt: '18/01/2026, 16:45:00',
  },
  {
    id: 3,
    name: 'Club Activity',
    description: 'Participate in college club activities',
    tokens: 3,
    type: 'Internal',
    createdAt: '20/01/2026, 08:30:00',
    updatedAt: '22/01/2026, 13:20:00',
  },
  {
    id: 4,
    name: 'Sports',
    description: 'Participate in sports events',
    tokens: 3,
    type: 'Internal',
    createdAt: '25/01/2026, 15:10:00',
    updatedAt: '28/01/2026, 17:05:00',
  },
  {
    id: 5,
    name: 'NCC or NSS',
    description: 'Join NCC or NSS programs',
    tokens: 3,
    type: 'Internal',
    createdAt: '01/02/2026, 10:00:00',
    updatedAt: '03/02/2026, 12:40:00',
  },
  {
    id: 6,
    name: 'Global Certificate',
    description: 'Earn recognized certifications',
    tokens: 4,
    type: 'External',
    createdAt: '05/02/2026, 09:50:00',
    updatedAt: '08/02/2026, 14:25:00',
  },
  {
    id: 7,
    name: 'Other College Event',
    description: 'Join various college events',
    tokens: 3,
    type: 'Internal',
    createdAt: '10/02/2026, 11:35:00',
    updatedAt: '14/02/2026, 16:10:00',
  },
  {
    id: 8,
    name: 'Organizing Event',
    description: 'Organize college events',
    tokens: 3,
    type: 'Internal',
    createdAt: '15/02/2026, 13:15:00',
    updatedAt: '18/02/2026, 15:45:00',
  },
  {
    id: 9,
    name: 'Volunteering',
    description: 'Volunteer for social causes',
    tokens: 2,
    type: 'External',
    createdAt: '20/02/2026, 08:20:00',
    updatedAt: '22/02/2026, 10:30:00',
  },
];
const [activities, setActivities] = useState<Activity[]>(defaultActivities);
    const [form, setForm] = useState({
        name: '',
        description: '',
        tokens: '',
        type: 'Internal' as 'Internal' | 'External',
    });

    const openCreate = () => {
        setForm({ name: '', description: '', tokens: '', type: 'Internal' });
        setEditingId(null);
        setDrawerOpen(true);
    };

    const openEdit = (activity: Activity) => {
        setForm({
            name: activity.name,
            description: activity.description,
            tokens: activity.tokens.toString(),
            type: activity.type,
        });
        setEditingId(activity.id);
        setDrawerOpen(true);
    };

    const handleSubmit = () => {
        if (!form.name || !form.tokens) return;

        if (editingId) {
            setActivities((prev) =>
                prev.map((a) =>
                    a.id === editingId
                        ? {
                            ...a,
                            ...form,
                            tokens: Number(form.tokens),
                            updatedAt: new Date().toLocaleString(),
                        }
                        : a
                )
            );
        } else {
            const newActivity: Activity = {
                id: Date.now(),
                name: form.name,
                description: form.description,
                tokens: Number(form.tokens),
                type: form.type,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
            };
            setActivities((prev) => [...prev, newActivity]);
        }

        setDrawerOpen(false);
    };

    const confirmDelete = () => {
        if (deleteId !== null) {
            setActivities((prev) => prev.filter((a) => a.id !== deleteId));
            setDeleteId(null);
        }
    };

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Activity Management
                </h1>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Activity
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Activity</th>
                            <th className="px-6 py-3 text-left">Tokens</th>
                            <th className="px-6 py-3 text-left">Type</th>
                            <th className="px-6 py-3 text-left">Created</th>
                            <th className="px-6 py-3 text-left">Updated</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((a) => (
                            <tr key={a.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-800">{a.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {a.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{a.tokens}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${a.type === 'Internal'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-purple-100 text-purple-700'
                                            }`}
                                    >
                                        {a.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    {a.createdAt}
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    {a.updatedAt}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => openEdit(a)}
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                        <Pencil className="w-4 h-4 inline" />
                                    </button>

                                    <button
                                        onClick={() => setDeleteId(a.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-4 h-4 inline" />
                                    </button>

                                    {/* Delete Tooltip */}
                                    {deleteId !== null && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center">

                                            {/* Overlay */}
                                            <div
                                                className="absolute inset-0 bg-black/40"
                                                onClick={() => setDeleteId(null)}
                                            />

                                            {/* Modal */}
                                            <div className="relative bg-white rounded-xl shadow-2xl w-96 p-8 z-50 text-center">

                                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                                    Delete Activity
                                                </h3>

                                                <p className="text-sm text-gray-600 mb-6">
                                                    Are you sure you want to delete this activity?
                                                    <br />
                                                    This action cannot be undone.
                                                </p>

                                                <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={() => setDeleteId(null)}
                                                        className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        onClick={confirmDelete}
                                                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {activities.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-10 text-gray-400"
                                >
                                    No activities created yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Right Sliding Drawer */}
            <div
                className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-semibold">
                        {editingId ? 'Edit Activity' : 'Add Activity'}
                    </h2>
                    <button onClick={() => setDrawerOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Activity Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        placeholder="Tokens"
                        value={form.tokens}
                        onChange={(e) =>
                            setForm({ ...form, tokens: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={form.type}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                type: e.target.value as 'Internal' | 'External',
                            })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Internal">Internal College</option>
                        <option value="External">External Event</option>
                    </select>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        {editingId ? 'Update Activity' : 'Create Activity'}
                    </button>
                </div>
            </div>
        </div>
    );
}