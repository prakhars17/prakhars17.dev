Look at the currently staged changes (`git diff --staged`) and create a conventional commit.

Steps:
1. Run `git diff --staged` to review what is staged.
2. If nothing is staged, stop and tell the user to stage the files they want to commit.
3. Draft a commit message following the Conventional Commits format: `<type>(<optional scope>): <description>`. Valid types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, `build`. Keep the description short (under 72 chars), lowercase, no trailing period.
4. Commit directly with `git commit -m "<message>"`. Do NOT use `--no-verify`.
