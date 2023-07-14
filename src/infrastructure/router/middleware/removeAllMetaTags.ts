/**
 * Removes all meta tags from the head of the document.
 */
export const removeAllMetaTags = (): void => {
    const { head } = document;

    const metaTags = head.getElementsByTagName('meta') as HTMLCollectionOf<HTMLMetaElement>;

    if (!metaTags) return;

    Array.from(metaTags).forEach((metaTag) => {
        head.removeChild(metaTag);
    });
};
