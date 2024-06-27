import { RiLoader4Line } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RiLoader4Line className="animate-spin text-4xl text-gray-500" />
    </div>
  );
}
