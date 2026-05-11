# Copilot Instructions

## Release update requirements

When preparing a release PR / commit, always follow the established repository pattern:

1. The release commit message must be exactly in this format:
   - `[Release] Increase version to xxx`
2. Update all required version files:
   - `/package.json`
   - `/core/package.json`
3. Update `/README.md`:
   - Bump the **Recommended Version Specification** to the new release version.
4. Update `/CHANGELIST.md`:
   - Include only significant changes in the versioned section.
   - Include a **Full Changelog** comparison link for the release.
   - If there are `# Unreleased` items, preserve them as-is and do not remove or reduce them when creating the new version section.

## Verified release pattern in this repository

Recent release commits follow this approach and include these files:

- `[Release] Increase version to 0.1.4` (`f3c204d`)
- `[Release] Increase version to 0.1.3` (`d9340b7`)

These release commits updated release metadata including `CHANGELIST.md`, `README.md`, and package version files.
