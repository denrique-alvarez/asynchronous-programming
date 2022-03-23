import { choosePost } from '../handlers/choose-post.js';

export const fetchAndRenderPosts = (id = '') => {
    document.getElementById(id).addEventListener('click', choosePost);
};
