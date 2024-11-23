'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { AuroraBackground } from "@/components/background";
import Header from "@/components/header";

interface Todo {
  _id: string;
  whatToDo: string;
  whenToDo: string;
  note: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    whatToDo: "",
    whenToDo: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/todo/add")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching todos:", error);
        alert("An error occurred while fetching todos. Please try again later.");
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/todo/add", newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ whatToDo: "", whenToDo: "", note: "" });
    } catch (error) {
      console.error("Error adding new todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuroraBackground>
        <DarkModeToggle />

        <div className="min-h-screen flex flex-col items-center space-y-9 p-9 ">
          <div className="flex flex-row items-start space-x-9">
            <div className="flex flex-col items-center w-80 space-y-3">
              <label className="font-bold text-black-700 text-2xl font-serif">What To Do:</label>
              <input
                type="text"
                value={newTodo.whatToDo}
                onChange={(e) => setNewTodo({ ...newTodo, whatToDo: e.target.value })}
                className="w-full p-3 bg-gray-100 my-2 rounded"
                required
              />
              <button
                className="p-2 bg-green-600 text-white rounded"
                onClick={() => alert('What To Do Added')}
              >
                Add What To Do
              </button>
            </div>


            <div className="flex flex-col items-center w-80 space-y-3">
              <label className="font-bold text-black-700 font-serif text-2xl ">When To Do:</label>
              <input
                type="date"
                value={newTodo.whenToDo}
                onChange={(e) => setNewTodo({ ...newTodo, whenToDo: e.target.value })}
                className="w-full p-3 bg-gray-100 my-2 rounded"
                required
              />
              <button
                className="p-2 bg-green-600 text-white rounded"
                onClick={() => alert('When To Do Added')}
              >
                Add When To Do
              </button>
            </div>

            <div className="flex flex-col items-center w-80 space-y-3">
              <label className="font-bold text-black-700 text-2xl font-serif">Leave a Note:</label>
              <input
                type="text"
                value={newTodo.note}
                onChange={(e) => setNewTodo({ ...newTodo, note: e.target.value })}
                className="w-full p-3 bg-gray-100 my-2 rounded"
              />
              <button
                className="p-2 bg-green-600 text-white rounded"
                onClick={() => alert('Note Added')}
              >
                Add Note
              </button>
            </div>
          </div>

          <button
            className="w-80 p-3 bg-blue-600 text-white rounded flex items-center justify-center"
            onClick={handleSubmit}
          >
            {loading ? <LuLoader2 className="animate-spin" /> : <span>Add To-Do</span>}
          </button>
        </div>

      </AuroraBackground>
    </>
  );
};

export default Todo;
