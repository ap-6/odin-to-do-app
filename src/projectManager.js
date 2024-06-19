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

        addTodoToProject(project, todo) {
            if(project) {
                projectsFolder[project].push(todo);
            }
        },

        getTodos(project) {
            return projectsFolder[project] ? projectsFolder[project] : [];
        }
    }
}

export { createProjectManager, createTodoItem }