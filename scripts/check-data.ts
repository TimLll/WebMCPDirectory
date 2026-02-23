import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ToolsConfig, Category, Tool, WebMCPSitesConfig, WebMCPSite } from '../src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationIssues {
    missing_url: string[];
    missing_protocol: string[];
    missing_ref: string[];
    missing_slug: string[];
    out_of_order: string[];
    invalid_structure: string[];
    webmcp_invalid: string[];
}

const issues: ValidationIssues = {
    missing_url: [],
    missing_protocol: [],
    missing_ref: [],
    missing_slug: [],
    out_of_order: [],
    invalid_structure: [],
    webmcp_invalid: []
};

let totalTools = 0;
let totalSplitTools = 0;

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const splitDataDir = path.join(__dirname, '../src/data/tools');
const webmcpSitesPath = path.join(__dirname, '../src/data/webmcp-sites.json');

function validateWebMCPSite(site: WebMCPSite, index: number) {
    const identifier = `${site.name || `site#${index + 1}`} (webmcp-sites.json)`;

    if (!site.name) {
        issues.webmcp_invalid.push(`${identifier} - missing name`);
    }

    if (!site.url) {
        issues.webmcp_invalid.push(`${identifier} - missing url`);
    } else if (!site.url.startsWith('http://') && !site.url.startsWith('https://')) {
        issues.webmcp_invalid.push(`${identifier} - url missing protocol`);
    }

    if (!Array.isArray(site.categories) || site.categories.length === 0) {
        issues.webmcp_invalid.push(`${identifier} - categories must be a non-empty array`);
    }

    if (!Array.isArray(site.tags)) {
        issues.webmcp_invalid.push(`${identifier} - tags must be an array`);
    }

    if (!site.webmcp) {
        issues.webmcp_invalid.push(`${identifier} - missing webmcp object`);
        return;
    }

    const validTypes = new Set(['declarative', 'imperative', 'mixed', 'unknown']);
    const validStatuses = new Set(['confirmed', 'self-reported', 'suspected']);

    if (!validTypes.has(site.webmcp.type)) {
        issues.webmcp_invalid.push(`${identifier} - invalid webmcp.type: ${site.webmcp.type}`);
    }

    if (!validStatuses.has(site.webmcp.status)) {
        issues.webmcp_invalid.push(`${identifier} - invalid webmcp.status: ${site.webmcp.status}`);
    }

    if (!Array.isArray(site.webmcp.evidence) || site.webmcp.evidence.length === 0) {
        issues.webmcp_invalid.push(`${identifier} - webmcp.evidence must be a non-empty array`);
    }
}

function validateTool(tool: Tool, source: string) {
    const identifier = `${tool.title} (${source})`;

    if (!tool.url) {
        issues.missing_url.push(identifier);
    } else {
        if (!tool.url.startsWith('http://') && !tool.url.startsWith('https://')) {
            issues.missing_protocol.push(identifier);
        }
        try {
            const url = new URL(tool.url);
            if (url.searchParams.get('ref') !== 'riseofmachine.com') {
                issues.missing_ref.push(identifier);
            }
        } catch (e) {
            // If URL is invalid, it will already be caught by protocol check or be flagged here
            issues.missing_ref.push(`${identifier} (Invalid URL)`);
        }
    }

    if (!tool.slug) {
        issues.missing_slug.push(identifier);
    }
}

try {
    // 1. Check monolithic tools.json
    console.log("Checking tools.json...");
    const data: ToolsConfig = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    data.tools.forEach((category: Category) => {
        let lastTool: Tool | null = null;
        category.content.forEach((tool: Tool) => {
            totalTools++;
            validateTool(tool, "tools.json");

            if (lastTool && tool.title.localeCompare(lastTool.title) < 0) {
                issues.out_of_order.push(`${tool.title} (should be before ${lastTool.title}) in category ${category.category}`);
            }
            lastTool = tool;
        });
    });

    // 2. Check split files
    if (fs.existsSync(splitDataDir)) {
        console.log("Checking split category files...");
        const files = fs.readdirSync(splitDataDir).filter(f => f.endsWith('.json'));

        files.forEach(file => {
            const filePath = path.join(splitDataDir, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            if (!Array.isArray(content)) {
                issues.invalid_structure.push(`File: ${file} - Expected Array, got ${typeof content}`);
                return;
            }

            const tools: Tool[] = content;
            let lastTool: Tool | null = null;
            tools.forEach(tool => {
                totalSplitTools++;
                validateTool(tool, file);

                if (lastTool && tool.title.localeCompare(lastTool.title) < 0) {
                    issues.out_of_order.push(`${tool.title} (should be before ${lastTool.title}) in split file ${file}`);
                }
                lastTool = tool;
            });
        });
    }

    // 3. Check WebMCP seed dataset
    if (fs.existsSync(webmcpSitesPath)) {
        console.log("Checking webmcp-sites.json...");
        const webmcpData: WebMCPSitesConfig = JSON.parse(fs.readFileSync(webmcpSitesPath, 'utf-8'));

        if (!Array.isArray(webmcpData.sites)) {
            issues.invalid_structure.push('File: webmcp-sites.json - Expected { sites: [] } structure');
        } else {
            webmcpData.sites.forEach((site, index) => validateWebMCPSite(site, index));
        }
    }

    // --- Reporting ---
    console.log(`\nReport Summary:`);
    console.log(`Total tools processed: ${totalTools} (+ ${totalSplitTools} split)`);
    console.log(`Issues found: ${Object.values(issues).flat().length}`);

    if (issues.missing_url.length > 0) {
        console.log("\n❌ Missing URLs:");
        issues.missing_url.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.missing_protocol.length > 0) {
        console.log("\n❌ Missing Protocol (http/https):");
        issues.missing_protocol.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.missing_ref.length > 0) {
        console.log("\n❌ Missing ref parameter (?ref=riseofmachine.com):");
        issues.missing_ref.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.missing_slug.length > 0) {
        console.log("\n❌ Missing Slugs:");
        issues.missing_slug.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.out_of_order.length > 0) {
        console.log("\n❌ Alphabetical Order Issues:");
        issues.out_of_order.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.invalid_structure.length > 0) {
        console.log("\n❌ Invalid JSON Structure (Split Files):");
        issues.invalid_structure.forEach(i => console.log(`   - ${i}`));
    }

    if (issues.webmcp_invalid.length > 0) {
        console.log("\n❌ Invalid WebMCP Dataset Entries:");
        issues.webmcp_invalid.forEach(i => console.log(`   - ${i}`));
    }

    const issueCount = Object.values(issues).flat().length;
    if (issueCount === 0) {
        console.log("\n✅ Data check passed! No issues found.");
    } else {
        process.exit(1);
    }

} catch (error: any) {
    console.error('❌ Error checking data:', error.message);
    process.exit(1);
}
