const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const projectsContainer = document.getElementById('projects-container');
const todoContainer = document.getElementById('todo-container');

function renderProjects(projectsFolder) {
    while (projectsContainer.firstChild) {
        projectsContainer.removeChild(projectsContainer.firstChild);
    }

    Object.keys(projectsFolder).forEach(projectName => {
        const projectElement = document.createElement('div');
        projectElement.textContent = projectName;

        projectsContainer.appendChild(projectElement);
    })
}

function renderTodos(projectName, projectsFolder) {
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }

    projectsFolder[projectName].forEach(todoObject => {
        const todoElement = document.createElement('div');
        
        const title = document.createElement('div');
        title.textContent = 'Title: ' + todoObject.title;
        
        const description = document.createElement('div');
        description.textContent = 'Description: ' + todoObject.description;
        
        const dueDate = document.createElement('div');
        dueDate.textContent = 'Due date: ' + todoObject.dueDate;
        
        const priority = document.createElement('div');
        priority.textContent = 'Priority: ' + todoObject.priority;

        todoElement.appendChild(title);
        todoElement.appendChild(description);
        todoElement.appendChild(dueDate);
        todoElement.appendChild(priority);

        todoContainer.appendChild(todoElement);
    });
}

export { renderProjects, renderTodos };