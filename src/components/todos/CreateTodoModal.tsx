"use client"
import { useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { UseQueryResult } from "@tanstack/react-query";
import { IBackendTodo } from "@/services/AuthService/todosget";

interface CreateTodoModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    refetch: UseQueryResult<IBackendTodo[], Error>['refetch'];
}

// Form field props interface
interface FormFieldProps {
    label: string;
    id: string;
    type: "text" | "date" | "email" | "password" | "number"; // Add more types as needed
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

// Priority selector props interface
interface PrioritySelectorProps {
    priority: string;
    setPriority: (priority: string) => void;
}

// Modal footer props interface
interface ModalFooterProps {
    loading: boolean;
    onClose: () => void;
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}`;

const CreateTodoModal = ({ openModal, setOpenModal, refetch }: CreateTodoModalProps) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !priority) {
            toast.warning("Please fill all required fields.");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("No access token found");
            return;
        }

        setLoading(true);
        const taskdata = {
            title,
            todo_date: date,
            priority: priority.toLowerCase(),
            description,
        };

        try {
            const response = await axios.post(`${API_URL}/todos/`, taskdata, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('component res create todo', response)
            toast.success('Task Created');
            setOpenModal(false);
            resetForm();
            await refetch()
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Failed to create task. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDate("");
        setPriority("");
        setDescription("");
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={() => setOpenModal(false)}
                className="fixed inset-0 bg-black/70 transition-opacity"
            />

            <div className="bg-white rounded-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between p-4 md:p-5 pb-3">
                    <h3 className="text-lg md:text-xl font-semibold">
                        Add New Task
                        <hr className="h-0.5 bg-[#5272FF] font-bold w-3/5" />
                    </h3>
                    <button
                        onClick={() => setOpenModal(false)}
                        type="button"
                        className="text-gray-500 hover:text-gray-700 text-sm border-b"
                    >
                        Go Back
                    </button>
                </div>

                <div className="p-4 md:p-5">
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="Title"
                            id="title"
                            type="text"
                            value={title}
                            onChange={setTitle}
                            required
                        />

                        <FormField
                            label="Date"
                            id="date"
                            type="date"
                            value={date}
                            onChange={setDate}
                            required
                        />

                        <PrioritySelector priority={priority} setPriority={setPriority} />

                        <div className="mt-4">
                            <label htmlFor="description" className="text-sm font-bold text-[#0C0C0C] block mb-2">
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

                        <ModalFooter
                            loading={loading}
                            onClose={() => setOpenModal(false)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

// Sub-components for the modal with specific types
const FormField = ({ label, id, type, value, onChange, required }: FormFieldProps) => (
    <div className="mt-4">
        <label htmlFor={id} className="text-sm font-bold text-[#0C0C0C] block mb-2">
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-[#0C0C0C] text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            required={required}
        />
    </div>
);

const PrioritySelector = ({ priority, setPriority }: PrioritySelectorProps) => (
    <div className="mt-4">
        <p className="text-sm font-bold text-[#0C0C0C] mb-3">Priority</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Extreme", "Moderate", "Low"].map((p) => (
                <label key={p} className="flex items-center gap-2 p-2 cursor-pointer">
                    <span
                        className={`w-2 h-2 rounded-full ${p === "Extreme" ? "bg-red-500" :
                            p === "Moderate" ? "bg-green-500" : "bg-yellow-500"
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
);

const ModalFooter = ({ loading, onClose }: ModalFooterProps) => (
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
            onClick={onClose}
            className="text-white bg-[#EE0039] hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center gap-2 w-full sm:w-auto justify-center transition-colors"
            type="button"
        >
            <Trash2 size={16} />
        </button>
    </div>
);

export default CreateTodoModal;