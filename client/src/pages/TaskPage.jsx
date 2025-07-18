import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]); // Initialize as empty array
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(null);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/task`);
      console.log("API Response:", response.data);
      setTasks(response.data.task); // Store only the task array
      console.log("Tasks state:", response.data.task);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/task/${id}`
      );
      console.log("API Response:", response.data);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/task`, {
        title,
        description,
      });
    } catch (error) {
      console.log("Create error:", error);
      alert(error.message);
    } finally {
      setOpenModel(false);
      setTitle("");
      setDescription("");
    }
    fetchTask();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(update._id);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/task/${update._id}`, {
        title,
        description,
      });
      await fetchTask();
    } catch (error) {
      console.log("update error:", error);
      alert(error.message);
    } finally {
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setUpdate(null);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <div className="pt-5 flex justify-end mr-4">
        <button
          className="text-sm font-semibold p-2 rounded-full bg-emerald-400 text-white hover:text-black cursor-pointer"
          onClick={() => setOpenModel(true)}
        >
          + Add Task
        </button>
      </div>
      {openModel && (
        <div className="p-4 sm:w-full md:max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 ">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-6 ">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="Enter Description"
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-green-400 p-1.5 rounded text-white font-semibold hover:text-black cursor-pointer ">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {/* Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            aria-hidden="true"
          >
            <div className="relative p-4 w-full max-w-md">
              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update your Task
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleUpdate}>
                    <div className="mb-6 ">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-green-500"
                        placeholder="Enter title"
                      />
                    </div>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                      placeholder="Enter Description"
                    />
                    <div className="flex justify-center">
                      <button className="bg-green-400 p-1.5 rounded text-white font-semibold hover:text-black cursor-pointer ">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {tasks.map((item) => (
          <div
            key={item._id}
            className="flex flex-col bg-white border border-gray-200 border-t-4 border-t-blue-600 shadow-2xs rounded-xl max-w-full"
          >
            <div className="p-4 md:p-5 mx-auto">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="mt-2 text-gray-500">{item.description}</p>
              <div className="flex justify-around">
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  View
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => {
                    setIsOpen(true);
                    setUpdate(item);
                  }}
                >
                  Update
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
