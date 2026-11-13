/**
 * Kiểm thử prototype bằng Chrome DevTools Protocol — không cần mạng, không cần npm.
 *
 *   node prototype/tests/verify.mjs
 *
 * Yêu cầu: Node >= 20 và Chrome/Edge cài ở đường dẫn mặc định.
 * Đặt biến môi trường CHROME_PATH nếu trình duyệt nằm chỗ khác.
 *
 * Mỗi dòng PASS/FAIL ứng với một tiêu chí trong checklist của TV1
 * (mở là chạy · không nút chết · nha_giao_dich không nhả tiền · nhãn Trợ lý AI · ảnh đánh số).
 */
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
].filter(Boolean);

const CHROME = CANDIDATES.find(p => existsSync(p));
if (!CHROME) {
  console.error("Không tìm thấy Chrome/Edge. Đặt CHROME_PATH=<đường dẫn trình duyệt> rồi chạy lại.");
  process.exit(2);
}

const PAGE = process.argv[2] || join(import.meta.dirname, "..", "index.html");
const PORT = 9300 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "proto-cdp-"));

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--remote-debugging-port=" + PORT, "--user-data-dir=" + profile, "about:blank"
], { stdio: "ignore" });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let ws, msgId = 0;
const pending = new Map();
const events = { errors: [], requests: [] };

function send(method, params = {}) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function connect() {
  let list = [];
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      list = await res.json();
      if (list.length) break;
    } catch {}
    await sleep(250);
  }
  const target = list.find(t => t.type === "page");
  if (!target) throw new Error("Không mở được target của trình duyệt");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id).resolve(m.result); pending.delete(m.id); return; }
    if (m.method === "Runtime.exceptionThrown") events.errors.push(m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") events.errors.push(JSON.stringify(m.params.args));
    if (m.method === "Log.entryAdded" && m.params.entry.level === "error") events.errors.push(m.params.entry.text);
    if (m.method === "Network.requestWillBeSent") events.requests.push(m.params.request.url);
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Network.enable");
}

async function goto(params = "") {
  await send("Page.navigate", { url: pathToFileURL(PAGE).href + params });
  for (let i = 0; i < 40; i++) {
    const r = await send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
    if (r.result.value === "complete") break;
    await sleep(100);
  }
  await sleep(150);
}

