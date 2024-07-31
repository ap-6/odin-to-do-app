import './normalize.css';
import './style.css';
import { createProjectManager, createTodoItem } from './projectManager';
import { renderProjects, renderTodos } from './dom';

let projectManager = createProjectManager();
projectManager.addProject('work');
projectManager.addProject('personal');

//example to-dos
const todo1 = createTodoItem('finish Todo app', 'practicing SOLID principles', 'whenever', 'high');
const todo2 = createTodoItem('drink water', 'staying hydrated', '7:00pm', 'medium');
const todo3 = createTodoItem('eat food', 'gaining weight', '5:00pm', 'low');
const todo4 = createTodoItem('programming', 'practicing SOLID principles', 'whenever', 'low');
const todo5 = createTodoItem('drink gatorade', 'staying hydrated', '7:00pm', 'medium');
const todo6 = createTodoItem('eat apple', 'gaining weight', '5:00pm', 'high');

//add examples
projectManager.addTodoToProject('work', todo1);
projectManager.addTodoToProject('personal', todo2);
projectManager.addTodoToProject('personal', todo3);
projectManager.addTodoToProject('default', todo4);
projectManager.addTodoToProject('default', todo5);
projectManager.addTodoToProject('default', todo6);

renderProjects(projectManager);
renderTodos('default', projectManager);