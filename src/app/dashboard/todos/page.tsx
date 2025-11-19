"use client"
import { useState } from "react";
import Loader from "@/components/shared/Loader";
import { useTodos } from "@/hooks/useAllTodos";
import TodoHeader from "@/components/todos/TodoHeader";
import SearchFilterSection from "@/components/todos/SearchFilterSection";
import TodoList from "@/components/todos/TodoList";
import CreateTodoModal from "@/components/todos/CreateTodoModal";

const TodoPage = () => {
  const { data: todos, isLoading, isError, error, refetch } = useTodos();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    deadlineToday: false,
    expiresIn5: false,
    expiresIn10: false,
    expiresIn30: false
  });

  if (isLoading) return <Loader />;
  if (isError || error) {
    return (
      <p className="text-red-600 mb-4">
        {error?.message || 'Unable to load your tasks. Please try again.'}
      </p>
    )
  }
  return (
    <div className="p-4 md:p-6">
      <TodoHeader
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <SearchFilterSection
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        filters={filters}
        setFilters={setFilters}
      />

      <TodoList todos={todos} refetch={refetch} />

      <CreateTodoModal
        openModal={openModal}
        setOpenModal={setOpenModal} refetch={refetch}
      />
    </div>
  );
};

export default TodoPage;