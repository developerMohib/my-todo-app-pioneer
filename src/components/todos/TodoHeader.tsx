interface TodoHeaderProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const TodoHeader = ({ setOpenModal }: TodoHeaderProps) => {
    return (
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
    );
};

export default TodoHeader;