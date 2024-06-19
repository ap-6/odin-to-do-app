function createTodoItem(title, description, dueDate, priority, notes = '', checklist = []) {
    return {
        title,
        description,
        dueDate,
        priority,
    };
}

function createProjectManager() {
    let projectCounter = 1;

    const projectsFolder = {
        'default': { 
            id: 0,
            todos: [],
        },
    }

    return {
        getProjectsFolder() {
            return projectsFolder;
        },

        addProject(name) {
            if(!projectsFolder[name]) {
                projectsFolder[name] = {
                    id: projectCounter,
                    todos: []
                };
                projectCounter++;
            }
        },

        addTodoToProject(projectName, todo) {
            if(projectsFolder[projectName]) {
                projectsFolder[projectName].todos.push(todo);
            }
        },

        getTodos(projectName) {
            if (projectsFolder[projectName]) {
                return projectsFolder[projectName].todos;
            }
        }
    }
}

export { createProjectManager, createTodoItem }