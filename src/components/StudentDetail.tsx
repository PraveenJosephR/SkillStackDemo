import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Copy, Github, Linkedin } from 'lucide-react';

interface Proposal {
    id: number;
    title: string;
    description: string;
    tokens: number;
    status: 'Pending' | 'Accepted' | 'Rejected';
    stage: 'start' | 'completed';
}

interface Props {
    student: any;
    goBack: () => void;
    updateTokens: (tokens: number) => void;
}
const malpracticeOptions = [
    { label: 'Bunking Class', value: 3 },
    { label: 'Possession of Contraband', value: 6 },
    { label: 'Cheating Internal Exam', value: 4 },
    { label: 'Cheating Semester Exam', value: 6 },
    { label: 'Distracted in Class', value: 1 },
    { label: 'Dress Code Violation', value: 1 },
    { label: 'Student Altercation', value: 4 },
];
const studentPlan = [
    {
        id: 1,
        month: 'January 2026',
        activity: 'Hackathon Participation',
        description: 'Participate in national level hackathon',
    },
    {
        id: 2,
        month: 'February 2026',
        activity: 'NPTEL Course',
        description: 'Complete Data Structures certification',
    },
    {
        id: 3,
        month: 'March 2026',
        activity: 'Internship',
        description: 'Start 2-month technical internship',
    },
    {
        id: 4,
        month: 'April 2026',
        activity: 'NCC Camp',
        description: 'Attend inter-college NCC training camp',
    },
];

