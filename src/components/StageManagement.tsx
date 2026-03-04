import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Stage = {
  id: number;
  name: string;
  updatedAt: string;
};

export default function StageManagement() {
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, name: "permission_upload", updatedAt: new Date().toLocaleDateString() },
    { id: 2, name: "ai_permission_verification", updatedAt: new Date().toLocaleDateString() },
    { id: 3, name: "manual_permission_verification", updatedAt: new Date().toLocaleDateString() },
    { id: 4, name: "event_progress", updatedAt: new Date().toLocaleDateString() },
    { id: 5, name: "ai_proof_verification", updatedAt: new Date().toLocaleDateString() },
    { id: 6, name: "manual_proof_verification", updatedAt: new Date().toLocaleDateString() },
    { id: 7, name: "activity_completed", updatedAt: new Date().toLocaleDateString() },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [stageName, setStageName] = useState("");

  const openAddModal = () => {
    setEditingStage(null);
    setStageName("");
    setModalOpen(true);
  };

  const openEditModal = (stage: Stage) => {
    setEditingStage(stage);
    setStageName(stage.name);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!stageName.trim()) return;

    if (editingStage) {
      setStages((prev) =>
        prev.map((s) =>
          s.id === editingStage.id
            ? { ...s, name: stageName, updatedAt: new Date().toLocaleDateString() }
            : s
        )
      );
    } else {
      const newStage: Stage = {
        id: Date.now(),
        name: stageName,
        updatedAt: new Date().toLocaleDateString(),
      };
      setStages((prev) => [...prev, newStage]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setStages((prev) => prev.filter((s) => s.id !== id));
  };

return (
  <div className="p-8">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Stage Management</h1>
      <button
        onClick={openAddModal}
        className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg"
      >
        <Plus size={16} />
        Add Stage
      </button>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow hover:shadow-lg transition relative border border-zinc-200 dark:border-zinc-700"
        >
          <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{stage.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Updated: {stage.updatedAt}
          </p>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => openEditModal(stage)}
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(stage.id)}
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Modal */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-zinc-800 w-[90%] max-w-md p-6 rounded-xl relative border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">

          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-zinc-600 dark:text-zinc-300 hover:text-rose-500"
          >
            <X />
          </button>

          <h2 className="text-xl font-bold mb-4">{editingStage ? "Edit Stage" : "Add Stage"}</h2>

          <input
            type="text"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
            placeholder="Stage name"
          />

          <button
            onClick={handleSave}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>

        </div>
      </div>
    )}
  </div>
);
}