/**
 * Document!
 *
 *
 */

export const renderTodos = (todo = {}) => {
    const container = document.createElement('div');
    container.id = 'todos';

    const todoContainer = document.createElement('div');
    todoContainer.id = `todo-${todo.id}`;
    todoContainer.className = 'todo';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    if (todo.completed) {
        checkBox.checked = true;
    }
    todoContainer.appendChild(checkBox);

    const todoText = document.createElement('code');
    todoText.innerHTML = `${todo.title}`;
    todoContainer.appendChild(todoText);

    container.appendChild(todoContainer);

    return container;
};
