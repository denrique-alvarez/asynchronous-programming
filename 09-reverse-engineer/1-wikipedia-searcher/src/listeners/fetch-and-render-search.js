import { search } from '../handlers/search.js';

export const fetchAndRenderSearch = (id = '') => {
    document.getElementById(id).addEventListener('click', search);
};
