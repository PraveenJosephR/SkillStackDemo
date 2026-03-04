import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface User {
    id: number;
    name: string;
    role: 'Student' | 'Staff';
    gender: 'Male' | 'Female' | 'Other';
    program: 'BE' | 'BTech' | 'ME' | 'PhD';
    department: 'CSE' | 'ECE' | 'EEE';
    batch: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
}

const defaultUsers: User[] = [
    {
        id: 1,
        name: 'Arjun Kumar',
        role: 'Student',
        gender: 'Male',
        program: 'BTech',
        department: 'CSE',
        batch: '2022-2026',
        birthDate: '2004-08-15',
        createdAt: '05/01/2026, 09:15:00',
        updatedAt: '05/01/2026, 09:15:00',
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'Student',
        gender: 'Female',
        program: 'BE',
        department: 'ECE',
        batch: '2021-2025',
        birthDate: '2003-11-10',
        createdAt: '08/01/2026, 10:30:00',
        updatedAt: '08/01/2026, 10:30:00',
    },
    {
        id: 3,
        name: 'Karthik Raj',
        role: 'Student',
        gender: 'Male',
        program: 'ME',
        department: 'EEE',
        batch: '2020-2024',
        birthDate: '2002-05-22',
        createdAt: '12/01/2026, 11:45:00',
        updatedAt: '12/01/2026, 11:45:00',
    },
    {
        id: 4,
        name: 'Ananya Iyer',
        role: 'Student',
        gender: 'Female',
        program: 'BTech',
        department: 'CSE',
        batch: '2023-2027',
        birthDate: '2005-02-18',
        createdAt: '15/01/2026, 09:20:00',
        updatedAt: '15/01/2026, 09:20:00',
    },
    {
        id: 5,
        name: 'Rahul Verma',
        role: 'Student',
        gender: 'Male',
        program: 'BE',
        department: 'ECE',
        batch: '2022-2026',
        birthDate: '2004-07-09',
        createdAt: '18/01/2026, 14:10:00',
        updatedAt: '18/01/2026, 14:10:00',
    },
    {
        id: 6,
        name: 'Dr. Meena Lakshmi',
        role: 'Staff',
        gender: 'Female',
        program: 'PhD',
        department: 'EEE',
        batch: '2002-Now',
        birthDate: '1978-06-25',
        createdAt: '20/01/2026, 10:00:00',
        updatedAt: '20/01/2026, 10:00:00',
    },
    {
        id: 7,
        name: 'Dr. Ravi Narayanan',
        role: 'Staff',
        gender: 'Male',
        program: 'PhD',
        department: 'CSE',
        batch: '1998-Now',
        birthDate: '1975-03-02',
        createdAt: '22/01/2026, 11:30:00',
        updatedAt: '22/01/2026, 11:30:00',
    },
    {
        id: 8,
        name: 'Dr. Suresh Kumar',
        role: 'Staff',
        gender: 'Male',
        program: 'PhD',
        department: 'ECE',
        batch: '1995-Now',
        birthDate: '1972-12-14',
        createdAt: '24/01/2026, 13:50:00',
        updatedAt: '24/01/2026, 13:50:00',
    },
    {
        id: 9,
        name: 'Nisha Patel',
        role: 'Student',
        gender: 'Female',
        program: 'ME',
        department: 'EEE',
        batch: '2021-2025',
        birthDate: '2003-09-30',
        createdAt: '26/01/2026, 09:40:00',
        updatedAt: '26/01/2026, 09:40:00',
    },
    {
        id: 10,
        name: 'Vikram Singh',
        role: 'Student',
        gender: 'Male',
        program: 'BTech',
        department: 'CSE',
        batch: '2020-2024',
        birthDate: '2002-01-12',
        createdAt: '28/01/2026, 15:25:00',
        updatedAt: '28/01/2026, 15:25:00',
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(defaultUsers);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'Student' | 'Staff'>('Student');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const [form, setForm] = useState<
        Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
            contactNumber: string;
            email: string;
            registerNumber: string;
            rollNumber: string;
            hostelType: string;
            boardingPoint: string;
            staffIncharge: string;
        }
    >({
        name: '',
        role: 'Student',
        gender: 'Male',
        program: 'BE',
        department: 'CSE',
        batch: '',
        birthDate: '',

        contactNumber: '',
        email: '',
        registerNumber: '',
        rollNumber: '',
        hostelType: '',
        boardingPoint: '',
        staffIncharge: '',
    });
    const formatDateTime = () => {
        return new Date().toLocaleString('en-GB');
    };

    const openCreate = () => {
        setEditingId(null);
        setActiveTab('Student');

        setForm({
            name: '',
            role: 'Student',
            gender: 'Male',
            program: 'BE',
            department: 'CSE',
            batch: '',
            birthDate: '',

            contactNumber: '',
            email: '',
            registerNumber: '',
            rollNumber: '',
            hostelType: '',
            boardingPoint: '',
            staffIncharge: '',
        });

        setDrawerOpen(true);
    };

    const openEdit = (user: User) => {
        setEditingId(user.id);
        setActiveTab(user.role);

        setForm({
            name: user.name,
            role: user.role,
            gender: user.gender,
            program: user.program,
            department: user.department,
            batch: user.batch,
            birthDate: user.birthDate,

            contactNumber: '',
            email: '',
            registerNumber: '',
            rollNumber: '',
            hostelType: '',
            boardingPoint: '',
            staffIncharge: '',
        });

        setDrawerOpen(true);
    };
    const handleSave = () => {
        if (!form.name || !form.batch || !form.birthDate) return;

        if (editingId) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === editingId
                        ? { ...u, ...form, updatedAt: formatDateTime() }
                        : u
                )
            );
        } else {
            const newUser: User = {
                id: Date.now(),
                ...form,
                createdAt: formatDateTime(),
                updatedAt: formatDateTime(),
            };
            setUsers((prev) => [...prev, newUser]);
        }

        setDrawerOpen(false);
    };

    const handleDelete = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirm(null);
    };

    const handleRoleChange = (role: 'Student' | 'Staff') => {
        if (role === 'Staff') {
            setForm({
                ...form,
                role,
                program: 'PhD',
                batch: '1995-Now',
            });
        } else {
            setForm({
                ...form,
                role,
                program: 'BE',
                batch: '',
            });
        }
    };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border dark:border-zinc-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
                User Management
            </h2>
            <button
                onClick={openCreate}
                className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition"
            >
                <Plus className="w-4 h-4" />
                Add User
            </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Gender</th>
                        <th className="px-6 py-4">Program</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Batch</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700">
                            <td className="px-6 py-4 text-gray-800 dark:text-zinc-100">{user.name}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">{user.role}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">{user.gender}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">{user.program}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">{user.department}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">{user.batch}</td>
                            <td className="px-6 py-4 flex gap-3 relative">
                                <button onClick={() => openEdit(user)}>
                                    <Pencil className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                </button>
                                <button onClick={() => setDeleteConfirm(user.id)}>
                                    <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                </button>

                                {deleteConfirm === user.id && (
                                    <div className="absolute top-8 right-0 bg-white dark:bg-zinc-800 shadow-lg border dark:border-zinc-700 rounded-lg p-4 text-sm z-50">
                                        <p className="mb-3 text-gray-700 dark:text-zinc-300">Are you sure?</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(user.id)}
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

        {/* Right Drawer */}
        <div
            className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 bg-white dark:bg-zinc-800 shadow-2xl z-40 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex justify-between items-center p-6 border-b dark:border-zinc-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
                    {editingId ? 'Edit User' : 'Add User'}
                </h2>
                <button onClick={() => setDrawerOpen(false)}>
                    <X className="w-5 h-5 text-gray-700 dark:text-zinc-300" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b dark:border-zinc-700">
                <button
                    onClick={() => {
                        setActiveTab('Student');
                        setForm({ ...form, role: 'Student' });
                    }}
                    className={`flex-1 py-2 text-sm font-medium ${activeTab === 'Student'
                        ? 'border-b-2 border-rose-600 text-rose-600'
                        : 'text-gray-500 dark:text-zinc-400'
                        }`}
                >
                    Student
                </button>

                <button
                    onClick={() => {
                        setActiveTab('Staff');
                        setForm({ ...form, role: 'Staff' });
                    }}
                    className={`flex-1 py-2 text-sm font-medium ${activeTab === 'Staff'
                        ? 'border-b-2 border-rose-600 text-rose-600'
                        : 'text-gray-500 dark:text-zinc-400'
                        }`}
                >
                    Staff
                </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <select
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.gender}
                    onChange={(e) =>
                        setForm({ ...form, gender: e.target.value as any })
                    }
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <select
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.department}
                    onChange={(e) =>
                        setForm({ ...form, department: e.target.value as any })
                    }
                >
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EEE</option>
                </select>

                <input
                    type="text"
                    placeholder="Batch"
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Birthday"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text';
                    }}
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.birthDate}
                    onChange={(e) =>
                        setForm({ ...form, birthDate: e.target.value })
                    }
                />

                <hr className="dark:border-zinc-700" />

                <input
                    type="text"
                    placeholder="Contact Number"
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.contactNumber}
                    onChange={(e) =>
                        setForm({ ...form, contactNumber: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                {activeTab === 'Student' && (
                    <>
                        <input
                            type="text"
                            placeholder="Register Number"
                            className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                            value={form.registerNumber}
                            onChange={(e) =>
                                setForm({ ...form, registerNumber: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Roll Number"
                            className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                            value={form.rollNumber}
                            onChange={(e) =>
                                setForm({ ...form, rollNumber: e.target.value })
                            }
                        />

                        <select
                            className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                            value={form.program}
                            onChange={(e) =>
                                setForm({ ...form, program: e.target.value as any })
                            }
                        >
                            <option value="BE">BE</option>
                            <option value="BTech">BTech</option>
                            <option value="ME">ME</option>
                            <option value="PhD">PhD</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Hostel / Dayscholar"
                            className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                            value={form.hostelType}
                            onChange={(e) =>
                                setForm({ ...form, hostelType: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Staff Incharge"
                            className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                            value={form.staffIncharge}
                            onChange={(e) =>
                                setForm({ ...form, staffIncharge: e.target.value })
                            }
                        />
                    </>
                )}

                <input
                    type="text"
                    placeholder="Boarding Point"
                    className="w-full border dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 rounded-lg px-4 py-2"
                    value={form.boardingPoint}
                    onChange={(e) =>
                        setForm({ ...form, boardingPoint: e.target.value })
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