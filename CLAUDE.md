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

## 開發與部署

- 驗證：`npm run build`（含 pagefind）必須 exit 0；目前約 84 頁。
- 部署：push 到 `main` 由 Netlify 自動 build；設定在 `netlify.toml`（Node 22），優先於後台設定。
- `.astro` 頁面第一行必須是 `---`，註解要放在 frontmatter 內，否則 import 失效、整站 build 失敗。
- 版面寬度：全站用 `.container`（1200px）；只有使用者要求的頁面才個別放寬（改用 `mx-auto w-full max-w-[...] px-4`），不要改全站設定。
- 登入只給站長使用：`/login`（`LoginForm.vue`）呼叫同網域的 `/api/auth/*`，登入狀態是後端的 HttpOnly session cookie，前端不存 token、不用 `localStorage`。沒有註冊、忘記密碼與角色分級。
- `/api/*` 代理：本機由 `astro.config.mjs` 的 vite proxy 轉到 `API_PROXY_TARGET`（預設 `http://localhost:8080`）；正式環境由 `netlify.toml` 的 redirect 轉到 Railway（網址需手動填入）。`npm run dev` 時 Pagefind 搜尋沒有索引，要 build 後用 `astro preview` 測。
