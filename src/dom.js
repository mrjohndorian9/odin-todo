import { Projects, Project, Todo } from './smth';

export function domController() {
  const projectsNode = document.querySelector('.projects-list');
  const modalNode = document.querySelector('.modal');
  const newProjectButton = document.querySelector('.projects-header button');
  const projects = Projects();
  const projectsArr = projects.getProjects();

  function renderProjects() {
    projectsNode.innerHTML = '';
    if (projectsArr.length === 0) {
      return (projectsNode.innerHTML =
        '<p class="no-projects">You don\'t have any projects yet. Add one!</p>');
    }
    projectsArr.forEach((p, i) => {
      const isActive = p.isActive();
      const para = document.createElement('p');
      const div = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'Delete';
      button.addEventListener('click', e => {
        projects.removeProject(p);
        renderProjects();
      });
      para.textContent = `${i + 1}. ${p.title}`;
      div.append(para);
      div.append(button);
      div.classList = 'project';
      if (isActive) {
        div.classList.add('project-active');
      }
      para.classList = 'project-title';
      projectsNode.append(div);
      div.addEventListener('click', e => {
        projects.setAllInactive();
        p.setActive();
        renderProjects();
      });
    });
  }

  function showModal() {
    modalNode.classList.remove('hidden');
  }

  function projectButtonHandler() {
    modalNode.innerHTML = `
    <form action="">
    <div class="input-wrapper">
    <label style="display: block" for="name">Project name</label>
    <input required type="text" id="name">
    </div>
    <div class="form-buttons">
    <button type="submit" class="project-add">Add Project</button>
    <button class="project-cancel">Cancel</button>
    </div>
    </form>
    `;
    modalNode.querySelector('form').addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
    });
    modalNode.querySelector('.project-add').addEventListener('click', e => {
      const title = modalNode.querySelector('input').value;
      if (!title.trim()) return (modalNode.querySelector('input').value = '');
      projects.addProject(title);
      renderProjects();
      hideModal();
    });
    modalNode
      .querySelector('.project-cancel')
      .addEventListener('click', hideModal);
    showModal();
  }

  function setupNewProjectHtml() {}

  function hideModal() {
    modalNode.classList.add('hidden');
  }

  function setupModal() {
    modalNode.addEventListener('click', hideModal);
  }

  setupModal();
  renderProjects();

  function addProject(add) {}
  newProjectButton.addEventListener('click', projectButtonHandler);
}
