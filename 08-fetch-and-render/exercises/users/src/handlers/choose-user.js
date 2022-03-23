import { typicodeResource } from '../api-calls/typicode-resource.js';

import { renderUser } from '../components/render-user.js';
import { fourOhFour } from '../components/four-oh-four.js';
import { otherError } from '../components/other-error.js';

export const chooseUser = async (event) => {
    const userId = event.target.form.userId.value;

    const root = document.getElementById('root');
    root.innerHTML = '';

    try {
        const userPromise = typicodeResource('users', userId);
        const todosPromise = typicodeResource('users', userId, 'todos');

        const [user, todos] = await Promise.all([userPromise, todosPromise]);

        const userEl = renderUser(user, todos);

        root.appendChild(userEl);

    } catch (err) {
        console.error(err);

        const errorElement = err.message.includes('HTTP error! status: 404')
            ? fourOhFour(userId)
            : otherError(userId);

        root.appendChild(errorElement);
    }
};