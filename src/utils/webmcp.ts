import webmcpData from '../data/webmcp-sites.json';
import type { WebMCPSite } from '../types';

export const WEBMCP_CATEGORY_LABELS: Record<string, string> = {
    travel: 'Travel',
    ecommerce: 'E-Commerce',
    productivity: 'Productivity',
    'developer-tools': 'Developer Tools',
    demos: 'Demos',
    media: 'Media',
    finance: 'Finance',
    other: 'Other',
};

const ORDERED_WEBMCP_CATEGORIES = Object.keys(WEBMCP_CATEGORY_LABELS);

export function getWebMCPSites(): WebMCPSite[] {
    return ((webmcpData as { sites?: WebMCPSite[] }).sites || []).slice();
}

export function getWebMCPCategoryTitle(category: string): string {
    return WEBMCP_CATEGORY_LABELS[category] || category;
}

export function getWebMCPCategories(): string[] {
    const categories = new Set<string>();
    getWebMCPSites().forEach((site) => {
        site.categories.forEach((category) => categories.add(category));
    });

    const orderedKnown = ORDERED_WEBMCP_CATEGORIES.filter((category) => categories.has(category));
    const additional = Array.from(categories)
        .filter((category) => !ORDERED_WEBMCP_CATEGORIES.includes(category))
        .sort((a, b) => a.localeCompare(b));

    return [...orderedKnown, ...additional];
}