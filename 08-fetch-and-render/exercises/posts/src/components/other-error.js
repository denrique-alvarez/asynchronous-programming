/**
 *
 */
export const otherError = (id = 1) => {
    const pre = document.createElement('pre');
    pre.innerHTML = `oops! something went wrong fetching the post with id ${id}, try again?`;
    return pre;
};
