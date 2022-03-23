import { renderComment } from "./render-comments.js";

/**
 * 
 * 
 * 
 */

export const renderPost = (post = {}, comment = {}) => {
    const container = document.createElement('div');
    container.id = `post-${post.id}-${post.title.split('').join('-')}`;

    const titleEl = document.createElement('h2');
    titleEl.innerHTML = post.title;
    container.appendChild(titleEl);

    const author = document.createElement('code');
    author.innerHTML = 'posted by user: ' + post.userId;
    container.appendChild(author);

    const postBody = document.createElement('p');
    postBody.innerHTML = post.body;
    container.appendChild(postBody);

    const renderedComments = comment.map(renderComment).reduce((all, next) => {
        all.appendChild(next);
        return all;
    }, document.createElement('div'));
    container.appendChild(renderedComments);

    return container;
};