export default function StudentDetail({ student, goBack, updateTokens }: Props) {
    const [tokens, setTokens] = useState(student.tokens);
    const [malpracticeOpen, setMalpracticeOpen] = useState(false);
    const [selectedMalpractice, setSelectedMalpractice] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [reminderOpen, setReminderOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [planOpen, setPlanOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'pending' | 'ongoing' | 'previous'>('pending');

    const [reminderForm, setReminderForm] = useState({
        subject: 'Token Deficiency',
        message:
            'The student has not met the required tokens for this month and is not on track to achieve the minimum required 16 tokens for this semester.',
        priority: 'Action Required',
    });

    const [proposals, setProposals] = useState<Proposal[]>([
        {
            id: 1,
            title: 'Hackathon',
            description: 'Participated in national hackathon',
            tokens: 4,
            status: 'Pending',
            stage: 'start',
        },
        {
            id: 2,
            title: 'Internship',
            description: 'Completed 2-month internship at tech company',
            tokens: 6,
            status: 'Pending',
            stage: 'completed',
        },
        {
            id: 3,
            title: 'NPTEL Certification',
            description: 'Completed NPTEL course on Cloud Computing',
            tokens: 3,
            status: 'Accepted',
            stage: 'completed',
        },
        {
            id: 4,
            title: 'College Symposium',
            description: 'Presented technical paper in symposium',
            tokens: 2,
            status: 'Accepted',
            stage: 'start',
        },
        {
            id: 5,
            title: 'Udemy Course',
            description: 'Completed React Development Bootcamp',
            tokens: 2,
            status: 'Rejected',
            stage: 'completed',
        },
        {
            id: 6,
            title: 'Sports Meet',
            description: 'Participated in inter-college sports meet',
            tokens: 3,
            status: 'Accepted',
            stage: 'completed',
        },
        {
            id: 7,
            title: 'NCC Camp',
            description: 'Attended NCC annual training camp',
            tokens: 3,
            status: 'Accepted',
            stage: 'start',
        },
        {
            id: 8,
            title: 'Workshop on AI',
            description: 'Attended hands-on workshop on Artificial Intelligence',
            tokens: 2,
            status: 'Pending',
            stage: 'start',
        },
    ]);

    const handleAccept = (id: number) => {
        setProposals((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: 'Accepted' } : p
            )
        );


        const proposal = proposals.find((p) => p.id === id);
        if (proposal) {
            const newTokens = tokens + proposal.tokens;
            setTokens(newTokens);
            updateTokens(newTokens);
        }
    };

    const handleReject = (id: number) => {
        setProposals((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: 'Rejected' } : p
            )
        );
    };

    const confirmMalpractice = () => {
        const newTokens = Math.max(0, tokens - 2);
        setTokens(newTokens);
        updateTokens(newTokens);
        setMalpracticeOpen(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={goBack}>
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-semibold">{student.name}</h1>
            </div>

            {/* Split Layout */}
            <div className="flex gap-8">

                {/* LEFT SIDE */}
                <div className="w-1/3">
                    <div className="bg-white border rounded-xl p-6 shadow-sm">

                        {/* Image */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={student.gender === 'Male' ? "/assets/img/student.jpg" : "/assets/img/fstudent.png"}
                                alt="Student"
                                className="w-52 h-52 rounded-md object-cover"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="mt-6 border-t pt-6">

                            <div className="flex">

                                {/* Left Column */}
                                <div className="w-1/2 pr-4 space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Register No:</span> {student.registerNo}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Roll No:</span> {student.rollNo}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Department:</span> {student.department}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Program:</span> {student.program}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Semester:</span> {student.semester}
                                    </p>
                                </div>

                                {/* Vertical Divider */}
                                <div className="w-px bg-gray-200 mx-2"></div>

                                {/* Right Column */}
                                <div className="w-1/2 pl-4 space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Batch:</span> {student.batch}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Gender:</span> {student.gender}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Blood Group:</span> {student.bloodGroup}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="font-medium">Email:</span>

                                        <span title={student.email}>
                                            {student.email.length > 6
                                                ? student.email.slice(0, 6) + '...'
                                                : student.email}
                                        </span>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(student.email);
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 1000);
                                            }}
                                            className={`transition-all duration-300 ${copied
                                                ? 'text-green-600 animate-[pulse_0.4s_ease-in-out_2]'
                                                : 'text-blue-600'
                                                }`}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Contact:</span> {student.contactNo}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 justify-between items-center flex">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {tokens} Tokens
                                </span>
                                <div>
                                    <div className="relative group inline-block ml-4">
                                        <Github className="w-5 h-5 text-gray-800 cursor-pointer" />
                                        <span className="absolute bottom-full mb-2 hidden group-hover:block 
                   bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                            GitHub
                                        </span>
                                    </div>

                                    <div className="relative group inline-block ml-2">
                                        <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer" />
                                        <span className="absolute bottom-full mb-2 hidden group-hover:block 
                   bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                            LinkedIn
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 relative">

                    {/* Tabs */}
                    <div className="flex gap-6 border-b mb-6">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`pb-2 text-sm font-medium ${activeTab === 'pending'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500'
                                }`}
                        >
                            Pending Requests
                        </button>

                        <button
                            onClick={() => setActiveTab('ongoing')}
                            className={`pb-2 text-sm font-medium ${activeTab === 'ongoing'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500'
                                }`}
                        >
                            On Going Activities
                        </button>

                        <button
                            onClick={() => setActiveTab('previous')}
                            className={`pb-2 text-sm font-medium ${activeTab === 'previous'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500'
                                }`}
                        >
                            Previous Activities
                        </button>
                    </div>

                    <div className="space-y-4 pb-20">
                        {proposals
                            .filter((proposal) => {
                                if (activeTab === 'pending') return proposal.status === 'Pending';
                                if (activeTab === 'ongoing')
                                    return proposal.status === 'Accepted' && proposal.stage === 'start';
                                if (activeTab === 'previous')
                                    return proposal.status === 'Accepted' && proposal.stage === 'completed';
                                return false;
                            })
                            .map((proposal) => (
                                <div
                                    key={proposal.id}
                                    className="bg-white border rounded-xl p-6 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            {proposal.title}
                                            {activeTab === 'pending' && (
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-medium ${proposal.stage === 'start'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : proposal.stage === 'completed'
                                                            ? 'bg-cyan-100 text-cyan-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {proposal.stage}
                                                </span>
                                            )}

                                        </h3>

                                        <span className="text-sm text-gray-500">
                                            {proposal.tokens} Tokens
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">
                                        {proposal.description}
                                    </p>

                                    {activeTab === 'pending' ? (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleAccept(proposal.id)}
                                                className="px-4 py-1 bg-green-600 text-white rounded-lg whitespace-nowrap"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(proposal.id)}
                                                className="px-4 py-1 bg-red-600 text-white rounded-lg whitespace-nowrap"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span
                                            className={`text-sm font-medium ${proposal.status === 'Accepted'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}
                                        >
                                            {proposal.status}
                                        </span>
                                    )}
                                </div>
                            ))}

                        {/* Empty state */}
                        {proposals.filter((proposal) => {
                            if (activeTab === 'pending') return proposal.status === 'Pending';
                            if (activeTab === 'ongoing')
                                return proposal.status === 'Accepted' && proposal.stage === 'start';
                            if (activeTab === 'previous')
                                return proposal.status === 'Accepted' && proposal.stage === 'completed';
                            return false;
                        }).length === 0 && (
                                <div className="text-gray-400 text-sm">
                                    No activities in this section.
                                </div>
                            )}
                    </div>

                    {/* Bottom Right Malpractice Button */}
                    <div className="absolute bottom-0 right-0">
                        <div className="absolute bottom-0 right-0 flex gap-2">
                            <button
                                onClick={() => setPlanOpen(true)}
                                className="border-2 bg-blue-600 rounded-md px-3 py-2 text-white hover:bg-blue-700 whitespace-nowrap"
                            >
                                View Student Plan
                            </button>
                            <button
                                onClick={() => setReminderOpen(true)}
                                className="p-2 whitespace-nowrap bg-blue-600 rounded-md text-white hover:bg-blue-700"
                            >
                                Send Reminder
                            </button>

                            <button
                                onClick={() => setMalpracticeOpen(true)}
                                className="flex items-center gap-2 whitespace-nowrap border-2 border-red-600 rounded-md p-1 text-red-600 hover:bg-red-100"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Give Malpractice
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {/* Malpractice Modal */}
            {malpracticeOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMalpracticeOpen(false)}
                    />

                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-[420px] z-50">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">
                            Assign Malpractice
                        </h3>

                        <div className="space-y-4">

                            <select
                                value={selectedMalpractice}
                                onChange={(e) => setSelectedMalpractice(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg"
                            >
                                <option value="">Select Malpractice Type</option>
                                {malpracticeOptions.map((m) => (
                                    <option key={m.label} value={m.label}>
                                        {m.label} (-{m.value} Tokens)
                                    </option>
                                ))}
                            </select>

                            {selectedMalpractice && (
                                <div className="text-sm text-gray-600">
                                    This will deduct{' '}
                                    <span className="font-semibold text-red-600">
                                        -
                                        {
                                            malpracticeOptions.find(
                                                (m) => m.label === selectedMalpractice
                                            )?.value
                                        }{' '}
                                        tokens
                                    </span>
                                    .
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setMalpracticeOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmMalpractice}
                                    disabled={!selectedMalpractice}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {reminderOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setReminderOpen(false)}
                    />

                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-[500px] z-50">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">
                            Send Reminder
                        </h3>

                        <div className="space-y-4">

                            <input
                                type="text"
                                value={reminderForm.subject}
                                onChange={(e) =>
                                    setReminderForm({ ...reminderForm, subject: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            <textarea
                                rows={4}
                                value={reminderForm.message}
                                onChange={(e) =>
                                    setReminderForm({ ...reminderForm, message: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            <select
                                value={reminderForm.priority}
                                onChange={(e) =>
                                    setReminderForm({ ...reminderForm, priority: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                            >
                                <option value="Action Required">🔵 Action Required</option>
                                <option value="Immediate Action Needed">🟡 Immediate Action Needed</option>
                                <option value="Extreme Urgent Action Needed">🔴 Extreme Urgent Action Needed</option>
                            </select>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setReminderOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        setReminderOpen(false);
                                        setShowToast(true);
                                        setTimeout(() => setShowToast(false), 2000);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {planOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setPlanOpen(false)}
                    />

                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-[600px] max-h-[80vh] overflow-y-auto z-50">
                        <h3 className="text-xl font-semibold mb-8 text-gray-800">
                            Student Activity Plan
                        </h3>

                        <div className="relative border-l-2 border-gray-200 ml-4 space-y-10">
                            {studentPlan.map((item, index) => (
                                <div key={item.id} className="relative pl-6">

                                    {/* Dot */}
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-purple-600 rounded-full border-4 border-white"></div>

                                    <p className="text-xs text-gray-500 mb-1">
                                        {item.month}
                                    </p>

                                    <h4 className="font-semibold text-gray-800">
                                        {item.activity}
                                    </h4>

                                    <p className="text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-10">
                            <button
                                onClick={() => setPlanOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    Reminder sent successfully
                </div>
            )}
        </div>

    );
}