const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const projectsContainer = document.getElementById('projects-container');


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