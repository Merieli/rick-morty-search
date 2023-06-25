export const removeAllMetaTags = () => {
    const { head } = document;

    const metaTags = head.getElementsByTagName('meta');

    for (let index = metaTags.length - 1; index >= 0; index--) {
        head.removeChild(metaTags[index]);
    }
};
