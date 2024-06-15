function createTodoItem(title, description, dueDate, priority, notes = '', checklist = []) {
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
    };
}

function createProjectManager() {
    const projectsFolder = {
        'default': [],
    }

    return {
        getProjectsFolder() {
            return projectsFolder;
        },

        addProject(name) {
            if(!projectsFolder[name]) {
                projectsFolder[name] = [];
            }
        },

        addTodo(project, todo) {
            if(project) {
                projectsFolder[project].push(todo);
            }
        },

        getTodos(project) {
            return projectsFolder[project] ? projectsFolder[project] : [];
        }
    }
}