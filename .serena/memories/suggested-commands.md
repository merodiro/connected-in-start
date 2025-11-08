# Suggested Commands for Development

## Essential Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm typecheck        # Check TypeScript types
pnpm check            # Format + lint (run after changes)
```

## Database Commands

```bash
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```

## Testing

```bash
pnpm test             # Run all tests
pnpm test <filename>  # Run specific test file
```

## Shadcn Commands

```bash
pnpm dlx shadcn@latest add <component>  # Add shadcn component
pnpm dlx shadcn@latest view @shadcn      # View available components
```

## Git Commands

```bash
git status           # Check git status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
```

## Always Run After Making Changes

1. `pnpm typecheck` - Ensure TypeScript is valid
2. `pnpm check` - Format and lint code
