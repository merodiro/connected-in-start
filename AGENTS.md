# Agent Guidelines for Connected-in-Start

## Commands

- **Build**: `pnpm build`
- **Dev**: `pnpm dev` (runs on port 3000)
- **Test**: `pnpm test` (uses Vitest)
- **Single test**: `pnpm test <filename>` (e.g., `pnpm test button.test.tsx`)
- **Lint**: `pnpm lint` (uses TanStack ESLint config)
- **Format**: `pnpm format` (uses Prettier)
- **Type check**: `pnpm typecheck`
- **Full check**: `pnpm check` (formats + lints)

## Code Style

- **Imports**: Use `@/*` path aliases for src imports
- **Formatting**: No semicolons, single quotes, trailing commas
- **Components**: PascalCase, export functions and types separately
- **Types**: Use `interface` for object shapes, `type` for unions/utilities
- **DB**: Drizzle ORM with PostgreSQL, schema in `src/db/schema`
- **Env**: Use `@t3-oss/env-core` with Zod validation
- **UI**: shadcn/ui components with Radix UI + Tailwind CSS, use `cn()` utility for classes
- **Error handling**: Use Zod for validation, proper TypeScript types
- **File naming**: kebab-case for files, PascalCase for components

## Tool Usage

- Use Serena tools extensively for code analysis and manipulation
- Prefer `find_symbol` and `find_referencing_symbols` for code navigation
- Use `search_for_pattern` for flexible code searches
- Use `get_symbols_overview` to understand new files quickly
- Use `replace_symbol_body`, `insert_after_symbol`, `insert_before_symbol` for precise edits
- Use `rename_symbol` for refactoring across the codebase
- Use memories for large tasks to track progress and context
- Split large tasks to multiple agents for parallel work
- Use thinking tools (`think_about_collected_information`, `think_about_task_adherence`, `think_about_whether_you_are_done`) to maintain focus
- Use ESLint MCP tool for linting instead of `pnpm lint`
- Use shadcn MCP to add new UI components
- Use `context7` for looking up documentation instead of assuming library behavior
- Use `deepwiki` for GitHub repository documentation and questions
- Use `exa_web_search_exa` and `exa_get_code_context_exa` for web searches and code examples
- Always run `typecheck` after making changes

## Tool Calling

- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE. Here is an example illustrating how to execute 3 parallel file reads in this chat environment:

```json
{
  "recipient_name": "multi_tool_use.parallel",
  "parameters": {
    "tool_uses": [
      {
        "recipient_name": "functions.read",
        "parameters": {
          "filePath": "path/to/file.tsx"
        }
      },
      {
        "recipient_name": "functions.read",
        "parameters": {
          "filePath": "path/to/file.ts"
        }
      },
      {
        "recipient_name": "functions.read",
        "parameters": {
          "filePath": "path/to/file.md"
        }
      }
    ]
  }
}
```
