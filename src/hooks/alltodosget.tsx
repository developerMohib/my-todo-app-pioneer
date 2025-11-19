import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export type Todo = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'moderate' | 'high' | 'extreme';
  is_completed: boolean;
  position: number;
  todo_date: string;
  created_at: string;
  updated_at: string;
};

// API service functions
const todoApi = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get('https://todo-app.pioneeralpha.com/api/todos/');
    console.log(' response all data',response)
    return response.data;
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get(`/todos/${id}/`);
    return response.data;
  },

  createTodo: async (todoData: Omit<Todo, 'id' | 'created_at' | 'updated_at'>): Promise<Todo> => {
    const response = await axios.post('/todos/', todoData);
    return response.data;
  },

  updateTodo: async (id: number, todoData: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`/todos/${id}/`, todoData);
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`/todos/${id}/`);
  },
};

// Query keys for better cache management
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

/**
 * Hook to GET all todos with TanStack Query
 */
export function useAllTodos() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: todoApi.getAllTodos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
  });
}

/**
 * Hook to GET a single todo by ID
 */
export function useTodoById(id: number) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoApi.getTodoById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to CREATE a new todo
 */
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      // Invalidate and refetch todos list
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

/**
 * Hook to UPDATE a todo
 */
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Todo> }) =>
      todoApi.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      // Update the specific todo in cache
      queryClient.setQueryData(todoKeys.detail(updatedTodo.id), updatedTodo);
      
      // Invalidate todos list to refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

/**
 * Hook to DELETE a todo
 */
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: (_, deletedId) => {
      // Remove the todo from cache
      queryClient.removeQueries({ queryKey: todoKeys.detail(deletedId) });
      
      // Invalidate todos list to refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

/**
 * Hook to toggle todo completion status
 */
export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_completed }: { id: number; is_completed: boolean }) =>
      todoApi.updateTodo(id, { is_completed }),
    onSuccess: (updatedTodo) => {
      // Optimistically update the cache
      queryClient.setQueryData(todoKeys.detail(updatedTodo.id), updatedTodo);
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

export default useAllTodos;