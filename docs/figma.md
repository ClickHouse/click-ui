# Working on Click UI in Figma with an agent

The [Click UI v2 Figma file](https://www.figma.com/design/ek6PdO13m1lwcDjuX7sd1K/Click-UI-v2) is the design source for the components in this repo. Designers change it with the help of an agent (Cursor or Claude Code) that follows the [figma-component-a11y skill](../.claude/skills/figma-component-a11y/SKILL.md). The skill keeps every component page on the same tokens as the repo, adds a dark preview, and draws an **Accessibility** block that checks WCAG AA.

## What you need

1. **Figma desktop** with edit access to the Click UI v2 file. The browser version can't run the bridge plugin.
2. **Cursor** or **Claude Code**, with this repo cloned and opened. The agent reads the skill from `.claude/skills/`.
3. A **Figma personal access token** (Figma > Settings > Security > Personal access tokens) with read access to files and variables. Export it in your shell profile, for example `export FIGMA_ACCESS_TOKEN=figd_...` in `~/.zshrc`, and restart Cursor or Claude Code. Never commit it.
4. The **figma-console MCP** server. The repo's `.cursor/mcp.json` (Cursor) and `.mcp.json` (Claude Code) start it with `npx figma-console-mcp@latest` and pass the token from `FIGMA_ACCESS_TOKEN`. Approve the server when the app asks.
5. The **Desktop Bridge** plugin in Figma, which lets the MCP server read and edit the open file. Install it as described in the [figma-console-mcp README](https://github.com/southleft/figma-console-mcp), then run it from Plugins > Development in the v2 file and leave it open while you work.

To check the connection, ask the agent: "check the Figma connection". It should report the v2 file as connected. If it reports another file, open v2 and say "use the Click UI v2 file".

## What to ask

Write what you want in plain words. Some examples:

| You want to | Ask |
|---|---|
| Check a page | "Check a11y on the Tooltip page" |
| Start a new component | "Create a new Combobox page" |
| See a page in dark mode | "Add a dark preview for Card" |
| Fix colors | "Card uses the wrong hover color, move it to the neutral interactive tokens" |
| Compare with the code | "How does the Badge in Figma compare with the repo?" |
| Update the foundations | "I added a token, update the Color page and export DTCG" |
| Change a text style | "Update the Typography page" |

The agent screenshots what it changed and tells you which components are affected.

## What the agent asks you first

- **Adding a Semantic token or changing a token's value.** A new value restyles every component that uses the token, so the agent lists them before changing anything.
- **Adding a text style.** Text styles match the repo's product type scale; a new one needs a repo style too.
- **Committing** anything to the repo. It never pushes.

## Reading the Accessibility block

Each component page has the block under its light and its dark frame.

- **Passes WCAG AA** or **Fails WCAG AA**: the result for that mode.
- One row per component set: how many checks ran, the lowest contrast found, and every failing combination with its tokens.
- **Contrast:** text needs 4.5:1 (3:1 for large text). Icons, control borders and focus indicators need 3:1.
- **Focus:** interactive components need a Focus variant that looks different from Default.
- **Target size:** targets under 24x24 are listed for review. They pass if they're spaced 24px apart or have a larger hit area.
- **Links to another library:** anything still linked to the old library. The agent swaps these to local components, styles and variables.
- **Check by hand:** what a script can't see. State isn't shown by color alone, icon-only controls have a name in the annotations, and keyboard behavior matches the component.
- **Repo today:** the same states using the repo's tokens. **Fixed in Figma** means the design is ahead of the code, **Not in Figma** means the code has a state the design doesn't.

Disabled variants, separators and logos are exempt, as WCAG allows.

## Rules for the file

- Components use **Semantic** color tokens only. No raw hex values and no palette (Primitive) colors.
- Text uses the local product text styles. Shadows use the `Shadow/*` styles. Radius, spacing and icon sizes use the `radius/*`, `space/*` and `sizing/*` tokens.
- Component, property and variant names follow the repo component's props.
- Interactive components have Default, Hover, Active, Focus and Disabled states.
- Nothing links to another Figma library.

## How changes reach the repo

Figma changes don't update the repo on their own. After a design is agreed, open a [component RFC](../.github/PULL_REQUEST_TEMPLATE/component_rfc.md) or a PR with the Figma link, and confirm the page has a passing Accessibility block in Light and Dark.

Two gaps are known:

- The repo tokens (`tokens/themes/*.json`, Tokens Studio format) aren't generated from the Figma variables yet. The agent can export the Figma tokens as DTCG, but nothing writes them to the repo. Syncing them is a planned follow-up.
- The repo has contrast failures that Figma already fixes (39 in September 2026, 4 of them in states Figma doesn't have). Run `node .claude/skills/figma-component-a11y/scripts/repo-contrast.mjs . --failures` for the current list; each page's "Repo today" section shows its own.