async function ev(expr) {
  const r = await send("Runtime.evaluate", { expression: `(function(){${expr}})()`, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " :: " + expr);
  return r.result.value;
}

const click = (sel) => ev(`var el=document.querySelector(${JSON.stringify(sel)}); if(!el) return "NO_EL"; el.click(); return "OK";`);
const text = () => ev("return document.body.innerText;");
const chat = () => ev("return document.getElementById('chat').innerText;");
const actions = () => ev("return [...document.querySelectorAll('#actionBar [data-act]')].map(b=>b.getAttribute('data-act'));");

let pass = 0, fail = 0;
function check(name, cond, extra = "") {
  if (cond) { pass++; console.log("PASS  " + name); }
  else { fail++; console.log("FAIL  " + name + (extra ? " :: " + extra : "")); }
}

try {
  await connect();

  /* ---------- Ca 1: bước cảnh báo ---------- */
  await goto();
  let t = await text();
  check("01. Ca 1 mở mặc định, có thanh giữ tiền", t.includes("Đang giữ an toàn") && t.includes("15.000.000"));
  check("02. Thẻ bằng chứng nêu dấu hiệu cụ thể", (await chat()).includes("mở 2 ngày") && (await chat()).includes("3 lệnh chuyển trong 10 phút"));
  check("03. Có nhãn Trợ lý AI", (await ev("return document.querySelectorAll('.ai-label').length")) >= 1);
  check("04. Bước 0 không có nút nhả tiền trực tiếp", !(await actions()).some(a => a === "release"), JSON.stringify(await actions()));
  check("05. Không có API key / OTP thật trong DOM", !/sk-[A-Za-z0-9]{10,}/.test(t) && !/OTP\s*[:=]\s*\d{4,}/.test(t));

  /* ---------- Ca 1: xin mở chặn ---------- */
  await click('[data-act="scam:attempt"]');
  t = await text();
  check("06. AI từ chối nhả tiền, nêu mức Cần người duyệt", t.includes("Mình chưa thể mở chặn") && t.includes("Cần người duyệt"));
  check("07. Không có nút nhả tiền ngay sau khi xin mở chặn", !(await actions()).some(a => /release|nha_giao_dich:do/.test(a)));
  await click('[data-act="modal:approve"]');
  t = await text();
  check("08. Hộp duyệt trả lời đủ 5 câu", ["Ai duyệt", "Dựa trên", "Thời gian chờ", "Quá hạn", "Đảo ngược"].every(k => t.includes(k)));
  check("09. Hộp duyệt nói rõ AI không tự nhả tiền", t.includes("AI không thể tự nhả giao dịch"));
  await click('[data-act="modal:submit"]');
  t = await text();
  check("10. Một chạm sang tư vấn viên, có tóm tắt ngữ cảnh", t.includes("Đã chuyển chuyên viên tư vấn") && t.includes("không cần kể lại"));
  check("11. Trạng thái chip đổi sang đã chuyển", t.includes("Đã chuyển tư vấn viên"));

  /* ---------- Hoàn tác giữ tiền ---------- */
  await goto();
  await click('[data-act="undo"]');
  t = await text();
  check("12. Hoàn tác giữ tiền được, tiền vẫn chưa đi", t.includes("Đã bỏ tạm giữ") && t.includes("vẫn cần chuyên viên duyệt"));

  /* ---------- Ca 2: viện phí ---------- */
  await goto();
  await click('[data-scenario="hospital"]');
  t = await text();
  check("13. Ca viện phí có đường ưu tiên ≤ 2 phút", t.includes("Ưu tiên khẩn cấp") && t.includes("2 phút"));
  await click('[data-act="hospital:1"]');
  await click('[data-act="hospital:2"]');
  t = await text();
  check("14. Ca viện phí chuyển được chuyên viên, không bắt chờ 24h", t.includes("Chuyên viên đã nhận hồ sơ khẩn cấp") && !t.includes("chờ 24 giờ"));

  /* ---------- Ca 3: bình thường ---------- */
  await goto();
  await click('[data-scenario="normal"]');
  t = await text();
  check("15. Ca bình thường không cảnh báo đỏ, không tạm giữ", t.includes("không bị tạm giữ") && !t.includes("Rủi ro cao"));
  await click('[data-act="normal:1"]');
  t = await chat();
  check("16. Ca bình thường đi thẳng, không chờ duyệt", t.includes("Đã chuyển 200.000") && !t.includes("Cần người duyệt"));

  /* ---------- Ca 4: đủ 3 mức tự chủ ---------- */
  await goto();
  await click('[data-scenario="outscope"]');
  t = await text();
  check("17. Ca 4 có mức Cấm, không có nút thực hiện", t.includes("Cấm") && t.includes("không thể thực hiện qua chat"));
  check("18. Ca 4 có 2 mức khoá ví trên cùng màn", t.includes("Tạm khoá 24 giờ") && t.includes("Khoá vĩnh viễn") && t.includes("Cần người duyệt"));
  await click('[data-act="outscope:lock"]');
  t = await text();
  check("19. Tạm khoá ví là Tự làm + có Mở khoá (hoàn tác)", t.includes("Đã tạm khoá ví · 24 giờ") && t.includes("Mở khoá"));
  await click('[data-act="undo"]');
  t = await text();
  check("20. Mở khoá hoàn tác được, ví về bình thường", t.includes("Ví đang hoạt động bình thường"));
  await click('[data-act="outscope:lock"]');
  await click('[data-act="modal:lock"]');
  t = await text();
  check("21. Khoá vĩnh viễn chỉ mở hộp duyệt, nêu không đảo ngược", t.includes("Yêu cầu khoá ví vĩnh viễn") && t.includes("Không — mở lại phải ra quầy"));
  await click('[data-act="modal:submit"]');
  t = await text();
  check("22. Gửi yêu cầu khoá vĩnh viễn xong vẫn giữ tạm khoá", t.includes("Đã gửi yêu cầu khoá ví vĩnh viễn") && t.includes("tạm khoá 24 giờ"));

  /* ---------- Chạy lại + ảnh đánh số ---------- */
  await goto();
  await click('[data-scenario="hospital"]');
  await click('#restartBtn');
  t = await text();
  check("23. Chạy lại kịch bản đưa về bước 0", t.includes("Mẹ tôi đang cấp cứu") && !t.includes("Đang mở luồng xác thực"));

  await goto("?shot=1&s=scam&step=0&marks=1,2,3");
  const marks1 = await ev("return [...document.querySelectorAll('.mark')].map(m=>m.textContent).sort()");
  check("24. Ảnh 1 vẽ đúng 3 marker (1)(2)(3)", JSON.stringify(marks1) === JSON.stringify(["1", "2", "3"]), JSON.stringify(marks1));

  await goto("?shot=1&s=scam&step=1&modal=approve&marks=4,5,6");
  const marks2 = await ev("return [...document.querySelectorAll('.mark')].map(m=>m.textContent).sort()");
  check("25. Ảnh 2 vẽ đúng 3 marker (4)(5)(6)", JSON.stringify(marks2) === JSON.stringify(["4", "5", "6"]), JSON.stringify(marks2));

  /* ---------- Nhãn AI, mạng, console ---------- */
  await goto();
  const labelCheck = await ev(`
    var rows=[...document.querySelectorAll('.row--ai')];
    return rows.every(function(r){ return !!r.querySelector('.ai-label') || !!r.querySelector('.card'); });
  `);
  check("26. Mọi bong bóng AI đều có nhãn Trợ lý AI (thẻ bằng chứng là tệp đính kèm)", labelCheck);
  const external = events.requests.filter(u => !u.startsWith("file:") && !u.startsWith("data:"));
  check("27. Không có request mạng ngoài", external.length === 0, external.join(", "));
  check("28. Không có lỗi JS/console", events.errors.length === 0, events.errors.join(" | "));

  /* ---------- Không nút chết ---------- */
  await goto();
  const dead = [];
  for (const sc of ["scam", "hospital", "normal", "outscope"]) {
    await goto();
    await click(`[data-scenario="${sc}"]`);
    const acts = await actions();
    for (const a of acts) {
      if (a.startsWith("modal:")) continue;
      const before = await text();
      await click(`[data-act="${a}"]`);
      const after = await text();
      if (before === after) dead.push(sc + ":" + a);
      await goto();
      await click(`[data-scenario="${sc}"]`);
    }
  }
  check("29. Không có nút chết ở bước 0 của cả 4 ca", dead.length === 0, dead.join(", "));

  /* ---------- Không tràn khung ở 390×844 ---------- */
  await goto("?shot=1&s=scam&step=0&marks=1,2,3");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: false });
  await sleep(200);
  const overflow = await ev(`
    var bad=[];
    document.querySelectorAll('.phone *').forEach(function(el){
      var r=el.getBoundingClientRect();
      if (r.width && (r.right > 391 || r.left < -1)) bad.push(el.className || el.tagName);
    });
    return { doc: document.documentElement.scrollWidth, bad: bad.slice(0,5) };
  `);
  check("30. Không tràn ngang ở khung 390×844", overflow.doc <= 391 && overflow.bad.length === 0, JSON.stringify(overflow));

  console.log(`\n===== ${pass} PASS · ${fail} FAIL =====`);
  process.exitCode = fail ? 1 : 0;
} catch (err) {
  console.error("HARNESS ERROR:", err);
  process.exitCode = 2;
} finally {
  try { ws && ws.close(); } catch {}
  chrome.kill();
  await sleep(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
