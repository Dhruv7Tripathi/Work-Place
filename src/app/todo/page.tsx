'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { AuroraBackground } from "@/components/background";
import Header from "@/components/header";
import { useSession, signIn } from "next-auth/react";

interface Todo {
  _id: string;
  whatToDo: string;
  whenToDo: string;
  note: string;
  status: "urgent" | "pending" | "processing";
}

const TodoPage = () => {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    whatToDo: "",
    whenToDo: "",
    note: "",
  });
  const [filter, setFilter] = useState<string>("all"); // For filtering todos
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  useEffect(() => {
    if (session && session.user && session.user.email) {
      // Fetch todos for the authenticated user
      axios
        .get("/api/todo", { headers: { Authorization: `Bearer ${session.user.email}` } })
        .then((response) => setTodos(response.data))
        .catch((error) => console.error("Error fetching todos:", error));
    }
  }, [session]);

  const handleSubmit = async () => {
    if (!session || !session.user || !session.user.email) {
      console.error("User is not authenticated");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/todo",
        { ...newTodo, status: "pending" },
        { headers: { Authorization: `Bearer ${session.user.email}` } }
      );
      setTodos([...todos, response.data]);
      setNewTodo({ whatToDo: "", whenToDo: "", note: "" });
    } catch (error) {
      console.error("Error adding new todo:", error);
    } finally {
      setLoading(false);
    }
  };
  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthenticated") {
    return <p>Redirecting to login...</p>;
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/todo/${id}`, { status });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, status: status as Todo["status"] } : todo
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((todo) => todo.status === filter);

  return (
    <>
      <Header />
      {/* <AuroraBackground> */}
      <DarkModeToggle />
      <div className="min-h-screen flex flex-col items-center space-y-9 p-9">
        <h1>Welcome,{session?.user?.name}</h1>

        <div className="flex items-center space-x-4">
          <label className="font-bold text-xl">Filter:</label>
          <select
            className="p-2 bg-gray-100 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="urgent">Urgent</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 bg-gray-200 rounded shadow flex justify-between items-center w-96"
            >
              <div>
                <h4 className="font-bold text-lg">{todo.whatToDo}</h4>
                <p>{todo.whenToDo}</p>
                <p>{todo.note}</p>
              </div>
              <div className="flex items-center space-x-3">

                <select
                  className="p-2 bg-gray-100 rounded"
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                >
                  <option value="urgent">Urgent</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                </select>

                <button
                  className="p-2 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Todo Button */}
        <button
          className="w-80 p-3 bg-blue-600 text-white rounded flex items-center justify-center"
          onClick={() => setShowModal(true)}
        >
          Add New To-Do
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New To-Do</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="What To Do"
                value={newTodo.whatToDo}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, whatToDo: e.target.value })
                }
                className="w-full p-3 bg-gray-100 rounded"
              />
              <input
                type="date"
                value={newTodo.whenToDo}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, whenToDo: e.target.value })
                }
                className="w-full p-3 bg-gray-100 rounded"
              />
              <input
                type="text"
                placeholder="Note"
                value={newTodo.note}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, note: e.target.value })
                }
                className="w-full p-3 bg-gray-100 rounded"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="p-2 bg-red-600 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-green-600 text-white rounded"
                onClick={handleSubmit}
              >
                {loading ? <LuLoader2 className="animate-spin" /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* </AuroraBackground> */}
    </>
  );
};

export default TodoPage;
