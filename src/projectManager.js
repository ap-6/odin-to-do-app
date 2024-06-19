let todoCounter = 0;

function createTodoItem(title, description, dueDate, priority, notes = '', checklist = []) {
    return {
        title,
        description,
        dueDate,
        priority,
        todoId: todoCounter++,
    };
}

function createProjectManager() {
    let projectCounter = 1;

    const projectsFolder = {
        'default': { 
            projectId: 0,
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
                    projectId: projectCounter,
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
        },

        deleteTodoFromProject(projectName, todoId) {
            projectsFolder[projectName].todos = projectsFolder[projectName].todos
                                                    .filter(todo => todo.todoId !== todoId);
        }
    }
}

export { createProjectManager, createTodoItem }