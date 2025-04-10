---
title: resource
description: "resource description"
date: 2025-04-09
image: ""
imageAlt: Profile of Emmy Noether
categories: [Mathematics]
author: Yo H.
tags: [biography, algebra]
---

## 推薦的免費 MySQL 平台整理（2025 最新）

| 名稱                            | 是否免費         | 儲存空間      | 是否休眠                | 支援連線      | 特別說明                      |
| ------------------------------- | ---------------- | ------------- | ----------------------- | ------------- | ----------------------------- |
| 🌐 PlanetScale                  | ✅ 永久免費方案  | 5GB           | ✅ 會休眠               | ✅ 需要 TLS   | 不支援 JOIN，MySQL Compatible |
| ☁️ Railway                      | ✅ 每月 500 小時 | ~1GB          | ❌ 不休眠（但會吃時數） | ✅ 直接連     | 免費額度用完會停機            |
| 🧠 Oracle Cloud VM + 自架 MySQL | ✅ 永久免費 VM   | 200GB（自控） | ❌ 完全不休眠           | ✅ 全權控制   | 適合進階玩家，自行部署        |
| 💡 Freesqldatabase.com          | ✅ 永久免費      | 5MB～100MB    | ❌                      | ✅ 有限制     | 免費限制多，適合練習用        |
| 🛠️ Clever Cloud                 | ✅ 有免費試用    | 內部限定      | ❌                      | ✅ 可外部連線 | 免費期結束會收費，不推薦長期  |
| 🔧 000Webhost / InfinityFree    | ✅ 有 MySQL      | 20MB～100MB   | ❌                      | ✅（慢）      | 廣告多、速度慢，僅限練習      |

✅ 最推薦的三種選擇

### 🥇 1. PlanetScale（MySQL Compatible）

✔ 適合穩定使用，但不支援 JOIN，僅支援無關聯設計（或用程式解構）
永久免費：5GB 儲存
每月 1 億筆查詢，1000 萬筆寫入
自動休眠省資源（首次請求會慢一下）
安全、穩定、高性能
👉 適合開發專案、前後端串接 API、不複雜的資料結構
🔗 官網：https://planetscale.com

### 🥈 2. Railway（快速部署用）

✔ 適合快速測試、臨時開發、想搭配 Spring Boot 使用
免費每月 500 小時（MySQL + App 共用）
可一鍵建立資料庫
管理介面清楚，支援環境變數、外部連線
不會休眠，但免費時數可能不夠
👉 適合短期部署、學習用
🔗 官網：https://railway.app

### 🥉 3. Oracle Cloud 永久免費 VM（自架 MySQL）

✔ 適合技術玩家，要長期架設 MySQL、可自己掌控主機環境
免費提供 ARM VM（最大 4 vCPU + 24GB RAM）
你可以自己安裝 MySQL、PostgreSQL、MongoDB 等
可用來部署 Spring Boot + 資料庫一起跑
👉 適合做後端 API + DB 架設的實戰演練
🔗 官網：https://www.oracle.com/cloud/free

### 🧠 結論：該怎麼選？

你的需求 推薦平台
要快速、簡單上手、Spring Boot 串接方便 🔹 Railway
要永久免費、有好管理介面、資料不大 🔹 PlanetScale
想練習 DevOps、自行掌控一切 🔹 Oracle VM + 自架 MySQL
只是練習 SQL / 學習 🔹 Freesqldatabase.com（或本地 MySQL）

✅ 1. Supabase（PostgreSQL）

🌟 特點：
開源 Firebase 替代品
提供 PostgreSQL 資料庫 + REST / GraphQL API
有 Authentication、Storage、Realtime 等整合服務
💰 免費方案內容（Free Tier）：
資源 數量
資料庫儲存 500MB
每月傳輸流量 2GB
同時連線數 約 20 個連線
每天請求數 50,000 次（API、DB 查詢等）
✅ 適合：
測試/練習後端
做有用戶系統的 Web App
小型 API 專案
🔗 網站：https://supabase.com

✅ 2. Neon（PostgreSQL）

🌟 特點：
100% 雲端 PostgreSQL
自動休眠/喚醒（省資源）
支援 Branch、Clone DB、Backup 快照
可當作 Serverless DB
💰 免費方案內容：
資源 數量
儲存空間 10GB（含資料+log）
每月資料傳輸 10GB
同時連線數 約 100 個（免費 tier 有點浮動）
計費方式 只計算活躍時間（會休眠）
✅ 適合：
經常要 branch、測試版本的開發者
小型專案，但要現代化部署（ex: Vercel + Neon）
🔗 網站：https://neon.tech

✅ 3. PlanetScale（MySQL 兼容）

🌟 特點：
架構類似 Git（支援 Branch 和 Pull Request）
架設在 Vitess 上（YouTube 使用）
自動水平擴充、不用手動調整資料表
💰 免費方案內容：
資源 數量
資料庫數量 無限制（可多個 DB）
儲存空間 5GB
每月傳輸量 1 Billion row reads / 10 Million writes
連線方式 支援 Connect via TLS 和 Proxy
✅ 適合：
MySQL 用戶
想練習 Git-style DB Flow 的人
不需使用 JOIN（不支援！）
🔗 網站：https://planetscale.com

### 🧠 總結比較表

