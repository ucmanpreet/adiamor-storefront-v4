import * as fs from 'fs';
import * as path from 'path';
import type { AxeResults, Result } from 'axe-core';

const REPORTS_DIR = path.join(process.cwd(), 'tests', 'a11y', 'reports');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(str: string) {
  return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function saveAxeReport(pageLabel: string, results: AxeResults) {
  ensureDir(REPORTS_DIR);
  const slug = slugify(pageLabel);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const jsonPath = path.join(REPORTS_DIR, `${slug}-${timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');

  const mdPath = path.join(REPORTS_DIR, `${slug}-${timestamp}.md`);
  const violations = results.violations;
  const lines: string[] = [
    `# WCAG 2.2 AA Audit — ${pageLabel}`,
    `**URL:** ${results.url}`,
    `**Tested:** ${results.timestamp}`,
    `**Violations:** ${violations.length}`,
    '',
  ];

  if (violations.length === 0) {
    lines.push('No violations found. ✅');
  } else {
    violations.forEach((v: Result, i: number) => {
      lines.push(`## ${i + 1}. [${v.impact?.toUpperCase()}] ${v.id}`);
      lines.push(`**Description:** ${v.description}`);
      lines.push(`**Help:** ${v.helpUrl}`);
      lines.push(`**Affected nodes (${v.nodes.length}):**`);
      v.nodes.slice(0, 5).forEach(n => {
        lines.push(`- \`${n.html.slice(0, 120)}\``);
        lines.push(`  - Failure: ${n.failureSummary?.split('\n')[0] ?? ''}`);
      });
      if (v.nodes.length > 5) lines.push(`  *(+${v.nodes.length - 5} more nodes)*`);
      lines.push('');
    });
  }

  fs.writeFileSync(mdPath, lines.join('\n'), 'utf8');
  return { jsonPath, mdPath, violationCount: violations.length };
}
