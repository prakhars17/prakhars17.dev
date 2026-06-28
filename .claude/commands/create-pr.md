Create a GitHub pull request from the current branch to a target branch.

Usage: /create-pr [base-branch]

The base branch defaults to `main` if not specified.

Steps:
1. Determine the base branch: use the argument provided, or `main` if none given.
2. Run `git status` to confirm there are no uncommitted staged changes. If there are, stop and tell the user to commit or stash them first.
3. Run `git log <base-branch>..HEAD --oneline` to see all commits on this branch not yet on the base branch. If there are none, stop and tell the user.
4. Run `git diff <base-branch>...HEAD` to review the full diff.
5. Derive a concise PR title (under 70 characters) from the commits and diff — use conventional commit style if the commits follow it.
6. Draft a PR body with:
   - A short **Summary** section (2–4 bullet points of what changed and why)
   - A **Test plan** section (checklist of what to verify)
7. Check if the current branch has a remote tracking branch. If not, push it with `git push -u origin HEAD`.
8. Create the PR with:
   ```
   gh pr create --base <base-branch> --title "<title>" --body "<body>"
   ```
9. Output the PR URL when done.
