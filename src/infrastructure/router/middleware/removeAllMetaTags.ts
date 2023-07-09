export const removeAllMetaTags = () => {
    const { head } = document;

    const metaTags = head.getElementsByTagName('meta') as HTMLCollectionOf<HTMLMetaElement>;

    if (!metaTags) return;

    Array.from(metaTags).forEach((metaTag) => {
        head.removeChild(metaTag);
    });
};
