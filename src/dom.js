import deleteIcon from './assets/trash-can-outline-white.png';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const projectsContainer = document.getElementById('projects-container');
const todoContainer = document.getElementById('todo-container');
const todoContainerHeader = document.getElementById('todo-container-header');

function renderProjects(projectManager) {
    while (projectsContainer.firstChild) {
        projectsContainer.removeChild(projectsContainer.firstChild);
    }
    let projectsFolder = projectManager.getProjectsFolder();

    Object.keys(projectsFolder).forEach(projectName => {
        const projectElement = document.createElement('div');
        projectElement.textContent = projectName;

        projectElement.addEventListener('click', () => {
            renderTodos(projectName, projectManager);
        })

        projectElement.classList.add('project-name');

        projectsContainer.appendChild(projectElement);
    })
}

function renderTodos(projectName, projectManager) {
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }
    todoContainerHeader.textContent = projectName;

    let projectsFolder = projectManager.getProjectsFolder();

    projectsFolder[projectName].todos.forEach(todoObj => {
        const todoElement = document.createElement('div');
        
        const title = document.createElement('h2');
        title.textContent = todoObj.title;
        title.classList.add('todo-title');
        
        const description = document.createElement('div');
        description.textContent = todoObj.description;
        
        const dueDate = document.createElement('div');
        dueDate.textContent = 'Due: ' + todoObj.dueDate;

        switch(todoObj.priority) {
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

        todoElement.appendChild(title);
        todoElement.appendChild(description);
        todoElement.appendChild(dueDate);
        addTodoDetailBtn(todoElement, todoObj);
        addTodoDeleteBtn(todoElement, todoObj, projectManager);

        todoElement.classList.add('todo-element');

        todoContainer.appendChild(todoElement);


    });
}

function addTodoDeleteBtn(todoElement, todoObj, projectManager) {
    const deleteIconElement = document.createElement('img');
    deleteIconElement.src = deleteIcon;
    deleteIconElement.classList.add('todo-card-icon');

    deleteIconElement.addEventListener('click', () => {
        projectManager.deleteTodoFromProject(projectName, todoObj.todoId);
        renderTodos(projectName, projectManager);
    });

    todoElement.appendChild(deleteIconElement);
}

function showModal(todoObj) {
    const modal = document.getElementById("todo-modal");
    document.getElementById("modal-title").textContent = todoObj.title;
    document.getElementById("modal-description").textContent = todoObj.description;
    document.getElementById("modal-dueDate").textContent = "Due Date: " + todoObj.dueDate;
    document.getElementById("modal-priority").textContent = "Priority: " + todoObj.priority;
    modal.style.display = "block";

    const closeModal = () => {
        modal.style.display = "none";
    };

    document.getElementsByClassName("close")[0].onclick = closeModal;
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
}

function addTodoDetailBtn(todoElement, todoObj) {
    const detailsBtn = document.createElement('btn');
    detailsBtn.textContent = 'Details';
    detailsBtn.classList.add('details-btn');

    detailsBtn.addEventListener('click', () => showModal(todoObj));
    todoElement.appendChild(detailsBtn);
}


export { renderProjects, renderTodos };