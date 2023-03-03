import { v4 as uuid } from 'uuid';

function Projects() {
  const defaultProject = new Project('Default', true);
  let projects = [defaultProject];
  let activeProject = projects[0];

  const getProjects = () => projects;
  const getActiveProject = () => projects.find(p => p.active);
  const addProject = title => projects.push(new Project(title));
  const setAllInactive = () =>
    projects.forEach(p => {
      p.setInactive();
    });
  const removeProject = project => {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
  };
  return {
    removeProject,
    setAllInactive,
    getProjects,
    getActiveProject,
    addProject
  };
}

class Project {
  constructor(title, active = false) {
    this.title = title;
    this.id = uuid();
    this.todos = [];
    this.active = active;
  }

  isActive() {
    return this.active;
  }

  getTodos() {
    return this.todos;
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.active = false;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeFinishedTodos() {
    this.todos = this.todos.filter(t => t.finished);
  }
}

class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.finished = false;
    this.id = uuid();
  }

  toggleFinished() {
    this.finished = !this.finished;
  }
}

export { Projects, Project, Todo };
