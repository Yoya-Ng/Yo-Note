## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## 專案關係與 graphify 維護

- Yo-Note 是前端（Astro 靜態網站，部署在 Netlify）；後端是同層的 `../My_Note_SpringBoot`（Spring Boot，連 Neon PostgreSQL）。前端透過 `VITE_API_URL` 呼叫後端 API。
- 改動 API 呼叫或資料格式時，兩邊的圖都要查：`graphify query "<問題>" --graph ../My_Note_SpringBoot/graphify-out/graph.json`。
- `graphify-out/` 已加入 `.gitignore`，只在本機重建。git hook（post-commit／post-merge／post-checkout／post-rewrite）會自動更新；在 worktree 內 commit 時 hook 會略過，合併回主分支後才更新。手動更新：`graphify update .`。
- 只用 `--code-only`／AST 更新，不呼叫 LLM（`cluster-only` 一律加 `--no-label`）。
