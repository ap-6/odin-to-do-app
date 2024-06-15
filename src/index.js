import './normalize.css';
import './style.css';
import { createProjectManager, createTodoItem } from './projectManager';
import { renderProjects, renderTodos } from './dom';

const projectManager = createProjectManager();
projectManager.addProject('work');
projectManager.addProject('personal');

const todo1 = createTodoItem('finish Todo app', 'practicing SOLID principles', 'whenever', 'urgent');
const todo2 = createTodoItem('drink water', 'staying hydrated', '7:00pm', 'no rush');

projectManager.addTodoToProject('work', todo1);
projectManager.addTodoToProject('personal', todo2);

renderProjects(projectManager.getProjectsFolder())