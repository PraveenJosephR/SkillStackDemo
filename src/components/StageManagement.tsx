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
        <h1 className="text-2xl font-bold">Stage Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
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
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
          >
            <h2 className="text-lg font-semibold mb-2">{stage.name}</h2>
            <p className="text-sm text-gray-500">
              Updated: {stage.updatedAt}
            </p>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => openEditModal(stage)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(stage.id)}
                className="text-gray-600 hover:text-red-600"
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
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl relative">

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingStage ? "Edit Stage" : "Add Stage"}
            </h2>

            <input
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Stage name"
            />

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Save
            </button>

          </div>
        </div>
      )}
    </div>
  );
}