import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Copy } from 'lucide-react';

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

export default function StudentDetail({ student, goBack, updateTokens }: Props) {
    const [tokens, setTokens] = useState(student.tokens);
    const [malpracticeOpen, setMalpracticeOpen] = useState(false);
    const [selectedMalpractice, setSelectedMalpractice] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const [proposals, setProposals] = useState<Proposal[]>([
        { id: 1, title: 'Hackathon', description: 'Participated in national hackathon', tokens: 4, status: 'Pending', stage: 'start' },
        { id: 2, title: 'Internship', description: 'Completed 2-month internship', tokens: 6, status: 'Pending', stage: 'completed' },
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

                            <div className="mt-6">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {tokens} Tokens
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 relative">

                    <h2 className="text-lg font-semibold mb-4">
                        Pending Requests
                    </h2>

                    <div className="space-y-4 pb-20">
                        {proposals.map((proposal) => (
                            <div
                                key={proposal.id}
                                className="bg-white border rounded-xl p-6 shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        {proposal.title}

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
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {proposal.tokens} Tokens
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">
                                    {proposal.description}
                                </p>

                                {proposal.status === 'Pending' ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleAccept(proposal.id)}
                                            className="px-4 py-1 bg-green-600 text-white rounded-lg"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(proposal.id)}
                                            className="px-4 py-1 bg-red-600 text-white rounded-lg"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleAccept(proposal.id)}
                                                className="px-4 py-1 bg-green-600 text-white rounded-lg"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(proposal.id)}
                                                className="px-4 py-1 bg-red-600 text-white rounded-lg"
                                            >
                                                Reject
                                            </button>
                                        </div>

                                        <span
                                            className={`text-sm font-medium ${proposal.status === 'Accepted'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}
                                        >
                                            {proposal.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Right Malpractice Button */}
                    <div className="absolute bottom-0 right-0">
                        <button
                            onClick={() => setMalpracticeOpen(true)}
                            className="mt-4 flex items-center gap-2 border-2 border-red-600 rounded-md p-1 text-red-600 hover:bg-red-100"
                        >
                            <AlertTriangle className="w-4 h-4 " />
                            Give Malpractice
                        </button>
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
        </div>
    );
}