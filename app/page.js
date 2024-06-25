import Quiz from "../components/Quiz.js";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Quiz
        </h1>
        <Quiz />
      </div>
    </div>
  );
}
