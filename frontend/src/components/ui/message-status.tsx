interface FormMessageProps {
  message: string | null;
  onClose: () => void;
  className?: string;
}

const FormMessage = ({ message, onClose, className = "" }: FormMessageProps) => {
  if (!message) return null;

  const isSuccess = message.includes("successfully");

  return (
    <div className={`w-full px-4 py-3 rounded-2xl text-sm font-medium text-center flex items-center justify-between ${isSuccess ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"} ${className}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-current opacity-60 hover:opacity-100 cursor-pointer">✕</button>
    </div>
  );
};

export default FormMessage;