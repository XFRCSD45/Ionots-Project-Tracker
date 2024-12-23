import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectList = ({ token }) => {
  const [projects, setProjects] = useState({
    newlyAssigned: [],
    pending: [],
    completed: [],
  });

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: token },
      });

      // Classify projects based on status
      const newlyAssigned = response.data.filter(
        (project) => project.status === "newlyAssigned"
      );
      const pending = response.data.filter(
        (project) => project.status === "pending"
      );
      const completed = response.data.filter(
        (project) => project.status === "completed"
      );

      setProjects({ newlyAssigned, pending, completed });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Handle project updates
  const handleUpdateProject = async (id, tasks) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        { tasks },
        {
          headers: { Authorization: token },
        }
      );
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Accept newly assigned project
  const handleAcceptProject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${id}/accept`,
        { status: "pending" },
        {
          headers: { Authorization: token },
        }
      );
      fetchProjects();
    } catch (error) {
      console.error("Error accepting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Projects</h1>

      {/* Newly Assigned Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Newly Assigned</h2>
        {projects.newlyAssigned.length > 0 ? (
          projects.newlyAssigned.map((project) => (
            <div
              key={project._id}
              className="p-4 bg-white rounded shadow mb-4 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              <button
                onClick={() => handleAcceptProject(project._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Accept Project
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No newly assigned projects.</p>
        )}
      </div>

      {/* Pending Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">Pending Projects</h2>
        {projects.pending.length > 0 ? (
          projects.pending.map((project) => (
            <div
              key={project._id}
              className="p-4 bg-white rounded shadow mb-4 border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              <p className="mt-2">Progress: {project.progress}%</p>
              <ul className="mt-4">
                {project.tasks.map((task, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        const updatedTasks = [...project.tasks];
                        updatedTasks[index].completed =
                          !updatedTasks[index].completed;
                        handleUpdateProject(project._id, updatedTasks);
                      }}
                      className="mr-2"
                    />
                    <span
                      className={`${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No pending projects.</p>
        )}
      </div>

      {/* Completed Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-600">Completed Projects</h2>
        {projects.completed.length > 0 ? (
          projects.completed.map((project) => (
            <div
              key={project._id}
              className="p-4 bg-white rounded shadow mb-4 border-l-4 border-green-500"
            >
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              <p className="mt-2">Score: {project.score}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No completed projects.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
