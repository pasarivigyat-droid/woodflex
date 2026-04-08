import { useEffect } from 'react';

/**
 * Hook to preload images in the browser cache.
 * @param urls Array of image URLs to preload
 */
export function useImagePreload(urls: string[]) {
    useEffect(() => {
        if (!urls || urls.length === 0) return;

        urls.forEach(url => {
            if (!url) return;
            const img = new Image();
            img.src = url;
        });
    }, [urls]);
}
