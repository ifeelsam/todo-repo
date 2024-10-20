import { HoverEffect } from "./components/ui/hover-card";
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Plus } from 'lucide-react'
import { SparklesText } from "./components/ui/sparkle-text"
import { useEffect, useState } from "react";
const backendURI = "https://todo-backend.ifeelsam.workers.dev"
export default function App() {
  const [NewTodoTitle, setNewTodoTitle] = useState("")
  const [NewTodoDesc, setNewTodoDesc] = useState("")
  const [todos, setTodos] = useState([])
  const getTodos = async () => {
    try {
      const response = await fetch(`${backendURI}/tasks`, {
        method: "GET",
        mode: "cors",
      })
      const data = await response.json()
      setTodos(data)
      console.log(response)
    } catch (error) {
      console.log(error, "error geting the todos")
    }
  }
  useEffect(() => {
    getTodos()
  }, [])


  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendURI}/tasks/${id}`, {
        method: "DELETE",
        mode: "cors"
      })
      if (!response.ok) {
        console.log(response.status)
      }
      getTodos()
    } catch (error) {
      console.log("log", error)

    }

  }


  const editTodo = async (id, updatedTitle, updatedDesc) => {
    try {
      const response = await fetch(`${backendURI}/tasks/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDesc,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Todo updated:", result);
      getTodos();
    } catch (error) {
      console.log("error updating todo", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(`${backendURI}/tasks`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: NewTodoTitle,
          description: NewTodoDesc
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Todo added:", result);
      getTodos()
    }
    catch (error) {
      console.log("error adding todos", error)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-8">
      <SparklesText className="flex justify-center mt-14" text="Santhoshini Todo-App" />
      <div className="flex mx-10 max-w-4xl mt-32">
        <Input
          type="title"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2 py-6"
        />
        <Input
          type="description"
          onChange={(e) => setNewTodoDesc(e.target.value)}
          placeholder="description"
          className="flex-grow mr-2 py-6"
        />
        <Button onClick={addTodo} className="py-6">
          <Plus className="h-6 w-6 mr-2" />
          Add
        </Button>
      </div>

      <HoverEffect items={todos} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  );
}
