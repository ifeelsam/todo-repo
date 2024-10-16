import { HoverEffect } from "./components/ui/hover-card";
import {Input} from "./components/ui/input"
import {Button } from "./components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import {SparklesText} from "./components/ui/sparkle-text"

export default function App() {
  const addTodo = () => {}
  return (
    <div className="max-w-5xl mx-auto px-8">
      <SparklesText className="flex justify-center mt-14" text="Santhoshini Todo-App" />
      <div className="flex mx-10 max-w-4xl mt-32">
        <Input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2 py-6"
        />
        <Button onClick={addTodo} className="py-6">
          <Plus className="h-6 w-6 mr-2" />
          Add
        </Button>
      </div>

      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "go to gym",
    description:
      "40 reps chest || 50 reps pull"
  },
  {
    title: "laudary",
    description: "kapde dhone hai "
  },
  {
    title: "study mathematics",
    description: "exams are coming up study hard"
  }
];