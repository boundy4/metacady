'use strict';
// METACADY VIEWER: 현장용 도면 보기 — 스마트폰 · 태블릿 우선. METACADY의 DWG · DXF 읽기(dwg.js · dxf.js)와 도면 그리기(view.js · entities.js)를 그대로 쓴다
(function (CAD) {
  const view = CAD.view;
  const viewer = CAD.viewer = { version: '0.30', BUILD_DATE: '2026.9',
    // 개발 이력 (최신 버전이 맨 위)
    HISTORY: [
      { v: '0.30', date: '2026.9', items: [
        ['3단계 — 웹 공개', '난독화 웹 배포본(dist/web/viewer/index.html)을 GitHub Pages(boundy4.github.io/metacady/viewer/)에 올려 블로그 v.metacady.com 글에 화면 가득 끼움. 블로그에 붙일 글 HTML · 테마 CSS · 모바일 설정 안내(dist/web/VIEWER-BLOG.txt) 자동 생성'],
        ['크게 보기 단추', '위쪽 줄 [⛶] — 블로그 안에서도 블로그 틀 없이 화면 전체로 보기. 전체 화면을 지원하지 않는 아이폰에서는 뷰어만 새 창으로 열기'],
        ['공유 미리보기', '카카오톡 · 문자로 주소를 보낼 때 나오는 제목 · 설명(og 태그) 추가'],
        ['프로그램 이름', '화면 제목을 BOUNDY METACADY VIEWER로 (BOUNDY 회색 · METACADY VIEWER 파란색) — 위쪽 제목 줄 · 첫 화면 로고 · 브라우저 탭 · 공유 미리보기 · 도움말. 좁은 휴대폰에서도 한 줄로 보이게 화면 폭에 맞춰 글자 크기 조절, 제목 줄에 자리가 모자라는 휴대폰(폭 520px 이하)에서는 파일 이름을 도면 왼쪽 위 이름표로 옮김'],
        ['휴대폰 가로 화면', '휴대폰을 가로로 돌리면 아래 단추 줄이 오른쪽 세로 줄로 옮겨 가고 제목 줄이 얇아져 도면 자리가 넓어짐, 치수 카드는 오른쪽에 좁게. 돌릴 때 전체 보기 상태였으면 새 화면에 맞춰 다시 전체 보기, 확대해 보던 중이면 보던 자리를 가운데에 그대로 유지(선택 · 거리 재기 표시도 그대로). 도움말에 "자동 회전" 켜기 안내 추가']
      ] },
      { v: '0.20', date: '2026.9', items: [
        ['2단계 — 탭해서 치수 보기', '선 · 원 · 호 · 이어진 선 · 타원 · 문자 · 치수를 톡 누르면 아래 카드에 큰 글씨로 치수 표시 (선: 길이 · 각도 · 가로/세로 거리, 원: 지름 · 반지름 · 둘레, 호: 반지름 · 호 길이 · 중심각 · 현 길이, 이어진 선: 누른 구간 길이 · 전체 길이 · 닫혔으면 넓이). 화면에서 잰 값이 아니라 도면 좌표로 계산하고, 블록 속 선도 블록 배율을 반영한 실제 크기로 계산'],
        ['오토캐드 치수', 'DWG · DXF 치수(블록으로 들어오는 치수)의 선이나 글자를 누르면 도면에 적힌 치수 글자를 먼저 보여 줌'],
        ['손가락 선택', '누른 자리 둘레 24px 안의 선을 모두 찾아 가까운 순으로 고르고, 겹친 선은 카드의 [다른 선 ▸ 1/3] 단추로 차례로 바꿔 봄. 속이 찬 채움 · 빗금은 선보다 뒤 순서'],
        ['두 점 거리 재기', '[거리 재기] 단추 → 두 점을 누르면 거리 · 가로/세로 거리 · 각도. 끝점 · 중간점 · 중심 · 사분점 · 교차점에 착 붙음(초록 표시, 몇 픽셀 안에 점이 겹치면 중심 → 끝점 → 교차점 순으로 우선). 두 번째 점을 선 위 아무 곳에 누르면 첫 점에서 그 선(연장선)까지의 직각 거리 — 나란한 두 선 사이 거리. 붙지 않은 점이 있으면 빨간 표시와 함께 "근사값" 경고']
      ] },
      { v: '0.10', date: '2026.9', items: [
        ['1단계 — 기본 뷰어', 'DWG(AutoCAD 2004 ~ 2018 형식 · 캐디안 포함) · DXF · MCD 열기, 스마트폰 우선 화면(위 제목 줄 · 아래 엄지 단추 줄), 첫 화면 안내 "오토캐드나 캐디안의 파일을 열 수 있어요."'],
        ['터치 조작', '한 손가락 끌기 = 이동, 두 손가락 벌리기 · 오므리기 = 확대 · 축소(손가락 사이 지점 기준), 두 번 톡톡 = 전체 보기. 브라우저 화면 전체가 확대되거나 당겨서 새로고침되지 않게 막음. 큰 도면은 움직이는 동안 그려 둔 그림을 옮기고 손을 떼면 다시 그려 끊김 없이 움직임'],
        ['레이어 · 밝기', '레이어별 켜기 · 끄기(모두 켜기 · 모두 끄기), 밝은 화면(기본, 햇빛 아래용) · 어두운 화면 전환. PC에서는 마우스 끌기 · 휠 확대, 파일 끌어다 놓기']
      ] }
    ]
  };
  const $ = id => document.getElementById(id);
  const baseName = n => String(n || '').replace(/\.(mcd|mcad|dxf|dwg|json)$/i, '');
  let toastTimer = 0;
  const toast = (msg, ms = 2600) => { const t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), ms); };
  viewer.toast = toast;

  // ---------- 밝기(테마) ----------
  const THEME_KEY = 'metacady.viewer.theme';
  function setTheme(dark) {
    view.dark = dark; document.documentElement.classList.toggle('dark', dark);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = dark ? '#161a20' : '#ffffff';
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (e) { /* 저장 불가 환경 */ }
    view.invalidate();
  }

  // ---------- 파일 열기 ----------
  // 휴대폰 메신저로 받은 파일은 이름(확장자)이 바뀌어 오기도 해서, 확장자보다 파일 내용으로 종류를 판단한다
  function kindOf(name, buf) {
    const u8 = new Uint8Array(buf, 0, Math.min(buf.byteLength, 64)), head = String.fromCharCode.apply(null, u8);
    if (/^AC10\d\d/.test(head)) return 'dwg';
    if (/^\s*\{/.test(head)) return 'mcd';
    const ext = (String(name).split('.').pop() || '').toLowerCase();
    if (ext === 'dwg' || ext === 'dxf') return ext;
    if (ext === 'mcd' || ext === 'mcad' || ext === 'json') return 'mcd';
    return /^\s*0\s*[\r\n]/.test(head) || /SECTION/.test(head) ? 'dxf' : null;
  }
  viewer.openBuffer = (name, buf) => {
    const kind = kindOf(name, buf);
    if (!kind) throw new Error('도면 파일이 아니에요. DWG · DXF · MCD 파일을 골라 주세요.');
    if (kind === 'mcd') {
      const p = CAD.projectFromJSON(new TextDecoder('utf-8').decode(buf));
      p.sheets.forEach(s => { s.fade = false; }); if (p.sheets.length === 1) p.sheets[0].doc.fileName = baseName(name);
      CAD.loadProject(p);
    } else {
      const d = kind === 'dwg' ? CAD.dwg.parse(buf) : CAD.dxf.parse(buf); d.fileName = baseName(name);
      CAD.sheets = [{ doc: d, visible: true, fade: false }]; CAD.doc = d;
    }
    CAD.emit('layers'); CAD.emit('change'); clearSel(); if (meas.on) setMeasure(true);
    $('welcome').classList.add('hidden'); $('fileName').textContent = $('fileChip').textContent = baseName(name); $('fileChip').classList.remove('hidden'); document.title = baseName(name) + ' — BOUNDY METACADY VIEWER';
    viewer.fit();
    const d = CAD.doc, n = CAD.sheets.reduce((a, s) => a + s.doc.ents.length, 0);
    return { kind, ents: n, layers: d.layers.length, failed: (d.stats && d.stats.failed) || 0, dwgVersion: d.dwgVersion };
  };
  async function openFile(f) {
    if (!f) return;
    $('busy').classList.add('on');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); // '여는 중' 표시가 먼저 화면에 나오게
    try {
      const r = viewer.openBuffer(f.name, await f.arrayBuffer());
      toast(r.ents ? `도면을 열었어요 · 객체 ${r.ents.toLocaleString()}개 · 레이어 ${r.layers}개` + (r.failed ? ` (읽지 못한 객체 ${r.failed}개)` : '') : '도면은 열렸지만 그릴 객체가 없어요.');
    } catch (e) {
      console.error(e); toast('이 파일은 열 수 없어요. ' + (e.message || ''), 6000);
    } finally { $('busy').classList.remove('on'); }
  }
  const pickFile = () => { const inp = $('fileOpen'); inp.value = ''; inp.click(); };

  // ---------- 화면 조작 (터치 · 펜 · 마우스 공통: Pointer Events) ----------
  // 그리기가 느린 큰 도면은 손가락이 움직이는 동안 마지막으로 그린 그림을 CSS 변환으로만 옮기고, 멈추거나 손을 떼면 다시 그린다
  let snap = null; // 마지막으로 실제로 그렸을 때의 { cx, cy, scale }
  const baseRender = view.render.bind(view);
  view.render = () => {
    if (snap && (snap.cx !== view.cx || snap.cy !== view.cy || snap.scale !== view.scale)) view.dirty.scene = view.dirty.sel = view.dirty.over = true;
    baseRender(); snap = { cx: view.cx, cy: view.cy, scale: view.scale };
    for (const c of view.cv) c.style.transform = '';
  };
  const SMIN = 1e-9, SMAX = 1e7;
  let settleTimer = 0;
  function preview() {
    clearTimeout(settleTimer);
    if (!snap || view.lastMs < 14) { view.invalidate(); return; } // 빠르게 그려지는 도면은 그대로 다시 그린다
    const k = view.scale / snap.scale, tx = view.w / 2 * (1 - k) + (snap.cx - view.cx) * view.scale, ty = view.h / 2 * (1 - k) + (view.cy - snap.cy) * view.scale;
    const t = `matrix(${k},0,0,${k},${tx},${ty})`; for (const c of view.cv) c.style.transform = t;
    settleTimer = setTimeout(() => view.invalidate(), 220); // 잠깐 멈추면 선명하게 다시 그린다
  }
  // 휴대폰을 돌리거나 창 크기가 바뀔 때: 전체 보기 상태였으면 새 화면에 맞춰 다시 전체 보기, 확대해 보던 중이면 보던 자리를 가운데 그대로
  let fitted = true;
  const baseResize = view.resize.bind(view);
  view.resize = () => { baseResize(); if (fitted && CAD.sheets && CAD.sheets.some(s => s.doc.ents.length)) viewer.fit(); };
  viewer.fit = () => { fitted = true; fitAll(); };
  const fitAll = () => { if (CAD.sheets.some(s => s.doc.ents.length)) { let bb = null; for (const s of CAD.sheets) if (s.visible) bb = CAD.geom.bbUnion(bb, s.doc.extents()); if (bb) view.zoomRect(bb); else view.zoomExtents(); } else view.zoomExtents(); };

  const pts = new Map(); let g = null, lastTap = null, lastType = 'touch';
  const rel = e => { const r = view.wrap.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function startGesture() {
    const a = Array.from(pts.values()), base = { cx: view.cx, cy: view.cy, scale: view.scale };
    if (a.length >= 2) { const m = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 }; g = { n: 2, base, mid: m, dist: Math.max(1, Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y)), moved: true }; }
    else if (a.length === 1) g = { n: 1, base, p: { ...a[0] }, t: performance.now(), moved: g ? g.moved : false, ptype: lastType };
    else g = null;
  }
  function onDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    view.wrap.setPointerCapture(e.pointerId); pts.set(e.pointerId, rel(e)); lastType = e.pointerType || 'touch';
    const fresh = pts.size === 1; if (fresh) g = null; startGesture(); if (fresh && g) g.moved = false;
  }
  function onMove(e) {
    if (!pts.has(e.pointerId) || !g) return;
    pts.set(e.pointerId, rel(e)); const a = Array.from(pts.values()), b = g.base;
    if (g.n === 2 && a.length >= 2) {
      const m = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 }, dist = Math.max(1, Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y));
      const s = Math.min(SMAX, Math.max(SMIN, b.scale * dist / g.dist));
      const wx = (g.mid.x - view.w / 2) / b.scale + b.cx, wy = (view.h / 2 - g.mid.y) / b.scale + b.cy; // 처음 두 손가락 사이에 있던 도면 위치
      view.scale = s; view.cx = wx - (m.x - view.w / 2) / s; view.cy = wy + (m.y - view.h / 2) / s;
    } else if (g.n === 1) {
      const dx = a[0].x - g.p.x, dy = a[0].y - g.p.y; if (!g.moved && Math.hypot(dx, dy) < 8) return; g.moved = true;
      view.cx = b.cx - dx / b.scale; view.cy = b.cy + dy / b.scale;
    } else return;
    fitted = false; preview();
  }
  function onUp(e) {
    if (!pts.has(e.pointerId)) return;
    const was = g; pts.delete(e.pointerId);
    if (pts.size) { startGesture(); if (g) g.moved = true; return; } // 두 손가락 중 하나만 뗐을 때 튀지 않게 남은 손가락 기준으로 다시 시작
    g = null; clearTimeout(settleTimer); view.invalidate();
    if (e.type === 'pointerup' && was && was.n === 1 && !was.moved && performance.now() - was.t < 500) { // 톡 누름
      const p = was.p, now = performance.now();
      if (meas.on) { measureTap(p, was.ptype); return; } // 거리 재기 중에는 두 번 톡톡도 점 두 개로 쓴다
      if (lastTap && now - lastTap.t < 380 && Math.hypot(p.x - lastTap.x, p.y - lastTap.y) < 40) { lastTap = null; viewer.fit(); }
      else { lastTap = { t: now, x: p.x, y: p.y }; selectTap(p, was.ptype); }
    }
  }
  function onWheel(e) {
    e.preventDefault(); const p = rel(e), f = Math.exp(-(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) * 0.0015);
    const w = view.toWorld(p.x, p.y); view.scale = Math.min(SMAX, Math.max(SMIN, view.scale * f));
    view.cx = w.x - (p.x - view.w / 2) / view.scale; view.cy = w.y + (p.y - view.h / 2) / view.scale; fitted = false; preview();
    clearTimeout(settleTimer); settleTimer = setTimeout(() => view.invalidate(), 120);
  }

  // ---------- 2단계: 탭해서 치수 보기 · 두 점 거리 재기 ----------
  // 치수는 화면에서 잰 값이 아니라 도면에 저장된 좌표로 계산한다. 블록 안의 선도 실제 위치 · 크기(블록 배율 반영)로 풀어서 잰다
  const E = CAD.ent, G = CAD.geom;
  const TOL = { touch: 24, pen: 14, mouse: 9 }; // 손가락은 굵으니 넉넉하게 (화면 픽셀)
  const HL = { color: 'rgba(255,106,0,0.85)', lw: 5, dash: null, aci: 30, layerName: '0' }; // 선택 강조 — 흰 바탕 · 검은 바탕 모두에서 잘 보이는 주황
  const layerOn = (doc, name) => { const L = doc.layer(name); return !L || L.on; };
  const num = (v, dec = 2) => { if (Math.abs(v - Math.round(v)) < 1e-6) v = Math.round(v); return (+v).toLocaleString('ko-KR', { maximumFractionDigits: dec }); };
  const angTxt = a => num(G.deg(G.norm(a)), 2) + '°';
  const isDimBlock = e => e.type === 'INSERT' && (e._dimBlock || /^\*D/i.test(e.name || ''));
  const cleanTxt = s => String(s || '').replace(/\s+/g, ' ').trim();
  let sel = null; // { list: 후보[], i: 지금 보여 주는 후보 }
  const meas = { on: false, a: null, b: null }; // 두 점 거리 재기

  // 누른 자리 근처의 객체(블록은 속까지 풀어서)를 모은다: [{ e, doc, d, dimTexts }]
  function gather(w, tol) {
    const box = [w.x - tol, w.y - tol, w.x + tol, w.y + tol], out = [];
    const visit = (e, doc, depth, dimTexts) => {
      if (!layerOn(doc, e.layer) || !G.bbOverlap(E.bbox(e), box)) return;
      if (e.type === 'INSERT') {
        if (depth > 8) return; const subs = E.explode(e) || [], dim = isDimBlock(e);
        const texts = dim ? subs.filter(s => s.type === 'TEXT').map(s => cleanTxt(s.text)).filter(Boolean) : dimTexts;
        for (const s of subs) visit(s, doc, depth + 1, texts);
        return;
      }
      out.push({ e, doc, d: E.dist(e, w.x, w.y), dimTexts });
    };
    for (const s of CAD.sheets) { if (!s.visible) continue; E.ctxDoc = s.doc; for (const e of s.doc.ents) visit(e, s.doc, 0, null); }
    E.ctxDoc = null; return out;
  }
  function pick(sx, sy, ptype) {
    const tol = (TOL[ptype] || TOL.touch) / view.scale, w = view.toWorld(sx, sy);
    // 빗금 · 채움 · 문자는 선보다 뒤로 (속이 찬 빗금 안을 누르면 거리 0이라 선을 가리지 않게)
    const rank = c => c.d + (c.e.type === 'HATCH' ? tol * 0.9 : c.e.type === 'TEXT' ? tol * 0.3 : 0);
    return gather(w, tol).filter(c => c.d <= tol).sort((a, b) => rank(a) - rank(b)).slice(0, 12);
  }

  // 객체 종류별로 보여 줄 값: { title, main, rows: [[이름, 값]] }
  function describe(c, w) {
    const e = c.e, rows = []; let title = E.NAMES[e.type] || e.type, main = '';
    if (e.type === 'LINE') {
      const L = G.dist(e.x1, e.y1, e.x2, e.y2), a = Math.atan2(e.y2 - e.y1, e.x2 - e.x1);
      main = num(L); rows.push(['각도', angTxt(a)], ['가로 거리', num(Math.abs(e.x2 - e.x1))], ['세로 거리', num(Math.abs(e.y2 - e.y1))]);
      title = '선 길이';
    } else if (e.type === 'CIRCLE') {
      title = '원'; main = 'Ø ' + num(e.r * 2); rows.push(['반지름', 'R ' + num(e.r)], ['둘레', num(2 * Math.PI * e.r)]);
    } else if (e.type === 'ARC') {
      const sw = G.norm(e.a2 - e.a1) || 2 * Math.PI, a = { x: e.cx + e.r * Math.cos(e.a1), y: e.cy + e.r * Math.sin(e.a1) }, b = { x: e.cx + e.r * Math.cos(e.a2), y: e.cy + e.r * Math.sin(e.a2) };
      title = '호'; main = 'R ' + num(e.r); rows.push(['지름', 'Ø ' + num(e.r * 2)], ['호 길이', num(e.r * sw)], ['중심각', num(G.deg(sw)) + '°'], ['현 길이', num(G.dist(a.x, a.y, b.x, b.y))]);
    } else if (e.type === 'PLINE') {
      const pr = E.prims(e); let best = null, bd = Infinity, total = 0;
      for (const p of pr) { total += G.primLen(p); const d = G.primDist(p, w.x, w.y); if (d < bd) { bd = d; best = p; } }
      title = '이어진 선';
      if (best && best.t === 'L') { main = num(G.primLen(best)); rows.push(['누른 구간', '직선'], ['구간 각도', angTxt(Math.atan2(best.y2 - best.y1, best.x2 - best.x1))]); }
      else if (best) { main = 'R ' + num(best.r); rows.push(['누른 구간', '호'], ['호 길이', num(G.primLen(best))], ['지름', 'Ø ' + num(best.r * 2)]); }
      rows.push(['전체 길이', num(total)], ['꼭짓점', e.pts.length + '개']);
      if (e.closed) rows.push(['넓이', num(Math.abs(E.plineArea(e)))]);
    } else if (e.type === 'ELLIPSE') {
      const A = Math.hypot(e.mx, e.my) * 2; title = '타원'; main = num(A) + ' × ' + num(A * e.ratio); rows.push(['긴 지름', num(A)], ['짧은 지름', num(A * e.ratio)]);
    } else if (e.type === 'TEXT') {
      title = '문자'; main = cleanTxt(e.text) || '(빈 문자)'; rows.push(['글자 높이', num(e.h)]);
    } else if (e.type === 'DIM') {
      const g = E.dimGeom(e); title = '치수'; main = cleanTxt(g.str); rows.push(['실제 측정값', num(g.meas) + (e.kind === 'ang' ? '°' : '')]);
    } else if (e.type === 'POINT') {
      title = '점'; main = num(e.x) + ', ' + num(e.y);
    } else if (e.type === 'HATCH') {
      title = e.pat === 'SOLID' ? '채움' : '빗금'; main = e.pat === 'SOLID' ? '속이 찬 면' : (e.pat || '무늬');
    }
    if (c.dimTexts) { // 오토캐드 치수(블록으로 들어옴) 속의 선이나 글자를 눌렀을 때 — 도면에 적힌 치수를 앞에 보여 준다
      const written = c.dimTexts.join(' / ');
      if (written) { rows.unshift(['누른 선', title + (main ? ' ' + main : '')]); title = '치수'; main = written; rows.push(['설명', '도면에 적힌 치수입니다']); }
    }
    rows.push(['레이어', e.layer || '0']);
    return { title, main, rows };
  }

  // 두 점 거리 재기: 끝점 · 중간점 · 중심 · 사분점 · 교차점 · (두 번째 점) 직교점에 착 붙는다
  const SNAP_NAME = { end: '끝점', mid: '중간점', cen: '중심', qua: '원의 사분점', int: '교차점', per: '직각으로 만나는 점', nod: '점', perl: '선까지 직각 거리', perc: '원까지 가장 가까운 거리' };
  const SNAP_RANK = { cen: 0, end: 1, nod: 1, int: 2, mid: 3, qua: 4, per: 5 };
  function snapAt(sx, sy, ptype, base) {
    const tolPx = (TOL[ptype] || TOL.touch) * 1.25, tol = tolPx / view.scale, w = view.toWorld(sx, sy);
    const near = gather(w, tol), pts = [], prims = [];
    for (const c of near) {
      for (const s of E.snaps(c.e)) pts.push(s);
      if (prims.length < 30) prims.push(...E.prims(c.e).filter(p => G.primDist(p, w.x, w.y) <= tol));
    }
    for (let i = 0; i < prims.length; i++) for (let j = i + 1; j < prims.length; j++) for (const r of G.intPrims(prims[i], prims[j])) pts.push({ x: r.x, y: r.y, k: 'int' });
    if (base) for (const p of prims) if (p.t === 'L') { const t = G.primParam(p, base.x, base.y, false); if (t >= 0 && t <= 1) { const q = G.primPoint(p, t); pts.push({ x: q.x, y: q.y, k: 'per' }); } }
    // 손가락으로는 몇 픽셀 차이를 가려 누를 수 없으니, 가장 가까운 점 둘레 6px 안에 점이 여럿이면 설계에서 의미 있는 점(중심 → 끝점 → 교차점 …)을 고른다
    let bd = Infinity; for (const p of pts) if (SNAP_NAME[p.k]) bd = Math.min(bd, G.dist(p.x, p.y, w.x, w.y));
    if (!(bd <= tol)) {
      // 두 번째 점을 선이나 원 위 아무 데나 눌렀으면: 첫 점에서 그 선(연장선)까지의 직각 거리 — 누른 위치와 상관없이 정확하다
      if (base) {
        let near1 = null, nd = Infinity; for (const p of prims) { const d = G.primDist(p, w.x, w.y); if (d < nd) { nd = d; near1 = p; } }
        if (near1 && near1.t === 'L') {
          const dx = near1.x2 - near1.x1, dy = near1.y2 - near1.y1, L2 = dx * dx + dy * dy;
          if (L2 > 0) { const t = ((base.x - near1.x1) * dx + (base.y - near1.y1) * dy) / L2; return { x: near1.x1 + dx * t, y: near1.y1 + dy * t, k: 'perl', snapped: true }; }
        } else if (near1) {
          const a = Math.atan2(base.y - near1.cy, base.x - near1.cx); return { x: near1.cx + near1.r * Math.cos(a), y: near1.cy + near1.r * Math.sin(a), k: 'perc', snapped: true };
        }
      }
      return { x: w.x, y: w.y, snapped: false };
    }
    const lim = bd + 6 / view.scale; let best = null;
    for (const p of pts) {
      if (!SNAP_NAME[p.k]) continue; const d = G.dist(p.x, p.y, w.x, w.y); if (d > lim) continue;
      if (!best || SNAP_RANK[p.k] < SNAP_RANK[best.k] || (SNAP_RANK[p.k] === SNAP_RANK[best.k] && d < best.d)) best = { ...p, d };
    }
    return { x: best.x, y: best.y, k: best.k, snapped: true };
  }

  // 정보 카드
  function showCard(info, extra) {
    const card = $('card'); $('cardTitle').textContent = info.title; $('cardMain').textContent = info.main;
    $('cardRows').replaceChildren(...info.rows.map(([k, v]) => h('div', { class: String(v).length + k.length > 13 ? 'row wide' : 'row' }, h('span', null, k), h('b', null, String(v)))));
    $('cardWarn').textContent = extra && extra.warn || ''; $('cardWarn').classList.toggle('hidden', !(extra && extra.warn));
    const n = sel ? sel.list.length : 0; $('cardNext').classList.toggle('hidden', n < 2); if (n > 1) $('cardNext').textContent = `다른 선 ▸ ${sel.i + 1}/${n}`;
    card.classList.remove('hidden');
  }
  const hideCard = () => $('card').classList.add('hidden');
  function clearSel() { sel = null; hideCard(); view.invalidate('over'); }
  viewer.clearSel = clearSel;
  function selectTap(p, ptype) {
    const list = pick(p.x, p.y, ptype);
    if (!list.length) { clearSel(); return; }
    sel = { list, i: 0, w: view.toWorld(p.x, p.y) }; showSel();
  }
  function showSel() { const c = sel.list[sel.i]; showCard(describe(c, sel.w)); view.invalidate('over'); }
  viewer.tapAt = (x, y, ptype = 'touch') => (meas.on ? measureTap({ x, y }, ptype) : selectTap({ x, y }, ptype), viewer.state());
  viewer.next = () => { if (sel) { sel.i = (sel.i + 1) % sel.list.length; showSel(); } return viewer.state(); };
  viewer.picked = () => sel && sel.list[sel.i];
  viewer.state = () => ({ sel: sel ? { n: sel.list.length, i: sel.i, type: sel.list[sel.i].e.type, card: { title: $('cardTitle').textContent, main: $('cardMain').textContent, rows: Array.from($('cardRows').children).map(r => r.textContent) } } : null, meas: { on: meas.on, a: meas.a, b: meas.b, warn: $('cardWarn').textContent } });

  function setMeasure(on) {
    meas.on = on; meas.a = meas.b = null; $('btnMeasure').classList.toggle('act', on); sel = null; hideCard();
    $('guide').classList.toggle('hidden', !on); if (on) $('guide').textContent = '첫 번째 점을 누르세요';
    view.invalidate('over');
  }
  function measureTap(p, ptype) {
    if (meas.a && meas.b) { meas.a = meas.b = null; hideCard(); }
    const q = snapAt(p.x, p.y, ptype, meas.a);
    if (!meas.a) { meas.a = q; $('guide').textContent = (q.snapped ? SNAP_NAME[q.k] + '에 붙었어요. ' : '') + '두 번째 점을 누르세요'; }
    else {
      meas.b = q; const a = meas.a, dx = q.x - a.x, dy = q.y - a.y;
      $('guide').textContent = '다시 누르면 새로 재요';
      const unsnapped = !a.snapped || !q.snapped;
      showCard({ title: '두 점 거리', main: num(Math.hypot(dx, dy)), rows: [['가로 거리', num(Math.abs(dx))], ['세로 거리', num(Math.abs(dy))], ['각도', angTxt(Math.atan2(dy, dx))],
        ['첫 번째 점', a.snapped ? SNAP_NAME[a.k] : '누른 위치'], ['두 번째 점', q.snapped ? SNAP_NAME[q.k] : '누른 위치']] },
        unsnapped ? { warn: '선 끝이나 중심에 붙지 않은 점이 있어서 근사값이에요. 확대해서 선 끝 가까이를 누르면 정확해져요.' } : null);
    }
    view.invalidate('over');
  }

  // 선택 강조 · 재기 표시 (view.js가 맨 위 캔버스를 그릴 때 부른다)
  CAD.input = { drawOverlay(c, P, V) {
    if (sel) {
      const e = sel.list[sel.i].e; E.draw(e, P, V, () => HL, null);
      c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(255,106,0,1)'; c.lineWidth = 2.5; c.setLineDash([]);
      for (const s of E.snaps(e)) if (s.k === 'end' || s.k === 'cen') { const q = view.toScreen(s.x, s.y); c.beginPath(); c.arc(q.x, q.y, 5, 0, 2 * Math.PI); c.fill(); c.stroke(); }
    }
    if (meas.on && meas.a) {
      const A = view.toScreen(meas.a.x, meas.a.y), B = meas.b ? view.toScreen(meas.b.x, meas.b.y) : null;
      if (B) { c.strokeStyle = 'rgba(255,106,0,0.95)'; c.lineWidth = 3; c.setLineDash([10, 6]); c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke(); c.setLineDash([]); }
      for (const [q, pt] of [[A, meas.a], [B, meas.b]]) {
        if (!q) continue; c.lineWidth = 3; c.strokeStyle = pt.snapped ? '#00b050' : '#ff3b30'; c.fillStyle = '#ffffff';
        c.beginPath(); c.arc(q.x, q.y, 9, 0, 2 * Math.PI); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(q.x - 14, q.y); c.lineTo(q.x + 14, q.y); c.moveTo(q.x, q.y - 14); c.lineTo(q.x, q.y + 14); c.stroke();
      }
    }
  } };

  // ---------- 아래에서 올라오는 창 ----------
  const h = (tag, attrs, ...kids) => { const el = document.createElement(tag); for (const k in attrs || {}) { if (k.startsWith('on')) el.addEventListener(k.slice(2), attrs[k]); else el.setAttribute(k, attrs[k]); } for (const c of kids.flat()) if (c != null) el.append(c); return el; };
  function openSheet(title, body) { $('sheetTitle').textContent = title; const b = $('sheetBody'); b.replaceChildren(body); b.scrollTop = 0; $('sheet').classList.remove('hidden'); }
  const closeSheet = () => $('sheet').classList.add('hidden');

  function layersSheet() {
    const layers = []; const seen = new Set();
    for (const s of CAD.sheets) for (const L of s.doc.layers) if (!seen.has(L.name)) { seen.add(L.name); layers.push(L); }
    if (!CAD.sheets.some(s => s.doc.ents.length)) { toast('먼저 도면 파일을 열어 주세요.'); return; }
    const setOn = (name, on) => { for (const s of CAD.sheets) { const L = s.doc.layer(name); if (L) L.on = on; } };
    const list = h('div');
    const row = L => {
      const el = h('div', { class: 'lyRow' + (L.on ? ' on' : ' off'), role: 'switch', 'aria-checked': String(L.on) },
        h('span', { class: 'sw', style: 'background:' + CAD.aciCss(L.color, view.fg, !view.dark) }), h('span', { class: 'nm' }, L.name), h('span', { class: 'tgl' }));
      el.addEventListener('click', () => { L.on = !L.on; setOn(L.name, L.on); el.className = 'lyRow' + (L.on ? ' on' : ' off'); el.setAttribute('aria-checked', String(L.on)); CAD.emit('layers'); });
      return el;
    };
    const fill = () => list.replaceChildren(...layers.map(row));
    const all = on => { for (const L of layers) { L.on = on; setOn(L.name, on); } fill(); CAD.emit('layers'); };
    fill();
    openSheet(`레이어 ${layers.length}개`, h('div', null, h('div', { class: 'lyTools' }, h('button', { onclick: () => all(true) }, '모두 켜기'), h('button', { onclick: () => all(false) }, '모두 끄기')), list));
  }
  function helpSheet() {
    const hi = viewer.HISTORY[0];
    openSheet('도움말', h('div', { class: 'help' },
      h('p', { class: 'lead' }, '오토캐드나 캐디안의 파일을 열 수 있어요.'),
      h('h3', null, '열 수 있는 파일'),
      h('ul', null, h('li', null, 'DWG — AutoCAD 2004 ~ 2018 형식 (캐디안 DWG 포함)'), h('li', null, 'DXF — 모든 버전'), h('li', null, 'MCD — BOUNDY METACADY 도면')),
      h('p', null, '열리지 않는 아주 오래된 DWG나 최신 형식 DWG는 오토캐드에서 "다른 이름으로 저장"으로 2018 형식이나 DXF로 저장하면 열려요.'),
      h('h3', null, '손가락으로 보기'),
      h('ul', null, h('li', null, '선을 톡 — 그 선의 치수 보기'), h('li', null, '한 손가락으로 끌기 — 도면 이동'), h('li', null, '두 손가락 벌리기 · 오므리기 — 확대 · 축소'), h('li', null, '두 번 톡톡 — 도면 전체 보기'),
        h('li', null, '휴대폰을 가로로 돌리면 도면을 더 넓게 볼 수 있어요. 돌려도 화면이 그대로면 휴대폰 빠른 설정에서 "자동 회전"을 켜 주세요.')),
      h('h3', null, '치수 보기'),
      h('ul', null, h('li', null, '선 · 원 · 호 · 문자 · 치수를 톡 누르면 아래 카드에 치수가 나와요.'), h('li', null, '선이 여러 개 겹쳐 있으면 카드의 [다른 선 ▸] 단추로 바꿔 보세요.'),
        h('li', null, '치수는 도면에 저장된 좌표로 계산한 정확한 값이에요. 단위는 도면을 그린 단위(보통 mm)예요.'), h('li', null, '오토캐드 치수를 누르면 도면에 적힌 치수 글자를 먼저 보여 줘요.')),
      h('h3', null, '두 점 거리 재기'),
      h('ul', null, h('li', null, '[거리 재기]를 누르고 두 점을 차례로 누르세요.'), h('li', null, '선 끝 · 중간 · 원 중심 · 교차점에 착 붙어요 (초록 동그라미).'), h('li', null, '두 번째 점을 선 위 아무 곳에나 누르면 첫 점에서 그 선까지의 직각 거리를 재요. 나란한 두 선 사이 거리(벽 두께 · 배관 간격 등)는 이렇게 재세요.'),
        h('li', null, '빨간 동그라미는 붙을 점이 없어 누른 위치를 쓴 것이라 근사값이에요. 확대해서 다시 눌러 보세요.')),
      h('h3', null, '아래 단추'),
      h('ul', null, h('li', null, '열기 — 도면 파일 고르기'), h('li', null, '전체 보기 — 도면 전체를 화면에 맞추기'), h('li', null, '거리 재기 — 두 점 사이 거리 재기 (한 번 더 누르면 끝)'), h('li', null, '레이어 — 레이어별로 켜고 끄기'), h('li', null, '밝기 — 밝은 화면 · 어두운 화면 바꾸기')),
      h('h3', null, 'PC에서'),
      h('ul', null, h('li', null, '마우스로 끌기 — 이동, 휠 — 확대 · 축소'), h('li', null, '파일을 화면에 끌어다 놓아도 열려요')),
      h('p', { class: 'ver' }, `BOUNDY METACADY VIEWER v ${viewer.version} (${hi.date}) · Copyright (c) BOUNDY. All rights reserved.`)));
  }

  // ---------- 크게 보기 ----------
  // 블로그 글 안(iframe)에서 열렸을 때 블로그 틀 없이 보는 단추. 안드로이드 · PC는 전체 화면, 전체 화면이 안 되는 아이폰은 뷰어만 새 탭으로 연다
  let inFrame = false; try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  viewer.inFrame = inFrame;
  const fsOn = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  const fsOk = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  function setupFull() {
    const b = $('btnFull'); if (!fsOk() && !inFrame) return; // 전체 화면도 못 하고 이미 단독 화면이면 단추가 필요 없다
    b.classList.remove('hidden');
    b.addEventListener('click', async () => {
      if (fsOk()) {
        try { if (fsOn()) await (document.exitFullscreen || document.webkitExitFullscreen).call(document); else await (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).call(document.documentElement); return; } catch (e) { /* 막혀 있으면 아래로 */ }
      }
      if (inFrame) { window.open(location.href.split('#')[0], '_blank'); toast('뷰어를 새 창으로 열었어요. 도면 파일을 다시 열어 주세요.'); }
    });
  }

  // ---------- 시작 ----------
  window.addEventListener('DOMContentLoaded', () => {
    CAD.sheets = []; CAD.doc = new CAD.Doc(); CAD.sheets.push({ doc: CAD.doc, visible: true, fade: false });
    view.init(); view.grid = false;
    let dark = false; try { dark = localStorage.getItem(THEME_KEY) === 'dark'; } catch (e) { /* 저장 불가 환경 */ }
    setTheme(dark);
    const w = view.wrap;
    w.addEventListener('pointerdown', onDown); w.addEventListener('pointermove', onMove);
    w.addEventListener('pointerup', onUp); w.addEventListener('pointercancel', onUp); w.addEventListener('lostpointercapture', onUp);
    w.addEventListener('wheel', onWheel, { passive: false });
    for (const ev of ['gesturestart', 'gesturechange', 'gestureend']) document.addEventListener(ev, e => e.preventDefault()); // 아이폰 사파리: 화면 전체 확대 막기
    document.addEventListener('dblclick', e => e.preventDefault());
    w.addEventListener('dragover', e => e.preventDefault());
    w.addEventListener('drop', e => { e.preventDefault(); openFile(e.dataTransfer.files[0]); });
    $('fileOpen').addEventListener('change', e => openFile(e.target.files[0]));
    $('btnOpen').addEventListener('click', pickFile); $('btnOpenBig').addEventListener('click', pickFile);
    $('btnFit').addEventListener('click', () => viewer.fit());
    $('btnLayers').addEventListener('click', layersSheet);
    $('btnMeasure').addEventListener('click', () => { if (!CAD.sheets.some(s => s.doc.ents.length)) { toast('먼저 도면 파일을 열어 주세요.'); return; } setMeasure(!meas.on); });
    $('cardClose').addEventListener('click', () => { if (meas.on) { meas.a = meas.b = null; $('guide').textContent = '첫 번째 점을 누르세요'; hideCard(); view.invalidate('over'); } else clearSel(); });
    $('cardNext').addEventListener('click', () => viewer.next());
    CAD.on('layers', () => { if (sel) clearSel(); });
    $('btnTheme').addEventListener('click', () => setTheme(!view.dark));
    $('btnInfo').addEventListener('click', helpSheet);
    setupFull();
    $('sheetClose').addEventListener('click', closeSheet);
    $('sheet').addEventListener('click', e => { if (e.target.id === 'sheet') closeSheet(); });
    view.zoomExtents();
  });
})(window.CAD);
