"use client"
import Loader from "@/components/shared/Loader";
import { ArrowDownUp, GripVertical, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

// Import DnD Kit components
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
import { DragDropItem } from "@/components/dragdrop/DragDrop";
import axios from "axios";
import { IBackendTodo } from "@/services/AuthService/todosget";
import { toast } from "sonner";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}`;
const TodoPage = () => {

  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    deadlineToday: false,
    expiresIn5: false,
    expiresIn10: false,
    expiresIn30: false
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [todos, setTodos] = useState<IBackendTodo[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [errorr, setErrorr] = useState("");
  console.log(' to set toodo', todos)

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  // Sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    const activeId = active.id as string;
    const overId = over?.id as string;


    if (activeId !== overId) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);

        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems;
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleTodoEdit = async (id: string) => {
    console.log('edit todo', id)
  }

  const handleTodoDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5272FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('delete todo', id)
        // refetch()
        // Remove from local state
        setTodos(prev => prev.filter(todo => todo.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return { success: false, message: "No access token found" };
      }
      const res = await axios.get(`${API_URL}/todos/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('response.data', res.data)

      if (res.status && res.data) {
        setTodos(res.data.results);
      } else {
        setErrorr(res.statusText || "Failed to fetch todos");
      }
      setLoading(false);
    };

    fetchTodos();
  }, []);


  // Task added here 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !priority) {
      toast.warning("Please fill all required fields.");
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, message: "No access token found" };
    }
    setLoading(true);

    const taskdata = {
      title,
      todo_date: date,
      priority: priority.toLowerCase(),
      description,
    }
    console.log('task data', taskdata)
    try {

      const response = await axios.post(`${API_URL}/todos/`, taskdata, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Task created:", response?.data?.detail);
      toast.success('Task Crated')
      setOpenModal(false); // Close modal
      // Optionally, reset form
      setTitle("");
      setDate("");
      setPriority("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Try again!");
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <Loader />;
  if (errorr) return <p className="text-red-600">{errorr}</p>;



  // Get the active todo for drag overlay
  const activeTodo = activeId ? todos.find(todo => todo.id === activeId) : null;

  console.log('all todoooooooos', todos);

  return (
    <div className="p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Todos</h1>
        <button
          onClick={() => setOpenModal(true)}
          type="button"
          className="bg-blue-500 px-4 py-2 md:px-6 md:py-3 rounded-lg text-white text-sm md:text-base hover:bg-[#5272FF] transition-colors w-full sm:w-auto"
        >
          + New Task
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="w-full lg:w-10/12 bg-white">
          <div className="relative rounded-lg w-full flex border-2 border-gray-300">
            <input
              type="text"
              name="q"
              id="query"
              placeholder="Search Your Task Here..."
              className="w-full p-2 md:p-3 placeholder-[#4B5563] focus:outline-none text-sm md:text-base"
            />
            <button className="inline-flex items-center gap-2 bg-[#5272FF] text-white px-3 md:px-4 rounded-lg hover:bg-[#5272FF] transition-colors">
              <Search size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div ref={dropdownRef} className="relative w-full lg:w-auto">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="bg-blue-500 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-1.5 hover:bg-[#5272FF] transition-colors w-full lg:w-auto text-sm md:text-base"
          >
            Filter By
            <ArrowDownUp size={16} className="md:w-5 md:h-5" />
          </button>

          {openFilter && (
            <div className="absolute mt-2 left-0 lg:left-auto lg:right-0 bg-white w-full lg:w-64 rounded-lg shadow-lg p-4 border border-gray-200 z-50">
              <h3 className="font-semibold text-[#4B5563] mb-3 border-b-2 border-gray-300 text-xl ">Date</h3>
              <div className="space-y-2">
                {[
                  { key: 'deadlineToday', label: 'Deadline Today' },
                  { key: 'expiresIn5', label: 'Expires in 5 days' },
                  { key: 'expiresIn10', label: 'Expires in 10 days' },
                  { key: 'expiresIn30', label: 'Expires in 30 days' },
                ].map((filter) => (
                  <label key={filter.key} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters[filter.key as keyof typeof filters]}
                      onChange={() => handleFilterChange(filter.key as keyof typeof filters)}
                      className="w-4 h-4 text-[#5272FF] rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-[#4B5563] group-hover:text-[#0C0C0C]">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Section with Drag and Drop */}
      {todos.length > 0 && <h1 className="mt-6 md:mt-10 mb-3 md:mb-4 font-semibold text-lg md:text-xl">
        Your Task ({todos.length})
      </h1>}

      <div className="bg-white rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >

          {todos.length > 0 ? (
            <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {todos.map((task) => (
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

      {/* Rest of your modal code remains the same */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 bg-black/70 transition-opacity"
          />

          {/* Modal Content */}
          <div className="bg-white rounded-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 md:p-5 pb-3 ">
              <h3 className="text-lg md:text-xl font-semibold">
                Add New Task
                <hr className="h-0.5 bg-[#5272FF] font-bold w-3/5 " />
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                type="button"
                className="text-gray-500 hover:text-gray-700 text-sm border-b"
                aria-label="Close modal"
              >
                Go Back
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-5">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="text-sm font-bold text-[#0C0C0C] block mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-[#0C0C0C] text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="date"
                    className="text-sm font-bold text-[#0C0C0C] block mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-[#0C0C0C] text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm font-bold text-[#0C0C0C] mb-3">Priority</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Extreme", "Moderate", "Low"].map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-2 p-2 cursor-pointer "
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${p === "Extreme"
                            ? "bg-red-500"
                            : p === "Moderate"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                            }`}
                        ></span>
                        <span className="text-sm text-gray-700">{p}</span>
                        <input
                          type="checkbox"
                          name="priority"
                          value={p.toLowerCase()}
                          checked={priority === p.toLowerCase()}
                          onChange={() => setPriority(p.toLowerCase())}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded ml-auto"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="text-sm font-bold text-[#0C0C0C] block mb-2"
                  >
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-[#0C0C0C] text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                    placeholder="Start writing here..."
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-4 md:p-5 border-t border-gray-200 rounded-b flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                  <button
                    className={`text-white bg-[#5272FF] hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Task"}
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="text-white bg-[#EE0039] hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center gap-2 w-full sm:w-auto justify-center transition-colors"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </form>
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;