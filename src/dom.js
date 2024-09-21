import deleteIcon from './assets/trash-can-outline.svg';
import plusIcon from './assets/plus_white.png';
import deleteProjectIcon from './assets/close-thick-white.png';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const projectsContainer = document.getElementById('projects-container');
const todoContainer = document.getElementById('todo-container');
const todoContainerHeader = document.getElementById('todo-container-header');

function renderProjects(projectManager) {
    //refresh sidebar's project listing
    while (projectsContainer.firstChild) {
        projectsContainer.removeChild(projectsContainer.firstChild);
    }
    let projectsFolder = projectManager.getProjectsFolder();

    //create element for each project
    Object.keys(projectsFolder).forEach(projectName => {
        const projectElementContainer = document.createElement('span');
        
        const projectElementText = document.createElement('span');
        
        //project name
        projectElementText.textContent = projectName;
        
        projectElementContainer.addEventListener('click', () => {
            renderTodos(projectName, projectManager);
        });

        //delete button
        const projectDeleteBtn = document.createElement('button');
        const projectDeleteIcon = document.createElement('img');
        projectDeleteIcon.classList.add('project-btn-icon');
        projectDeleteBtn.classList.add('project-btn');
        projectDeleteBtn.appendChild(projectDeleteIcon);
        projectDeleteIcon.src = deleteProjectIcon;
        projectDeleteIcon.alt = 'Delete button';

        projectDeleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            projectManager.deleteProject(projectName);
            renderProjects(projectManager);
            
            if(todoContainerHeader.textContent === projectName) {
                clearTodos();
            }
        });

        //style
        projectElementText.classList.add('text-medium');
        projectElementContainer.classList.add('project-name-container');
        
        //append children
        projectElementContainer.appendChild(projectElementText);
        projectElementContainer.appendChild(projectDeleteBtn);

        projectsContainer.appendChild(projectElementContainer);
    });

    //append "Add project" option
    const newProjectContainer = document.createElement('btn');
    const newProjectText = document.createElement('span');
    const newProjectIcon = document.createElement('img');

    newProjectIcon.src = plusIcon;
    newProjectIcon.alt = 'Plus symbol';
    newProjectIcon.classList.add('project-btn-icon');
    
    newProjectText.textContent = 'Add project';
    
    newProjectContainer.classList.add('add-project-container');
    newProjectContainer.classList.add('new-project-btn');
    newProjectText.classList.add('text-medium');
    
    newProjectContainer.appendChild(newProjectIcon);
    newProjectContainer.appendChild(newProjectText);
    projectsContainer.appendChild(newProjectContainer);
}

function clearTodos() {
    //empty current listing of to-dos
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }
    todoContainerHeader.textContent = '';
}

function renderTodos(projectName, projectManager) {
    //empty current listing of to-dos
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }
    todoContainerHeader.textContent = projectName;

    let projectsFolder = projectManager.getProjectsFolder();

    //create a container for each to-do and append
    projectsFolder[projectName].todos.forEach(todoObj => {
        const todoElement = document.createElement('div');
        const todoElementDetails = document.createElement('span');
        const todoElementButtons = document.createElement('span');
        
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

        todoElementDetails.appendChild(title);
        todoElementDetails.appendChild(description);
        todoElementDetails.appendChild(dueDate);
        addTodoDetailBtn(todoElementButtons, todoObj);
        addTodoDeleteBtn(todoElementButtons, todoObj, projectManager, projectName);
        todoElement.classList.add('todo-element');
        todoElement.classList.add('text-small');
        todoElementButtons.classList.add('todo-buttons-column')
        todoElement.appendChild(todoElementDetails);
        todoElement.appendChild(todoElementButtons);

        todoContainer.appendChild(todoElement);
    });
}

function addTodoDeleteBtnOLD(todoElement, todoObj, projectManager, projectName) {
    const deleteBtn = document.createElement('btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('details-btn');
    
    const deleteIconWrapper = document.createElement('div');
    const deleteIconElement = document.createElement('img');
    deleteIconElement.src = deleteIcon;
    deleteIconElement.classList.add('todo-delete-icon');
    deleteIconWrapper.classList.add('todo-delete-icon-wrapper');

    deleteIconWrapper.addEventListener('click', () => {
        projectManager.deleteTodoFromProject(projectName, todoObj.todoId);
        renderTodos(projectName, projectManager);
    });
    deleteIconWrapper.addEventListener('mouseover', () => {
        deleteIconElement.classList.add('todo-delete-icon-hover');
    })
    deleteIconWrapper.addEventListener('mouseout', () => {
        deleteIconElement.classList.remove('todo-delete-icon-hover');
    })

    deleteIconWrapper.appendChild(deleteIconElement);
    todoElement.appendChild(deleteIconWrapper);
}

function addTodoDeleteBtn(todoElement, todoObj, projectManager, projectName) {
    const deleteBtn = document.createElement('btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('details-btn');

    deleteBtn.addEventListener('click', () => {
        projectManager.deleteTodoFromProject(projectName, todoObj.todoId);
        renderTodos(projectName, projectManager);
    });

    todoElement.appendChild(deleteBtn);
}

function showModal(todoObj) {
    const modal = document.getElementById("todo-modal");
    document.getElementById("modal-title").textContent = todoObj.title;
    document.getElementById("modal-description").textContent = todoObj.description;
    document.getElementById("modal-due-date").textContent = todoObj.dueDate;
    document.getElementById("modal-priority").textContent = todoObj.priority;
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