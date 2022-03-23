import { renderTodos } from "./render-todos.js";

/**
 *
 *
 *
 */

export const renderUser = (user = {}, todos = {}) => {
    const container = document.createElement('div');
    container.id = `user-${user.id}`;

    const titleEl = document.createElement('h1');
    titleEl.innerHTML = user.username;
    container.appendChild(titleEl);

    const name = document.createElement('p');
    name.innerHTML = 'name: ' + user.name;
    container.appendChild(name);

    const email = document.createElement('p');
    email.innerHTML = 'email: ' + user.email;
    container.appendChild(email);

    const website = document.createElement('p');
    website.innerHTML = 'website: ';
    const linkToWebsite = document.createElement('a');
    linkToWebsite.href = `http://${user.website}`;
    linkToWebsite.innerHTML = `${user.website}`;
    website.appendChild(linkToWebsite);
    container.appendChild(website);

    const renderedTodos = todos.map(renderTodos).reduce((all, next) => {
        all.appendChild(next);
        return all;
    }, document.createElement('div'));
    container.appendChild(renderedTodos);

    return container;
};
