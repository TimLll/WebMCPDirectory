export interface Tool {
    title: string;
    body: string;
    tag?: string;
    url: string;
    "date-added": string;
    slug?: string;
}

export interface Category {
    category: string;
    title: string;
    content: Tool[];
}

export interface ToolsConfig {
    tools: Category[];
}

export type WebMCPType = 'declarative' | 'imperative' | 'mixed' | 'unknown';

export type WebMCPStatus = 'confirmed' | 'self-reported' | 'suspected';

export interface WebMCPInfo {
    type: WebMCPType;
    status: WebMCPStatus;
    evidence: string[];
}

export interface WebMCPSite {
    name: string;
    url: string;
    categories: string[];
    tags: string[];
    webmcp: WebMCPInfo;
}

export interface WebMCPSitesConfig {
    sites: WebMCPSite[];
}

export interface MetadataEntry {
    slug: string;
    title?: string | undefined;
    description?: string | undefined;
    ogImage?: string | undefined;
    twitterHandle?: string | undefined;
    githubUrl?: string | undefined;
}

export type MetadataMap = Record<string, MetadataEntry>;

export type SlugMap = Record<string, string[]>;
