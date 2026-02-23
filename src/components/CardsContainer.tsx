import { useMemo, useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import Card from './Card';
import EmptyState, { SearchIcon } from './EmptyState';
import './CardsContainer.css';
import type { Tool, WebMCPSite } from '../types';
import { toolComparators, seededShuffle, type SortKey } from '../utils/sorting';
import { isRecentlyAdded } from '../utils/dates';
import { getWebMCPSites } from '../utils/webmcp';

const ITEMS_PER_PAGE = 32;

interface ToolWithCategory extends Tool {
    category: string;
    tags: string[];
    categories: string[];
}

const fuseOptions = {
    keys: [
        { name: 'title', weight: 0.4 },
        { name: 'body', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true
};

interface CardsContainerProps {
    filter: string;
    sort?: SortKey;
    randomSeed?: number;
    searchQuery?: string;
    filterNew?: boolean;
}

export default function CardsContainer({
    filter,
    sort = 'nameAsc',
    randomSeed = 0,
    searchQuery = '',
    filterNew = false,
}: CardsContainerProps) {
    const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem('toolsState');
            if (raw) {
                const state = JSON.parse(raw);
                if (state && state.filter === filter) {
                    if (state.displayedCount && state.displayedCount > displayedCount) {
                        setDisplayedCount(state.displayedCount);
                    }
                    setTimeout(() => {
                        if (typeof window !== 'undefined' && typeof state.scrollY !== 'undefined') {
                            window.scrollTo(0, state.scrollY);
                        }
                    }, 50);
                }
                sessionStorage.removeItem('toolsState');
            }
        } catch (err) { }
    }, []);

    const allFlatTools = useMemo((): ToolWithCategory[] => {
        return getWebMCPSites().map((site: WebMCPSite) => {
            const primaryCategory = site.categories[0] || 'other';
            return {
                title: site.name,
                body: `WebMCP: ${site.webmcp.type} · ${site.webmcp.status}`,
                url: site.url,
                tag: site.tags[0] || site.webmcp.type,
                'date-added': '',
                category: primaryCategory,
                categories: site.categories,
                tags: site.tags,
            };
        });
    }, []);

    const fuse = useMemo(() => {
        return new Fuse(allFlatTools, fuseOptions);
    }, [allFlatTools]);

    const filteredCards = useMemo((): ToolWithCategory[] => {
        let base: ToolWithCategory[];

        if (searchQuery && searchQuery.length >= 2) {
            const results = fuse.search(searchQuery);
            base = results.map(result => result.item);
            if (filter !== 'all') {
                base = base.filter(tool => tool.categories.includes(filter));
            }
        } else {
            base = filter === 'all'
                ? allFlatTools
                : allFlatTools.filter((tool) => tool.categories.includes(filter));
        }

        // Filter for new tools (added within last 30 days)
        if (filterNew) {
            base = base.filter((tool) => !!tool['date-added'] && isRecentlyAdded(tool['date-added'], 30));
        }

        if (sort === 'random') {
            // Use provided seed for deterministic shuffling, fallback to stable default
            // If truly random ordering per session is needed, pass Date.now() as randomSeed from parent
            const DEFAULT_SEED = 42;
            return seededShuffle(base, randomSeed || DEFAULT_SEED);
        } else {
            const comparator = toolComparators[sort] || toolComparators.nameAsc;
            return [...base].sort(comparator);
        }
    }, [filter, sort, randomSeed, searchQuery, filterNew, fuse]);

    useEffect(() => {
        setDisplayedCount(ITEMS_PER_PAGE);
    }, [filter, searchQuery, filterNew]);

    useEffect(() => {
        const handleSaveState = () => {
            try {
                const state = {
                    filter,
                    displayedCount,
                    scrollY: typeof window !== 'undefined' ? window.scrollY || window.pageYOffset : 0,
                };
                sessionStorage.setItem('toolsState', JSON.stringify(state));
            } catch (err) { }
        };

        window.addEventListener('tools:save-state', handleSaveState);
        return () => window.removeEventListener('tools:save-state', handleSaveState);
    }, [displayedCount, filter]);

    useEffect(() => {
        const tryRestore = () => {
            try {
                const raw = sessionStorage.getItem('toolsState');
                if (!raw) return;
                const state = JSON.parse(raw);
                if (state && state.filter === filter) {
                    if (state.displayedCount && state.displayedCount > displayedCount) {
                        setDisplayedCount(state.displayedCount);
                    }
                    setTimeout(() => {
                        if (typeof window !== 'undefined' && typeof state.scrollY !== 'undefined') {
                            window.scrollTo(0, state.scrollY);
                        }
                    }, 50);
                }
                sessionStorage.removeItem('toolsState');
            } catch (err) { }
        };

        window.addEventListener('pageshow', tryRestore);
        window.addEventListener('astro:page-load', tryRestore);
        return () => {
            window.removeEventListener('pageshow', tryRestore);
            window.removeEventListener('astro:page-load', tryRestore);
        };
    }, [filter]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
            if (entries[0]?.isIntersecting && !isLoading && displayedCount < filteredCards.length) {
                    setIsLoading(true);
                    setTimeout(() => {
                        setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredCards.length));
                        setIsLoading(false);
                    }, 300);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [displayedCount, isLoading, filteredCards.length]);

    const displayedCards = filteredCards.slice(0, displayedCount);

    // Check if searching with no results in a specific category
    const isSearchingInCategory = searchQuery && searchQuery.length >= 2 && filter !== 'all';
    const hasNoSearchResults = isSearchingInCategory && filteredCards.length === 0;

    if (hasNoSearchResults) {
        return (
            <section>
                <EmptyState
                    icon={<SearchIcon />}
                    message={`No results found for "${searchQuery}" in this category.`}
                    actionText="Search All Websites"
                    actionHref="/"
                />
            </section>
        );
    }

    return (
        <section>
            <ul role="list" className="link-card-grid">
                {displayedCards.map(({ url, title, body, tag, 'date-added': dateAdded, slug, category }, i) => (
                    <Card
                        key={`${title}-${i}`}
                        href={url}
                        title={title}
                        body={body}
                        tag={tag}
                        dateAdded={dateAdded}
                        slug={slug}
                        category={category}
                    />
                ))}
            </ul>

            {displayedCount < filteredCards.length && (
                <div ref={loaderRef} className="infinite-scroll-loader">
                    {isLoading && (
                        <p className="loading-text">Loading more...</p>
                    )}
                </div>
            )}
        </section>
    );
}
