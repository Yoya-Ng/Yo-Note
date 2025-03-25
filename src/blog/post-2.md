---
# layout: ../../layouts/MarkdownPostLayout.astro
title: Java Knowledge
author: Astro Learner
description: ""
image:
  url: "https://docs.astro.build/assets/arc.webp"
  alt: "The Astro logo on a dark background with a purple gradient arc."
pubDate: 2022-07-08
tags: ["astro", "blogging", "learning in public", "successes"]
---

- [什麼是 OOP 物件導向？](#什麼是-oop-物件導向)
- [Spring framework](#spring-framework)
- [什麼是 Spring Boot？](#什麼是-spring-boot)
- [JPA 是什麼？](#jpa-是什麼)
  - [ORM 是什麼？](#orm-是什麼)
    - [Spring JDBC](#spring-jdbc)
    - [Spring Data JPA](#spring-data-jpa)
    - [Hibernate](#hibernate)
    - [MyBatis](#mybatis)
- [Redis](#redis)
- [語法相關問題](#語法相關問題)
  - [== 和 .equals() 的區別？](#-和-equals-的區別)
  - [Java 中 final, finally, finalize 的區別？](#java-中-final-finally-finalize-的區別)
  - [String, StringBuilder, StringBuffer 的區別 ?](#string-stringbuilder-stringbuffer-的區別-)
  - [int \& integer 差別?](#int--integer-差別)
  - [Java 8 引入的流（Stream）是什麼？](#java-8-引入的流stream是什麼)
  - [什麼是 Lambda 表達式？有什麼優點？](#什麼是-lambda-表達式有什麼優點)
  - [什麼是集合？](#什麼是集合)
  - [－－－待處理](#待處理)
  - [多執行緒和併發問題](#多執行緒和併發問題)
  - [synchronized 和 Lock 的區別？](#synchronized-和-lock-的區別)
  - [JVM?](#jvm)
- [微服務（Microservices）](#微服務microservices)
- [雲服務（Cloud Services）](#雲服務cloud-services)
- [Tomcat 和 JBoss 有什麼區別？](#tomcat-和-jboss-有什麼區別)
- [什麼事 設計模式（Design Pattern）?](#什麼事-設計模式design-pattern)
  - [1.創建型模式（Creational Patterns）](#1創建型模式creational-patterns)
  - [2.結構型模式（Structural Patterns）](#2結構型模式structural-patterns)
  - [3.行為型模式（Behavioral Patterns）](#3行為型模式behavioral-patterns)

## 什麼是 OOP 物件導向？

- 封裝
- 繼承
- 多型

## Spring framework

- Spring 是一個開源的應用框架，旨在簡化 Java 應用程式的開發，提供控制反轉（IoC）和依賴注入（DI）等功能。

1. 控制反轉 (IoC)
   - 什麼是 IoC ？
     - IoC 容器負責管理對象的生命週期和依賴關係。
2. 依賴注入（DI）
   - 什麼是 DI？
     - 依賴注入是一種設計模式，通過將對象的依賴關係在運行時注入到對象中來減少耦合。
3. AOP (面向切面編程)
   - 什麼是 AOP？
     - AOP 是一種編程範式，用於將橫切關心（如日誌、安全性）與業務邏輯分離。

## 什麼是 Spring Boot？

- Spring Boot 是 Spring 的延伸，目標是讓開發者能夠快速建立 Spring 應用程式，而不需要處理大量的配置。它內建 Web 伺服器、自動配置、簡化依賴管理，適合用來開發 微服務（Microservices） 或 獨立應用。
- 理解核心概念：熟悉 IoC（控制反轉）、DI（依賴注入）、AOP（面向切面編程）等基礎知識。

## JPA 是什麼？

> 一個 ORM 的規範，不包含具體實作。  
> 通過映射 Java 物件與資料庫表格，使開發者能夠輕鬆處理資料庫操作。核心包括 EntityManager、JPQL、事務管理 等，能大幅簡化 Java 應用中的資料持久化工作，  
> 並且能與不同的 ORM 實現（如 Hibernate）兼容。

1. **EntityManager**：JPA 的核心介面，負責對實體進行 CRUD 操作。
2. **JPQL（Java Persistence Query Language）**：類似 SQL 的查詢語言，但基於 Java 實體而非資料庫表。
3. **事務管理（Transaction Management）**：JPA 支援透過 @Transactional 來管理事務，確保資料一致性。
4. **不同的實現**：JPA 只是規範，常見的實作有 Hibernate、EclipseLink、OpenJPA 等。

### ORM 是什麼？

> JPA（Java Persistence API） – 規範

    Spring Data JPA － Spring 提供的一個數據訪問抽象
    Hibernate – 最流行的 JPA 實作，ORM 實作
    MyBatis – SQL Mapper
    OpenJPA – JPA 另一種實作
    EclipseLink – JPA 官方參考實作

#### Spring JDBC

- 概念：提供直接訪問數據庫的方式，使用 JdbcTemplate 類來執行 SQL 語句，並映射查詢結果。

#### Spring Data JPA

- JPA 抽象層，簡化數據訪問
- 自動生成查詢，靈活度稍低
- 項目與 Spring 生態系統深度集成。

#### Hibernate

- 具體的 ORM 實作
- 手寫 HQL/SQL，靈活度高
- 使用 Hibernate 原生的 HQL、Criteria API 或原生 SQL

#### MyBatis

- SQL Mapper（SQL 映射工具）
- 需要完全控制 SQL 語句。
- 項目中存在大量複雜查詢或性能優化需求。
- 需寫 XML

## Redis

1.  主要用途：Redis 是一個內存型數據存儲系統，主要用於快取、即時分析和簡單的消息系統。
2.  數據結構支持：支持多種數據結構（如字符串、哈希、列表、集合、有序集合等），靈活處理不同類型的數據。
3.  高性能：基於內存操作，讀寫速度極快，適合需要低延遲的場景。
4.  Pub/Sub 模型：提供基本的發布/訂閱功能，但不具備 RabbitMQ 的高級功能（如持久化和路由）。
5.  多功能性：除了作為消息系統，還可用作快取層、會話存儲或即時分析工具。

## 語法相關問題

#### == 和 .equals() 的區別？

- == 比較的是 記憶體地址（基本類型、引用類型）。
- .equals() 預設等價於 ==，但在 String 和 Integer 等類中 被重寫，比較的是內容。

#### Java 中 final, finally, finalize 的區別？

- final：用於 變數、方法、類，不可變或不可重寫。
- finally：用於 try-catch-finally，確保程式塊執行。
- ~~finalize()：垃圾回收前執行，已被淘汰（JDK 9 棄用）。~~

#### String, StringBuilder, StringBuffer 的區別 ?

- String - String Pool（字串池機制）
  - ❌ 不可變
  - ✅ 安全（不可變）
  - 字串不會頻繁變化
- StringBuilder
  - ✅ 可變
  - ❌ 不安全
  - 單執行緒、大量字串操作
- StringBuffer
  - ✅ 可變
  - ✅ 安全（同步鎖）
  - 多執行緒、大量字串操作

#### int & integer 差別?

- 基本資料類型 vs 物件類型

#### Java 8 引入的流（Stream）是什麼？

- 更高效的集合操作方式，如過濾、映射、排序等。

#### 什麼是 Lambda 表達式？有什麼優點？

- 一種簡化函數式編程的方式，使得代碼更加簡潔。

#### 什麼是集合？

- List 可重複，有序
  - ArrayList（動態陣列，查詢快，增刪慢）
  - LinkedList（鏈結串列，增刪快，查詢慢）
  - Vector（類似 ArrayList，但執行緒安全）
- Set 不可重複，無序
  - HashSet（基於 HashTable，不保證順序）
  - TreeSet（基於 紅黑樹，元素有序）
  - LinkedHashSet（維持插入順序）
- Map （Key-Value)
  - HashMap（最快，但無序）
  - TreeMap（Key 有序）
  - LinkedHashMap（維持插入順序）

#### －－－待處理

#### 多執行緒和併發問題

#### synchronized 和 Lock 的區別？

- synchronized：內建鎖，自動釋放，效能較低。
- Lock（如 ReentrantLock）：手動釋放，支援可重入、超時等待、公平鎖等特性。

#### JVM?

## 微服務（Microservices）

> 微服務是一種架構模式

- 每個微服務都是獨立的，可以獨立開發、測試、部署。
- Spring Boot / Spring Cloud：用於快速開發和集成微服務的框架。
- Docker：提供容器化環境來部署微服務，確保每個微服務可以在任何環境中一致運行。
- Kubernetes：提供容器編排平台，用於管理微服務的部署、擴展和運行。

## 雲服務（Cloud Services）

- Amazon Web Services (AWS)：
  - 全球最大的雲服務提供商，提供各種 IaaS、PaaS 和 SaaS 服務，涵蓋計算、存儲、網絡、人工智能等領域。
- Microsoft Azure：
  - 微軟的雲平台，提供全面的雲計算服務，並與微軟的企業軟件（如 Windows Server、SQL Server）無縫集成。
- IBM Cloud：
  - IBM 提供的雲服務平台，專注於企業級解決方案，支持 AI、機器學習、區塊鏈等技術。

## Tomcat 和 JBoss 有什麼區別？

- Tomcat：
  - Tomcat 是一個 Web 伺服器 和 Servlet 容器，Tomcat 適合用於需要輕量級的 Web 應用部署和運行，適合簡單的 Servlet/JSP 應用。
- JBoss（現名為 WildFly）：
  - JBoss 提供了一個完整的企業級解決方案，支持分佈式架構、事務處理和消息驅動等功能，適合大型企業應用和多層架構。
  - 提供了對 EJB、JPA、JMS、JTA 等企業級技術的完整支援，適用於開發和部署企業級應用

| Java EE 的核心技術                       | 說明                                            |
| ---------------------------------------- | ----------------------------------------------- | ----------- |
| Servlet                                  | 負責處理 HTTP 請求和回應，動態產生網頁內容      |
| JSP（JavaServer Pages）                  | 讓開發者能在 HTML 中嵌入 Java 代碼              |
| JSF（JavaServer Faces）                  | 企業級 Web UI 框架，類似於 Angular / React      |
| JPA（Java Persistence API）              | ORM 框架，用來管理數據庫（類似                  | Hibernate） |
| JTA（Java Transaction API）              | 負責分散式交易管理（確保資料一致性）            |
| EJB（Enterprise JavaBeans）              | 負責商業邏輯，支援事務管理                      |
| JMS（Java Message Service）              | 提供訊息佇列（Message Queue）功能               |
| CDI（Contexts and Dependency Injection） | 依賴注入（類似 Spring 的 Dependency Injection） |

---

## 什麼事 設計模式（Design Pattern）?

計模式通常分為三大類：

### 1.創建型模式（Creational Patterns）

> 這些模式主要解決如何將對象或類組合成更大的結構，以達到更好的效率和更清晰的代碼結構。

- 🔴 單例模式（Singleton Pattern）：
  - 保證一個類只有一個實例，並提供一個全局的訪問點。
- 🔴 工廠方法模式（Factory Method Pattern）：
  - 定義一個用於創建對象的接口，讓子類決定具體實例化哪一個類。
- 🔴 抽象工廠模式（Abstract Factory Pattern）：
  - 提供一個創建一系列相關或相互依賴對象的接口，而無需指定具體類別。
- 建造者模式（Builder Pattern）：
  - 分步構建一個複雜的對象，將對象的構建過程與表示分離。
- 原型模式（Prototype Pattern）：
  - 通過複製現有的對象來創建新對象，而不是重新創建一個對象。

### 2.結構型模式（Structural Patterns）

> 這些模式主要解決如何將對象或類組合成更大的結構，以達到更好的效率和更清晰的代碼結構。

- 適配器模式（Adapter Pattern）：
  - 將一個類的接口轉換為客戶端所期望的另一種接口，讓原本接口不兼容的類可以合作無間。
- 裝飾者模式（Decorator Pattern）：
  - 動態地給一個對象添加額外的職責，提供比繼承更靈活的擴展機會。
- 外觀模式（Facade Pattern）：
  - 為一組接口提供一個統一的高層接口，使得子系統的使用者可以更容易地使用這些接口。
- 橋接模式（Bridge Pattern）：
  - 將抽象部分與實現部分分離，使得兩者可以獨立變化。
- 組合模式（Composite Pattern）：
  - 將對象組合成樹形結構來表示部分與整體的層次結構，讓客戶對單個物件和組合物件的使用具有一致性。
- 享元模式（Flyweight Pattern）：
  - 通過共享相同的對象來減少內存消耗，特別是在處理大量細粒度對象的情況下。

### 3.行為型模式（Behavioral Patterns）

> 這些模式主要關心對象或類之間的通信和交互，如何提高對象之間協作的靈活性和效率。

- 🔴 策略模式（Strategy Pattern）：
  - 定義一系列的算法，並將每個算法封裝起來，使得它們可以互換，讓算法的變化獨立於使用算法的客戶。
- 模板方法模式（Template Method Pattern）：
  - 定義一個操作中的算法骨架，將某些步驟延遲到子類中，使得子類可以重新定義某些算法步驟而不改變算法的結構。
- 觀察者模式（Observer Pattern）：
  - 定義了一種一對多的依賴關係，當一個對象改變狀態時，所有依賴於它的對象都會得到通知並自動更新。
- 狀態模式（State Pattern）：
  - 允許對象在其內部狀態改變時改變其行為，使得對象的行為會根據當前狀態來改變。
- 責任鏈模式（Chain of Responsibility Pattern）：
  - 為請求創建一個接收者的鏈，每個接收者都對請求做出處理或轉發，直到請求被處理為止。
- 命令模式（Command Pattern）：
  - 將請求封裝成對象，從而讓用戶對請求的發出者和接收者解耦。
- 中介者模式（Mediator Pattern）：
  - 定義一個對象來封裝一組對象之間的交互，使得這些對象不需要直接互相引用，從而使它們的耦合度降低。
