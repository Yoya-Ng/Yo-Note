import React, { useEffect, useState } from "react";
import {
  FaBolt,
  FaColumns,
  FaDatabase,
  FaFileCsv,
  FaFilter,
  FaLayerGroup,
  FaPause,
  FaPlay,
  FaRedo,
  FaServer,
  FaStepBackward,
  FaStepForward,
  FaTable,
  FaUsers,
} from "react-icons/fa";

// 每條路線的主題色（亮色／暗色模式各一組）
const ACCENTS = {
  duckdb: {
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500",
    bg: "bg-amber-500",
    soft: "bg-amber-500/10",
  },
  parquet: {
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500",
    bg: "bg-emerald-500",
    soft: "bg-emerald-500/10",
  },
  greenplum: {
    text: "text-sky-600 dark:text-sky-400",
    ring: "ring-sky-500",
    bg: "bg-sky-500",
    soft: "bg-sky-500/10",
  },
};

const ROUTES = [
  {
    id: "duckdb",
    name: "DuckDB 直接查 CSV",
    tagline: "零前置作業，單機直接用 SQL 掃描 CSV",
    fit: "一次性檢閱、臨時查核、先看資料長什麼樣子",
    steps: [
      {
        icon: FaFileCsv,
        title: "原始 CSV",
        desc: "數 GB、上億筆的 CSV 檔，不先整份載入記憶體。",
        code: "D015_202610.csv",
      },
      {
        icon: FaDatabase,
        title: "設定 DuckDB",
        desc: "8GB RAM 的電腦先限制記憶體，超過時改寫到暫存目錄（spill to disk），避免整台當掉。",
        code: "import duckdb\ncon = duckdb.connect()\ncon.sql(\"SET memory_limit = '3GB'\")\ncon.sql(\"SET temp_directory = 'D:/duck_tmp'\")",
      },
      {
        icon: FaFilter,
        title: "SQL 串流掃描",
        desc: "read_csv 邊讀邊算，只保留需要的欄位與列。建議明確指定型別，避免自動推斷把代碼欄的前導 0 吃掉。",
        code: "rel = con.sql(\"\"\"\n  SELECT pol_no, yyyymm, SUM(csm) AS csm\n  FROM read_csv('D015_202610.csv',\n       header = true,\n       types = {'pol_no': 'VARCHAR'})\n  WHERE yyyymm = '202610'\n  GROUP BY ALL\n\"\"\")",
      },
      {
        icon: FaTable,
        title: "只拉結果",
        desc: "只把彙總後的小結果轉成 pandas，記憶體只放結果，不放原始資料。",
        code: "df = rel.df()   # 結果才進 pandas",
      },
    ],
    notes: [
      "每次查詢都會重新解析整份 CSV；同一份檔案要查很多次時，改走 Parquet 路線。",
      "空值規則要先確認：未加引號的空欄位預設讀成 NULL，'NA'、'N/A' 預設保留為字串。",
    ],
  },
  {
    id: "parquet",
    name: "CSV → Parquet → DuckDB",
    tagline: "先轉一次欄式格式，之後重複查詢只讀需要的欄位",
    fit: "同一批資料要反覆查、比對、做情境分析",
    steps: [
      {
        icon: FaFileCsv,
        title: "原始 CSV",
        desc: "文字格式、逐列儲存；查一個欄位也得讀完整列。",
        code: "D015_202610.csv",
      },
      {
        icon: FaBolt,
        title: "一次性轉檔",
        desc: "用 DuckDB 串流轉檔，不需要把整份 CSV 讀進 pandas。型別在這一步固定下來。",
        code: "COPY (\n  SELECT * FROM read_csv('D015_202610.csv',\n    header = true,\n    types = {'pol_no': 'VARCHAR'})\n) TO 'D015_202610.parquet'\n  (FORMAT parquet, COMPRESSION zstd);",
      },
      {
        icon: FaColumns,
        title: "欄式儲存＋壓縮",
        desc: "依欄位分開存、同欄位壓縮率高；每個 row group 存 min/max 統計，查詢時可以跳過不相關的區塊。",
        code: "-- 依年月分區（選用）\nCOPY (...) TO 'd015'\n  (FORMAT parquet,\n   PARTITION_BY (yyyymm));",
      },
      {
        icon: FaFilter,
        title: "下推查詢",
        desc: "只讀 SELECT 用到的欄位（projection pushdown），WHERE 條件用統計資訊跳過 row group（filter pushdown）。",
        code: "SELECT pol_no, SUM(csm)\nFROM 'D015_202610.parquet'\nWHERE yyyymm = '202610'\nGROUP BY pol_no;",
      },
      {
        icon: FaTable,
        title: "分析／比對",
        desc: "Parquet 也能給 pandas、Streamlit 直接讀，同一份檔案多個工具共用。",
        code: "df = pd.read_parquet(\n  'D015_202610.parquet',\n  columns=['pol_no', 'csm'])",
      },
    ],
    notes: [
      "轉檔需要多花一次時間與磁碟空間；來源 CSV 更新時要重新產生 Parquet。",
      "Parquet 帶有型別，轉檔時定錯型別（例如保單號碼變成數字），後續所有查詢都會沿用錯誤。",
    ],
  },
  {
    id: "greenplum",
    name: "CSV → Greenplum",
    tagline: "平行載入到 MPP 資料庫，多人共用、可與平台資料關聯",
    fit: "要長期保存、多人查詢、和 IFRS 17 平台其他表 JOIN",
    steps: [
      {
        icon: FaFileCsv,
        title: "原始 CSV",
        desc: "檔案放在 ETL 主機上，Greenplum 各 segment 要能連到這台主機。",
        code: "/data/load/D015_202610.csv",
      },
      {
        icon: FaServer,
        title: "啟動 gpfdist",
        desc: "gpfdist 是 Greenplum 的平行檔案伺服器，讓所有 segment 同時讀檔，不經過 master 單點。",
        code: "gpfdist -d /data/load -p 8081 \\\n  -l /data/load/gpfdist.log &",
      },
      {
        icon: FaLayerGroup,
        title: "外部表",
        desc: "外部表只是讀檔的定義，不佔資料庫空間。可以加 SEGMENT REJECT LIMIT，把格式錯誤的列記到錯誤日誌，不讓整批失敗。",
        code: "CREATE READABLE EXTERNAL TABLE ext_d015 (\n  pol_no varchar, yyyymm char(6), csm numeric\n)\nLOCATION ('gpfdist://etl01:8081/D015_202610.csv')\nFORMAT 'CSV' (HEADER)\nLOG ERRORS SEGMENT REJECT LIMIT 100 ROWS;",
      },
      {
        icon: FaDatabase,
        title: "平行寫入",
        desc: "各 segment 依 DISTRIBUTED BY 鍵平行寫入；載入後執行 ANALYZE，讓優化器取得正確統計。",
        code: "INSERT INTO ifrs17.d015\nSELECT * FROM ext_d015;\n\nANALYZE ifrs17.d015;",
      },
      {
        icon: FaUsers,
        title: "多人共用",
        desc: "團隊用 DBeaver 或批次作業直接查，可與其他平台資料表 JOIN，權限由資料庫統一控管。",
        code: "SELECT d.pol_no, d.csm, r.ra\nFROM ifrs17.d015 d\nJOIN ifrs17.ra r USING (pol_no);",
      },
    ],
    notes: [
      "需要資料庫權限、主機網路互通與事先建好的 schema，前置成本最高。",
      "分布鍵選得不好會造成資料傾斜（skew），平行效果打折；載入後可檢查 gp_segment_id 分布。",
    ],
  },
];

