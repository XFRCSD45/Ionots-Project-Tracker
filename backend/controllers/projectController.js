import Project from "../models/Project.js";

export async function createProject(req, res) {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProjectsForUser(req, res) {
  try {
    const projects = await Project.find({ assignedTo: req.user.username });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProjectTasks(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.assignedTo !== req.user.username) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { tasks } = req.body;
    if (tasks) {
      project.tasks = tasks;
      const completedTasks = tasks.filter((task) => task.completed).length;
      const totalTasks = tasks.length;
      project.progress =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      let count = 0;
      let score = 0;
      tasks.forEach((task) => {
        if (task.completed) {
          score += 10;
          count++;
          if (task.isCritical) {
            score += 20;
          }
        }
      });
      project.score = score;
      if (count === tasks.length) {
        project.status = "completed";
      }
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function acceptProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "pending" },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project status", error });
  }
}
