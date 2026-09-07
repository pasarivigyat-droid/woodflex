const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL;

// Only use CDN if explicitly configured via environment variable
const useCDN = !!CDN_BASE_URL;

export function cdn(path: string) {
    if (!path) return '';
    // If it's already a full URL, return it as is
    if (path.startsWith('http')) return path;

    // Ensure we don't have double slashes if the path starts with one
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const decoded = decodeURIComponent(cleanPath);

    // Use CDN only if VITE_CDN_BASE_URL is set in environment
    // Cloudflare R2 bucket stores asset folders directly at the root (without Catalouge/ prefix)
    if (useCDN) {
        const r2Path = decoded.replace(/^Catalouge\//i, '');
        return `${CDN_BASE_URL}/${encodeURI(r2Path)}`;
    }

    // Default: serve from local/Netlify public folder
    return `/${encodeURI(decoded)}`;
}

