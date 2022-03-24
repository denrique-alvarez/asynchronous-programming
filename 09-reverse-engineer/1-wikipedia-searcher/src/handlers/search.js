import { wikiResource } from '../api-calls/wiki-resource.js';

import { renderResults } from '../components/render-results.js';

export const search = async () => {
    const output = document.getElementById('output');

    const searchBox = document.getElementById('search-box');
    const searchInput = searchBox.children[0].value;
    if (searchInput === '') {
        output.innerHTML = 'Input field empty!'
        return
    }
    const searchTerm = searchInput.split(' ').join('%20');

    try {
        const resultsPromise = wikiResource(searchTerm);
        const results = await Promise.all([resultsPromise]);
        const resultsArr = results[0].query.search;
        
        for (const res of resultsArr) {
            const result = renderResults(res);
            output.appendChild(result);
        }

    } catch (err) {
        console.error(err);

        const errorElement = err.message.includes('HTTP error! status: 404')
            ? "OWW shit! API isn't working"
            : "Please, try again";

        output.innerHTML = errorElement;
    }
};
