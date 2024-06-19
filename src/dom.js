import deleteIcon from './assets/trash-can-outline-white.png';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const projectsContainer = document.getElementById('projects-container');
const todoContainer = document.getElementById('todo-container');
const todoContainerHeader = document.getElementById('todo-container-header');

function renderProjects(projectsFolder) {
    while (projectsContainer.firstChild) {
        projectsContainer.removeChild(projectsContainer.firstChild);
    }

    Object.keys(projectsFolder).forEach(projectName => {
        const projectElement = document.createElement('div');
        projectElement.textContent = projectName;

        projectElement.addEventListener('click', () => {
            renderTodos(projectName, projectsFolder);
        })

        projectElement.classList.add('project-name');

        projectsContainer.appendChild(projectElement);
    })
}

function renderTodos(projectName, projectsFolder) {
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }
    todoContainerHeader.textContent = projectName;

    projectsFolder[projectName].todos.forEach(todoObject => {
        const todoElement = document.createElement('div');
        
        const title = document.createElement('h2');
        title.textContent = todoObject.title;
        title.classList.add('todo-title');
        
        const description = document.createElement('div');
        description.textContent = todoObject.description;
        
        const dueDate = document.createElement('div');
        dueDate.textContent = todoObject.dueDate;

        switch(todoObject.priority) {
            case 'low':
                todoElement.classList.add('todo-priority-low');
                break;
            
            case 'medium':
                todoElement.classList.add('todo-priority-medium');
                break;

            case 'high':
                todoElement.classList.add('todo-priority-high');
                break;
        }

        const deleteIconElement = document.createElement('img');
        deleteIconElement.src = deleteIcon;
        deleteIconElement.classList.add('todo-card-icon');
        deleteIconElement.addEventListener('click', () => {

        })

        todoElement.appendChild(title);
        todoElement.appendChild(description);
        todoElement.appendChild(dueDate);
        todoElement.appendChild(deleteIconElement);

        todoElement.classList.add('todo-element');

        todoContainer.appendChild(todoElement);
    });
}

export { renderProjects, renderTodos };