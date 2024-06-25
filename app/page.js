import Quiz from "../components/Quiz.js";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz</h1>
      <Quiz />
    </div>
  );
}
