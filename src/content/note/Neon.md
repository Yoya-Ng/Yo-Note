---
title: 如何使用 Neon
description: "如何使用 Neon  description"
date: 2025-04-10
image: ""
imageAlt: Profile of Emmy Noether
categories: [Mathematics]
author: Yo H.
tags: [Cloud, Java]
---

## ☁️ 使用 Neon 建立 PostgreSQL 雲端資料庫（含 Spring Boot 教學）

[Neon](https://neon.tech) 是一個現代化、雲端化的 PostgreSQL 平台，支援 serverless、分支（branching）、時光機（time-travel queries）等功能，**免費方案就足以應付開發與小型專案**！

---

## ✅ 使用 GitHub 快速註冊

只需一鍵登入 GitHub 就能註冊，不需要繁瑣的流程，也不需輸入信用卡資訊。  
👉 [註冊連結](https://console.neon.tech)

---

## 🌍 選擇部署區域與雲端供應商

建立資料庫時請記得選擇部署區域（Region）與供應商（Cloud Service Provider）：

- **Cloud Provider**：建議選擇 AWS
- **Region**：盡量選擇與你部署服務（例如 Railway）同一區域，例如新加坡 → `ap-southeast-1`

這樣可以大幅降低延遲、提升效能。

![Create Neon Project](/src/assets/note/Neon/CreateProject.png)

---

## 🔌 取得連線資訊

進入 Neon 後台 → 點選左側選單 **「Connect」**，就能看到完整的連線資訊。

- Host / Port
- Database / User / Password
- JDBC / `.env` 格式的連線字串

![Connect to Neon DB](/src/assets/note/Neon/ConnectToYourDatabase.png)

---

## 🚀 使用 Spring Boot 成功連線

Spring Boot 要連接 Neon，只需要設定正確的連線字串，並加上 `sslmode=require`：

在 `application.properties` 加入以下設定：

```properties
spring.datasource.url=jdbc:postgresql://你的-neon-host:5432/資料庫名稱?sslmode=require
spring.datasource.username=你的使用者
spring.datasource.password=你的密碼
spring.datasource.driver-class-name=org.postgresql.Driver
```

啟動專案後，如果連線成功，Console 會出現類似：

```log
HikariCP - Start completed.
Initialized JPA EntityManagerFactory...
```

---

## 📊 查看 Neon 使用量與免費版限制

點選右上角帳號 → Usage 頁面，就能看到目前的資源使用情況：
![alt text](/src/assets/note/Neon/Dashboard.png)

### 🆓 Free 版限制如下：

| 資源項目 | 免費配額          |
| -------- | ----------------- |
| 儲存空間 | 10 GB             |
| 資料傳輸 | 約 100 萬請求／月 |
| 分支數量 | 最多 3 個分支     |
| 活動時間 | 約 100 小時／月   |

超過配額時 Neon 會提醒升級，但不會立刻停用。

---

## 🎉 總結

Neon 讓你快速建立 PostgreSQL 雲端資料庫，支援 GitHub 登入、現代化功能、與 Spring Boot 整合無痛，完全免費也夠用！
你可以在幾分鐘內完成資料庫設定，專心開發，快速上線。
