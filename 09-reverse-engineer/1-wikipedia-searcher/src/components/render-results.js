/**
 * 
 * 
 */

export const renderResults = (result = {}) => {

    const resultContainer = document.createElement('div');
    resultContainer.className = 'row';

    const title = document.createElement('h3');
    title.innerHTML = `<a href='https://en.wikipedia.org/wiki/${result.title}'>${result.title}</a>`;
    resultContainer.appendChild(title);

    const bodyText = document.createElement('p');
    bodyText.innerHTML = result.snippet;
    resultContainer.appendChild(bodyText);

    const articleLink = document.createElement('a');
    articleLink.href = `https://en.wikipedia.org/wiki/${result.title}`;
    const articleButton = document.createElement('button');
    articleButton.innerHTML = 'View Full Article';
    articleLink.appendChild(articleButton);

    resultContainer.appendChild(articleLink);

    return resultContainer;
};