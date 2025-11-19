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
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import EditTodoModal from "./EditTodoModal";

interface TodoListProps {
  todos: IBackendTodo[];
  refetch: UseQueryResult<IBackendTodo[], Error>['refetch'];
}

const TodoList = ({ todos, refetch }: TodoListProps) => {

  const [activeId, setActiveId] = useState<string | null>(null);
  const [localTodos, setLocalTodos] = useState<IBackendTodo[]>(todos);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<IBackendTodo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  // Open edit modal
  const handleTodoEdit = async (id: string) => {
    const todo = localTodos.find(t => t.id === id);
    if (todo) {
      setSelectedTodo(todo);
      setEditModalOpen(true);
    }
  };

  // Delete todo function
  const handleTodoDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5272FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            toast.error("No access token found");
            return;
          }

          // Make DELETE request to your API
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API}/todos/${id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Remove from local state immediately for better UX
          setLocalTodos(prev => prev.filter(todo => todo.id !== id));

          // Refetch to sync with server
          await refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error("Error deleting todo:", error);
          toast.error("Failed to delete task. Please try again.");

          // If error, refetch to get correct state from server
          await refetch();
        }
      }
    });
  };

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
      <EditTodoModal
        openModal={editModalOpen}
        setOpenModal={setEditModalOpen}
        refetch={refetch}
        todo={selectedTodo}
      />
    </>
  );
};

export default TodoList;