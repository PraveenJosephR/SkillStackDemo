import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Pencil, Trash2, X, ArrowRight } from "lucide-react";

type Workflow = {
  id: number;
  name: string;
  stages: string[];
};

const ALL_STAGES = [
  "permission_upload",
  "ai_permission_verification",
  "manual_permission_verification",
  "event_progress",
  "ai_proof_verification",
  "manual_proof_verification",
  "activity_completed",
];

export default function WorkflowManagement() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 1,
      name: "AI Approval Flow",
      stages: [
        "permission_upload",
        "ai_permission_verification",
        "event_progress",
        "ai_proof_verification",
        "activity_completed",
      ],
    },
    {
      id: 2,
      name: "Manual Review Flow",
      stages: [
        "permission_upload",
        "manual_permission_verification",
        "event_progress",
        "manual_proof_verification",
        "activity_completed",
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Workflow | null>(null);
  const [name, setName] = useState("");
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const openCreate = () => {
    setEditing(null);
    setName("");
    setSelectedStages([]);
    setModalOpen(true);
  };

  const openEdit = (wf: Workflow) => {
    setEditing(wf);
    setName(wf.name);
    setSelectedStages(wf.stages);
    setModalOpen(true);
  };

  const saveWorkflow = () => {
    if (!name.trim() || selectedStages.length === 0) return;

    if (editing) {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === editing.id ? { ...w, name, stages: selectedStages } : w
        )
      );
    } else {
      setWorkflows((prev) => [
        ...prev,
        { id: Date.now(), name, stages: selectedStages },
      ]);
    }

    setModalOpen(false);
  };

  const deleteWorkflow = (id: number) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSelectedStages((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStage = (stage: string) => {
    if (!selectedStages.includes(stage)) {
      setSelectedStages((prev) => [...prev, stage]);
    }
  };

  const removeStage = (stage: string) => {
    setSelectedStages((prev) => prev.filter((s) => s !== stage));
  };

  return (
    <div className="p-10 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workflow Management</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          <Plus size={16} />
          Create Workflow
        </button>
      </div>

      {/* Workflow Cards */}
      {workflows.map((wf) => (
        <div
          key={wf.id}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{wf.name}</h2>

            <div className="flex gap-4">
              <button onClick={() => openEdit(wf)}>
                <Pencil size={18} />
              </button>
              <button onClick={() => deleteWorkflow(wf.id)}>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {wf.stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                  {stage}
                </span>
                {i !== wf.stages.length - 1 && (
                  <ArrowRight size={16} className="text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[95%] max-w-4xl p-8 rounded-2xl relative space-y-6">

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold">
              {editing ? "Edit Workflow" : "Create Workflow"}
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workflow Name"
              className="w-full border p-3 rounded-lg"
            />

            {/* Available Stages */}
            <div>
              <p className="font-medium mb-2">Available Stages</p>
              <div className="flex flex-wrap gap-3">
                {ALL_STAGES.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => addStage(stage)}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-full text-sm"
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Workflow Builder */}
            <div>
              <p className="font-medium mb-2">Workflow Order (Drag to reorder)</p>

              <div className="bg-gray-50 rounded-xl p-6 min-h-[100px]">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={selectedStages}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {selectedStages.map((stage, i) => (
                        <SortableItem
                          key={stage}
                          id={stage}
                          onRemove={() => removeStage(stage)}
                          isLast={i === selectedStages.length - 1}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>

            <button
              onClick={saveWorkflow}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
            >
              Save Workflow
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

/* Sortable Badge Component */
function SortableItem({
  id,
  onRemove,
  isLast,
}: {
  id: string;
  onRemove: () => void;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="flex items-center gap-3">
      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm cursor-move">
        {id}
      </div>
      {!isLast && <ArrowRight size={16} className="text-gray-400" />}
    </div>
  );
}