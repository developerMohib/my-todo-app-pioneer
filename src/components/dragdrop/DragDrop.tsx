// components/SortableTodoItem.tsx
"use client";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PenLine, Trash2, GripVertical } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface SortableTodoItemProps {
  task: Todo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DragDropItem({ task, onEdit, onDelete }: SortableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
console.log('task ',task)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 md:p-5 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${
        isDragging ? 'shadow-lg ring-2 ring-blue-500 z-10' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2 flex-1">  
          <div className="flex-1 min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2">
              {task.title}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            task.priority === 'high' ? 'text-red-600 bg-[#FEE2E2]' :
            task.priority === 'medium' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {task.priority}
          </span>

          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-1 mt-1 rounded-md hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-3 ml-6">
        {task.description}
      </p>

      {/* Action Icons */}
      <div className="flex items-center justify-between gap-2 ml-6">
        <div className="flex-1">
          {task.dueDate && (
            <p className="text-xs text-gray-500">
              Due: {task.dueDate.toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="p-1.5 md:p-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
            aria-label="Edit task"
          >
            <PenLine size={14} className="md:w-4 md:h-4 text-[#5272FF]" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 md:p-2 rounded-md bg-red-50 hover:bg-red-100 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={14} className="md:w-4 md:h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}