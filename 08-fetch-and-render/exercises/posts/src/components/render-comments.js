/**
 * Document!
 * 
 * 
 */

export const renderComment = (comment = {}) => {
    const container = document.createElement('div');
    container.id = 'comment-' + comment.id;
    container.className = 'comment';

    const titleEl = document.createElement('h2');
    titleEl.innerHTML = comment.name;
    container.appendChild(titleEl);

    const author = document.createElement('code');
    author.innerHTML = 'comment by: ' + comment.email;
    container.appendChild(author);

    const commentBody = document.createElement('p');
    commentBody.innerHTML = comment.body;
    container.appendChild(commentBody);

    return container;
};