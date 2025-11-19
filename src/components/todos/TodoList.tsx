"use client"
import { useState } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragDropItem, IBackendTodo } from "@/components/dragdrop/DragDrop";

interface TodoListProps {
  todos: IBackendTodo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localTodos, setLocalTodos] = useState<IBackendTodo[]>(todos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    const activeId = active.id as string;
    const overId = over?.id as string;

    if (activeId !== overId) {
      setLocalTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleTodoEdit = async (id: string) => {
    console.log('edit todo', id);
  };

  const handleTodoDelete = async (id: string) => {
    // Your delete logic here
    setLocalTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const activeTodo = activeId ? localTodos.find(todo => todo.id === activeId) : null;

  return (
    <>
      {localTodos.length > 0 && (
        <h1 className="mt-6 md:mt-10 mb-3 md:mb-4 font-semibold text-lg md:text-xl">
          Your Task ({localTodos.length})
        </h1>
      )}

      <div className="bg-white rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {localTodos.length > 0 ? (
            <SortableContext items={localTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {localTodos.map((task: IBackendTodo) => (
                  <DragDropItem
                    key={task.id}
                    task={task}
                    onEdit={handleTodoEdit}
                    onDelete={handleTodoDelete}
                  />
                ))}
              </div>
            </SortableContext>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg">
              <Image
                src="/icon-no-projects.png"
                alt="No Todos Yet"
                width={400}
                height={400}
                className="h-32 w-auto md:h-40"
              />
              <p className="text-gray-600 text-lg mt-4">No Todo Yet</p>
            </div>
          )}

          <DragOverlay>
            {activeTodo ? (
              <div className="p-4 md:p-5 rounded-xl bg-white shadow-lg border-2 border-blue-500 opacity-90">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="p-1 mt-1">
                      <GripVertical size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base md:text-lg font-semibold text-[#0C0C0C] line-clamp-2">
                        {activeTodo.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${activeTodo.priority === "high"
                        ? "text-red-600 bg-[#FEE2E2]"
                        : activeTodo.priority === "moderate"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {activeTodo.priority}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-3 ml-6">
                  {activeTodo.description}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default TodoList;