| 項目              | Supabase           | Neon       | PlanetScale      |
| ----------------- | ------------------ | ---------- | ---------------- |
| 資料庫類型        | PostgreSQL         | PostgreSQL | MySQL            |
| 免費儲存空間      | 500MB              | 10GB       | 5GB              |
| 自動休眠          | ❌ 無              | ✅ 有      | ✅ 有            |
| Branch / Git 流程 | 部分支援           | ✅ 支援    | ✅ 非常強大      |
| 使用門檻          | 最低（含 UI 管理） | 中等       | 偏高（CLI 居多） |
| 適合新手          | ✅✅✅             | ✅✅       | ✅（偏技術）     |

### ✅ 建議你怎麼選？

你想要... 建議選擇
用起來最簡單 + UI 方便管理 👉 Supabase
用 PostgreSQL 又要分支測試 👉 Neon
用 MySQL + 進階版控流程 👉 PlanetScale

## 🧾 Azure vs Render vs Railway

| 項目                       | Azure App Service                      | Render                           | Railway                             |
| -------------------------- | -------------------------------------- | -------------------------------- | ----------------------------------- |
| ✅ 是否支援 Spring Boot    | ✅ 有內建 Java 支援                    | ✅ 支援 JAR 或 Docker            | ✅ 支援 JAR 或 Docker               |
| 🐳 支援 Docker             | ✅ 有                                  | ✅ 有                            | ✅ 有                               |
| 💵 免費資源                | ✅ 永久免費層（F1）🟡 每天 60 CPU 分鐘 | ✅ 免費方案 🟡 自動睡眠、1GB RAM | ✅ 免費方案 🟡 月 500 小時、1GB RAM |
| 🌐 自動提供 HTTPS 網址     | ✅ 有                                  | ✅ 有                            | ✅ 有                               |
| ⚙️ 部署難易度              | 🟠 中等（需設定 Plan、資源群組）       | 🟢 容易（幾步就好）              | 🟢 容易（連 GitHub 即可）           |
| ⚡ 啟動速度                | 🟠 普通（F1 層會慢）                   | 🔴 免費版會睡眠，啟動約 20 秒    | 🔴 免費版會睡眠，啟動約 20 秒       |
| 🧰 CLI 工具或 VS Code 整合 | ✅ 有（Azure CLI, VS Code）            | 🟢 有                            | 🟢 有                               |
| 🛠️ 支援 CI/CD（連 GitHub） | ✅ 有                                  | ✅ 有                            | ✅ 有                               |
| 🧑‍💻 初學者友善程度          | 🟠 有點曲線                            | 🟢 非常簡單                      | 🟢 非常簡單                         |

### 📌 各平台的建議使用情境

✅ Render
適合想快速把 Spring Boot 部署上線，並且不需要長時間在線。
支援自動建構 JAR 或 Docker。
非常適合初學者、Demo、個人專案。
➡️ 適合：輕量後端、學習測試。

✅ Railway
類似 Render，也很容易部署。
有漂亮的 Dashboard 和 GitHub 自動部署。
免費版限制略多一點（500 小時/月），但足夠用於一般開發。
➡️ 適合：學生專案、快速上線測試。

✅ Azure App Service（免費層）
適合希望學習雲平台架構的人（企業級），也可以用來練習 CI/CD、自動化部署。
免費層 CPU 分配有限，每天最多 60 分鐘運行時間。
但優點是：不會自動睡眠（只要你沒超過用量），更穩定。
➡️ 適合：想學 Azure、生涯考慮雲平台者、技術展示。

### 🔚 結論建議

你的需求 建議平台
⚡ 想快速上線、簡單部署 ✅ Render 或 Railway
☁️ 想學雲平台（有點企業架構） ✅ Azure
🐳 想練 Docker 打包和部署 三個都 OK（Render 最簡單）
🧪 要長時間測試穩定性，不想自動睡眠 ✅ Azure App Service（注意 CPU 限制）

✅ 1. Render

支援 Spring Boot。
有免費方案（Web Service 免費方案每次最多運行 15 分鐘不使用會自動關閉，但會自動喚醒）。
可以從 GitHub 一鍵部署。
有 HTTPS 網址。
🔗 網站：https://render.com

✅ 2. Railway

很簡單的部署流程，支援 Spring Boot。
免費方案有每月使用量限制（目前約 500 小時和 1GB RAM）。
可連接 GitHub，支援自動部署。
有 HTTPS 網址。
🔗 網站：https://railway.app

✅ 3. Glitch
可以當作簡單的伺服器部署工具，不過比較適合 Node.js。
若要部署 Java/Spring Boot 會比較麻煩，需手動設置。
免費帳號有睡眠時間限制。
🔗 網站：https://glitch.com

✅ 4. Fly.io
支援 Docker，也能部署 Spring Boot。
有免費資源可用（每月 3 台 VM，每台 VM 有 256MB RAM）。
有 CLI 工具部署。
🔗 網站：https://fly.io

✅ 5. Vercel / Netlify
主要是前端平台，但可以搭配 Serverless Function 實作簡單的 API。
不適合完整的 Spring Boot 專案，但可以作為輕量 API 替代方案。
補充：
Heroku 曾經是非常熱門的平台，但現在的免費方案已經取消（目前沒有免費層）。
上面提到的幾個平台中，Render 和 Railway 是目前最適合部署 Spring Boot 並提供免費方案的平台。