// 定性比較（非實測數據），等級 1–3
const COMPARE = [
  { label: "前置作業少", hint: "", values: { duckdb: 3, parquet: 2, greenplum: 1 } },
  { label: "重複查詢速度", hint: "", values: { duckdb: 1, parquet: 3, greenplum: 3 } },
  { label: "環境／權限需求低", hint: "", values: { duckdb: 3, parquet: 3, greenplum: 1 } },
  { label: "多人共用", hint: "", values: { duckdb: 1, parquet: 2, greenplum: 3 } },
  { label: "與平台資料整合", hint: "", values: { duckdb: 1, parquet: 1, greenplum: 3 } },
];

const STEP_MS = 2600;

function Dots({ n, accent }) {
  return (
    <span className="inline-flex gap-1" aria-label={`${n} / 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${i <= n ? accent.bg : "bg-txt-light/20 dark:bg-darkmode-txt-light/20"}`}
        />
      ))}
    </span>
  );
}

export default function CsvFlow() {
  const [routeId, setRouteId] = useState("duckdb");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  const route = ROUTES.find((r) => r.id === routeId);
  const accent = ACCENTS[routeId];
  const last = route.steps.length - 1;

  // 自動播放：走到最後一步停一下再重來
  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(
      () => setActive((i) => (i >= last ? 0 : i + 1)),
      active >= last ? STEP_MS * 1.6 : STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [playing, active, last]);

  const selectRoute = (id) => {
    setRouteId(id);
    setActive(0);
    setPlaying(true);
  };

  const goTo = (i) => {
    setActive(Math.max(0, Math.min(last, i)));
    setPlaying(false);
  };

  const step = route.steps[active];

  return (
    <div className="space-y-8">
      <style>{`
        @keyframes csvflow-packet {
          0% { left: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes csvflow-packet-y {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .csvflow-packet { animation: csvflow-packet 1.1s ease-in-out infinite; }
        .csvflow-packet-y { animation: csvflow-packet-y 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .csvflow-packet, .csvflow-packet-y { animation: none; opacity: 1; }
        }
      `}</style>

      {/* 路線切換 */}
      <div className="grid gap-3 sm:grid-cols-3" role="tablist">
        {ROUTES.map((r) => {
          const a = ACCENTS[r.id];
          const selected = r.id === routeId;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={selected}
              onClick={() => selectRoute(r.id)}
              className={`glass rounded-lg p-4 text-left transition ${selected ? `ring-2 ${a.ring}` : "opacity-70 hover:opacity-100"}`}
            >
              <div className={`font-bold ${a.text}`}>{r.name}</div>
              <div className="mt-1 text-sm text-txt-light dark:text-darkmode-txt-light">{r.tagline}</div>
            </button>
          );
        })}
      </div>

      {/* 流程圖 */}
      <div className="glass rounded-lg p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-stretch">
          {route.steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < active;
            const current = i === active;
            return (
              <React.Fragment key={s.title}>
                {i > 0 && (
                  <div className="relative mx-auto h-8 w-1 md:mx-0 md:my-auto md:h-1 md:w-auto md:flex-1 md:min-w-[1.5rem]">
                    <div className={`absolute inset-0 rounded-full ${i <= active ? accent.bg : "bg-txt-light/20 dark:bg-darkmode-txt-light/20"}`} />
                    {i === active && (
                      <>
                        <span className={`csvflow-packet absolute top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full md:block ${accent.bg} shadow`} />
                        <span className={`csvflow-packet-y absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full md:hidden ${accent.bg} shadow`} />
                      </>
                    )}
                  </div>
                )}
                <button
                  onClick={() => goTo(i)}
                  className={`flex w-full flex-row items-center gap-3 rounded-lg p-3 text-left transition md:w-28 md:flex-col md:text-center ${current ? `${accent.soft} ring-2 ${accent.ring}` : ""} ${!current && !done ? "opacity-50" : ""}`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${done || current ? `${accent.bg} text-white` : "bg-txt-light/20 dark:bg-darkmode-txt-light/20"} ${current ? "scale-110" : ""} transition`}>
                    <Icon />
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    <span className="mr-1 text-txt-light dark:text-darkmode-txt-light">{i + 1}.</span>
                    {s.title}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* 播放控制 */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button onClick={() => goTo(active - 1)} disabled={active === 0} className="glass-t rounded p-2 disabled:opacity-30" aria-label="上一步">
            <FaStepBackward />
          </button>
          <button onClick={() => setPlaying((p) => !p)} className={`rounded px-3 py-2 text-white ${accent.bg}`} aria-label={playing ? "暫停" : "播放"}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => goTo(active + 1)} disabled={active === last} className="glass-t rounded p-2 disabled:opacity-30" aria-label="下一步">
            <FaStepForward />
          </button>
          <button onClick={() => { setActive(0); setPlaying(true); }} className="glass-t rounded p-2" aria-label="重新播放">
            <FaRedo />
          </button>
          <span className="ml-2 text-sm text-txt-light dark:text-darkmode-txt-light">
            步驟 {active + 1} / {route.steps.length}
          </span>
        </div>

        {/* 目前步驟說明 */}
        <div key={`${routeId}-${active}`} className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className={`text-xl font-bold ${accent.text}`}>{step.title}</h3>
            <p className="mt-2 leading-relaxed">{step.desc}</p>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-black/80 p-4 text-sm leading-relaxed text-gray-100">
            <code>{step.code}</code>
          </pre>
        </div>
      </div>

      {/* 適用情境與注意事項 */}
      <div className="glass rounded-lg p-4 sm:p-6">
        <div className={`font-bold ${accent.text}`}>適合：{route.fit}</div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {route.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>

      {/* 三種方式比較 */}
      <div className="glass overflow-x-auto rounded-lg p-4 sm:p-6">
        <h3 className="text-xl font-bold">三種方式比較</h3>
        <p className="mt-1 text-sm text-txt-light dark:text-darkmode-txt-light">
          定性評估，圓點越多代表越有利；實際效能依資料量、欄位數與硬體而定，建議用自己的資料實測。
        </p>
        <table className="mt-4 w-full min-w-[32rem] text-sm">
          <thead>
            <tr className="border-b border-border dark:border-darkmode-border">
              <th className="py-2 text-left font-semibold">面向</th>
              {ROUTES.map((r) => (
                <th key={r.id} className={`py-2 text-left font-semibold ${ACCENTS[r.id].text}`}>
                  {r.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label} className="border-b border-border/50 dark:border-darkmode-border/50">
                <td className="py-2">
                  {row.label}
                  {row.hint && <span className="ml-1 text-xs text-txt-light dark:text-darkmode-txt-light">（{row.hint}）</span>}
                </td>
                {ROUTES.map((r) => (
                  <td key={r.id} className="py-2">
                    <Dots n={row.values[r.id]} accent={ACCENTS[r.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
