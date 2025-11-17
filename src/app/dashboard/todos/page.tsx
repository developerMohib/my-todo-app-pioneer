"use client"
import { ArrowDownUp, Search, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TodoPage = () => {
  const initialTodos = [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the client project proposal document with all requirements",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-02-15"),
      createdAt: new Date("2024-01-28"),
      updatedAt: new Date("2024-01-28"),
      tags: ["work", "urgent"]
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread, fruits, and vegetables",
      completed: true,
      priority: "medium",
      dueDate: new Date("2024-01-30"),
      createdAt: new Date("2024-01-27"),
      updatedAt: new Date("2024-01-29"),
      tags: ["personal", "shopping"]
    },
    {
      id: "3",
      title: "Schedule dentist appointment",
      description: "Call Dr. Smith's office for routine checkup",
      completed: false,
      priority: "low",
      createdAt: new Date("2024-01-29"),
      updatedAt: new Date("2024-01-29"),
      tags: ["health"]
    },
    {
      id: "4",
      title: "Prepare presentation slides",
      description: "Create slides for the quarterly business review meeting",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-02-10"),
      createdAt: new Date("2024-01-26"),
      updatedAt: new Date("2024-01-29"),
      tags: ["work", "presentation"]
    },
    {
      id: "5",
      title: "Read React documentation",
      description: "Go through the new React 18 features and best practices",
      completed: true,
      priority: "medium",
      createdAt: new Date("2024-01-25"),
      updatedAt: new Date("2024-01-28"),
      tags: ["learning", "development"]
    },
    {
      id: "6",
      title: "Plan weekend trip",
      description: "Research and book accommodations for the mountain getaway",
      completed: false,
      priority: "low",
      dueDate: new Date("2024-02-05"),
      createdAt: new Date("2024-01-29"),
      updatedAt: new Date("2024-01-29"),
      tags: ["personal", "travel"]
    },
    {
      id: "7",
      title: "Fix responsive layout issues",
      description: "Address mobile responsiveness problems on the dashboard page",
      completed: false,
      priority: "medium",
      dueDate: new Date("2024-02-03"),
      createdAt: new Date("2024-01-28"),
      updatedAt: new Date("2024-01-29"),
      tags: ["work", "development", "bugs"]
    },
    {
      id: "8",
      title: "Renew gym membership",
      description: "Monthly subscription renewal for fitness center",
      completed: true,
      priority: "low",
      dueDate: new Date("2024-01-31"),
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-28"),
      tags: ["health", "personal"]
    },
    {
      id: "9",
      title: "Write unit tests",
      description: "Add comprehensive test coverage for the new authentication module",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-02-08"),
      createdAt: new Date("2024-01-29"),
      updatedAt: new Date("2024-01-29"),
      tags: ["work", "development", "testing"]
    },
    {
      id: "10",
      title: "Organize workspace",
      description: "Clean desk setup and cable management",
      completed: true,
      priority: "low",
      createdAt: new Date("2024-01-27"),
      updatedAt: new Date("2024-01-28"),
      tags: ["personal", "organization"]
    }
  ];
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    deadlineToday: false,
    expiresIn5: false,
    expiresIn10: false,
    expiresIn30: false
  });
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Todos</h1>

        <button onClick={() => setOpenModal(true)}
          type="button" className="bg-blue-500 px-3 py-2 rounded-lg text-white">+ New Task</button>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="w-10/12 bg-white">
          <div className="relative rounded-lg w-full flex border-2 border-gray-300 ">
            <input type="text" name="q" id="query" placeholder="Search Your Task Here..." className="w-full p-2 placeholder-[#4B5563] focus:outline-none" />
            <button className="inline-flex items-center gap-2 bg-[#5272FF] text-white text-lg font-bold px-3 rounded-md">
              <Search size={28} className="font-bold" />
            </button>
          </div>
        </div>

        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            Filter By
            <ArrowDownUp size={16} />
          </button>

          {openFilter && (
            <div className="absolute mt-2 right-0 bg-white w-64 rounded-lg shadow-lg p-4 border border-gray-200 z-50">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Date</h3>

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
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="mt-10 bg-white rounded-lg">
        {initialTodos && initialTodos.length > 0 ? (
          initialTodos.map((todo) => (
            <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    // onChange={} 
                    readOnly
                    checked={todo.completed}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <div>
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {todo.title}
                    </h3>
                    <p className="text-sm text-gray-600">{todo.description}</p>
                    {todo.dueDate && (
                      <p className="text-xs text-gray-500">
                        Due: {todo.dueDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                  todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                  {todo.priority}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 bg-white rounded-lg min-h-screen">
            <Image src={"/icon-no-projects.png"} alt="No Todos Yet" width={400} height={400} className="h-40 w-auto" />
            <p>No Todo Yet</p>
          </div>
        )}
      </div>

      <div ref={dropdownRef}>
        {/* Modal */}
        {openModal && (
          <div
            className="fixed inset-0 z-50 w-1/2 mx-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Overlay */}
            <div
              onClick={() => setOpenModal(!openModal)}
              className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"
            />
            <div className="bg-white rounded-lg relative">
              <div className="flex items-start justify-between p-5">
                <h3 className="text-xl font-semibold">
                  Add New Task
                </h3>
                <button onClick={() => setOpenModal(false)} type="button" className="text-[#000000] bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center underline" data-modal-toggle="product-modal">
                  Go Back
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form action="#">
                  <div className="">
                    <label htmlFor="product-name" className="text-sm font-medium text-[#0C0C0C] block mb-2">Title</label>
                    <input type="text" name="product-name" id="product-name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                  </div>
                  <div className="my-5">
                    <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Date</label>
                    <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
                  </div>

                  <div className="my-5">
                    <p>Priority</p>

                    <div className="grid grid-cols-3 my-2">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                        <label htmlFor="terms" className="mr-2 block text-sm text-[#4B5563]">
                          Extreme
                        </label>
                        <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        <label htmlFor="terms" className="mr-2 block text-sm text-[#4B5563]">
                         Modarate
                        </label>
                        <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                        <label htmlFor="terms" className="mr-2 block text-sm text-[#4B5563]">
                          Low
                        </label>
                        <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full ">
                    <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Task Description</label>
                    <textarea id="product-details" rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Start writtin here..." defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-gray-200 rounded-b flex justify-between items-center">
                <button className="text-white bg-[#5272FF] hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save</button>
                <button className="text-white bg-[#EE0039] hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center" type="submit">
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>





    </div>
  );
};

export default TodoPage;