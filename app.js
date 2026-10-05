const FALLBACK_SAMPLE = {
  building: "AI DevFest Sample Building",
  nodes: [
    { id: "R1", label: "Room 1", type: "room", x: 100, y: 170 },
    { id: "R2", label: "Room 2", type: "room", x: 100, y: 430 },
    { id: "C1", label: "Junction 1", type: "junction", x: 330, y: 170 },
    { id: "C2", label: "Junction 2", type: "junction", x: 570, y: 170 },
    { id: "C3", label: "Junction 3", type: "junction", x: 330, y: 430 },
    { id: "C4", label: "Junction 4", type: "junction", x: 570, y: 430 },
    { id: "E1", label: "Exit 1", type: "exit", x: 830, y: 170 },
    { id: "E2", label: "Exit 2", type: "exit", x: 830, y: 430 }
  ],
  edges: [
    { id: "e_r1_c1", from: "R1", to: "C1", cost: 2 },
    { id: "e_r1_r2", from: "R1", to: "R2", cost: 4 },
    { id: "e_r2_c3", from: "R2", to: "C3", cost: 2 },
    { id: "e_c1_c2", from: "C1", to: "C2", cost: 2 },
    { id: "e_c1_c3", from: "C1", to: "C3", cost: 4 },
    { id: "e_c2_c4", from: "C2", to: "C4", cost: 5 },
    { id: "e_c2_e1", from: "C2", to: "E1", cost: 3 },
    { id: "e_c3_c4", from: "C3", to: "C4", cost: 2 },
    { id: "e_c4_e2", from: "C4", to: "E2", cost: 3 }
  ],
  initial_state: { blocked_nodes: [], blocked_edges: [], closed_exits: [] }
};

const I18N = {
  en: {
    practice: "Practice Challenge", subtitle: "Interactive Evacuation Route Simulator", reset: "Reset",
    loadHint: "Import a building.json file or use the sample dataset.", importJson: "Import JSON", loadSample: "Load sample",
    emptyTitle: "No building loaded", emptyText: "Import building.json to begin.", room: "Room", junction: "Junction", exit: "Exit",
    route: "Best route", blocked: "Blocked", liveResult: "Live result", chooseStart: "Choose a starting location",
    chooseStartHelp: "Select an available room or junction on the map or from the list.", path: "Path", destination: "Exit",
    totalCost: "Total cost", startLocation: "Start location", selectStart: "Select start", selectPlaceholder: "Select a room or junction",
    mapClickHelp: "Tip: clicking an available room or junction also selects it.", hazards: "Simulated hazards", changeConditions: "Change conditions",
    locations: "Locations", corridors: "Corridors", validation: "Validation", invalidDataset: "Invalid dataset",
    disclaimer: "Educational simulation only — not a certified real-world evacuation planning tool.", blockedState: "Blocked",
    availableState: "Available", closedState: "Closed", openState: "Open", block: "Block", unblock: "Unblock", close: "Close", reopen: "Reopen",
    corridor: "Corridor", cost: "cost", routeFound: "Lowest-cost route found", routeFoundHelp: "The route updates immediately when the start or hazards change.",
    noRoute: "No route available", noRouteHelp: "No open exit can be reached from the selected start under the current hazards.",
    startBlocked: "Starting location blocked", startBlockedHelp: "Unblock the selected start or choose another available location.",
    datasetLoaded: "Dataset loaded", datasetLoadedHelp: "Choose a starting location to calculate the lowest-cost route.",
    invalidFile: "The selected file is invalid.", invalidJson: "Could not parse JSON.", clickToImport: "Drop a .json file here or use Import JSON.",
    nodeTypeRoom: "room", nodeTypeJunction: "junction", nodeTypeExit: "exit", blockedIncident: "Unavailable because an endpoint is blocked",
    initialRestored: "Initial hazard state restored.", sampleLoaded: "Sample dataset loaded.", fileLoaded: "Imported dataset loaded."
  },
  bn: {
    practice: "প্র্যাকটিস চ্যালেঞ্জ", subtitle: "ইন্টার‌্যাক্টিভ ইভাকুয়েশন রুট সিমুলেটর", reset: "রিসেট",
    loadHint: "building.json ইমপোর্ট করুন অথবা sample dataset ব্যবহার করুন।", importJson: "JSON ইমপোর্ট", loadSample: "স্যাম্পল লোড",
    emptyTitle: "কোনো বিল্ডিং লোড হয়নি", emptyText: "শুরু করতে building.json ইমপোর্ট করুন।", room: "রুম", junction: "জাংশন", exit: "এক্সিট",
    route: "সেরা রুট", blocked: "ব্লকড", liveResult: "লাইভ ফলাফল", chooseStart: "শুরুর স্থান নির্বাচন করুন",
    chooseStartHelp: "ম্যাপ বা তালিকা থেকে চালু থাকা রুম/জাংশন নির্বাচন করুন।", path: "পথ", destination: "এক্সিট",
    totalCost: "মোট খরচ", startLocation: "শুরুর স্থান", selectStart: "স্টার্ট নির্বাচন", selectPlaceholder: "রুম বা জাংশন নির্বাচন করুন",
    mapClickHelp: "টিপ: ম্যাপে চালু থাকা রুম/জাংশনে ক্লিক করলেও সেটি স্টার্ট হবে।", hazards: "সিমুলেটেড হ্যাজার্ড", changeConditions: "অবস্থা পরিবর্তন করুন",
    locations: "লোকেশন", corridors: "করিডোর", validation: "ভ্যালিডেশন", invalidDataset: "অবৈধ ডেটাসেট",
    disclaimer: "শুধু শিক্ষামূলক সিমুলেশন — বাস্তব জরুরি পরিকল্পনার সার্টিফায়েড টুল নয়।", blockedState: "ব্লকড",
    availableState: "চালু", closedState: "বন্ধ", openState: "খোলা", block: "ব্লক", unblock: "আনব্লক", close: "বন্ধ", reopen: "পুনরায় খুলুন",
    corridor: "করিডোর", cost: "খরচ", routeFound: "সর্বনিম্ন খরচের রুট পাওয়া গেছে", routeFoundHelp: "স্টার্ট বা হ্যাজার্ড বদলালে রুট সঙ্গে সঙ্গে আপডেট হয়।",
    noRoute: "কোনো রুট পাওয়া যায়নি", noRouteHelp: "বর্তমান হ্যাজার্ড অনুযায়ী নির্বাচিত স্থান থেকে কোনো খোলা এক্সিটে পৌঁছানো যাচ্ছে না।",
    startBlocked: "শুরুর স্থান ব্লকড", startBlockedHelp: "স্টার্ট লোকেশন আনব্লক করুন অথবা অন্য চালু লোকেশন নির্বাচন করুন।",
    datasetLoaded: "ডেটাসেট লোড হয়েছে", datasetLoadedHelp: "সর্বনিম্ন খরচের রুট বের করতে একটি শুরুর স্থান নির্বাচন করুন।",
    invalidFile: "নির্বাচিত ফাইলটি বৈধ নয়।", invalidJson: "JSON পড়া যায়নি।", clickToImport: ".json ফাইল এখানে ড্রপ করুন অথবা JSON ইমপোর্ট ব্যবহার করুন।",
    nodeTypeRoom: "রুম", nodeTypeJunction: "জাংশন", nodeTypeExit: "এক্সিট", blockedIncident: "এন্ডপয়েন্ট ব্লক থাকায় ব্যবহার করা যাবে না",
    initialRestored: "প্রাথমিক hazard state ফিরিয়ে আনা হয়েছে।", sampleLoaded: "স্যাম্পল ডেটাসেট লোড হয়েছে।", fileLoaded: "ইমপোর্ট করা ডেটাসেট লোড হয়েছে।"
  }
};

const els = {
  map: document.getElementById("map"), emptyState: document.getElementById("emptyState"), fileInput: document.getElementById("fileInput"),
  importBtn: document.getElementById("importBtn"), sampleBtn: document.getElementById("sampleBtn"), resetBtn: document.getElementById("resetBtn"),
  langBtn: document.getElementById("langBtn"), dropZone: document.getElementById("dropZone"), buildingName: document.getElementById("buildingName"),
  datasetMeta: document.getElementById("datasetMeta"), startSelect: document.getElementById("startSelect"), statusCard: document.getElementById("statusCard"),
  statusTitle: document.getElementById("statusTitle"), statusText: document.getElementById("statusText"), routeDetails: document.getElementById("routeDetails"),
  routePath: document.getElementById("routePath"), routeExit: document.getElementById("routeExit"), routeCost: document.getElementById("routeCost"),
  nodeControls: document.getElementById("nodeControls"), edgeControls: document.getElementById("edgeControls"),
  validationPanel: document.getElementById("validationPanel"), validationList: document.getElementById("validationList")
};

const state = {
  lang: "en", data: null, startId: "", blockedNodes: new Set(), blockedEdges: new Set(), closedExits: new Set(), route: null,
  initial: null
};

function t(key) { return I18N[state.lang][key] ?? key; }
function deepClone(value) { return JSON.parse(JSON.stringify(value)); }
function esc(text) { return String(text).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
function lexStringCompare(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
function lexPathCompare(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const cmp = lexStringCompare(a[i], b[i]);
    if (cmp !== 0) return cmp;
  }
  return a.length - b.length;
}

function validateBuilding(data) {
  const errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) return ["Root value must be a JSON object."];
  if (typeof data.building !== "string" || !data.building.trim()) errors.push("building must be a non-empty string.");
  if (!Array.isArray(data.nodes)) errors.push("nodes must be an array.");
  if (!Array.isArray(data.edges)) errors.push("edges must be an array.");
  if (!data.initial_state || typeof data.initial_state !== "object" || Array.isArray(data.initial_state)) errors.push("initial_state must be an object.");
  if (errors.length) return errors;

  if (data.nodes.length < 2 || data.nodes.length > 60) errors.push("nodes must contain 2–60 items.");
  if (data.edges.length < 1 || data.edges.length > 150) errors.push("edges must contain 1–150 items.");

  const nodeIds = new Set();
  const nodeTypes = new Map();
  data.nodes.forEach((n, i) => {
    const p = `nodes[${i}]`;
    if (!n || typeof n !== "object" || Array.isArray(n)) return errors.push(`${p} must be an object.`);
    if (typeof n.id !== "string" || !n.id) errors.push(`${p}.id must be a non-empty string.`);
    else if (nodeIds.has(n.id)) errors.push(`Duplicate node id: ${n.id}.`);
    else nodeIds.add(n.id);
    if (typeof n.label !== "string" || !n.label.trim()) errors.push(`${p}.label must be non-empty.`);
    if (!["room", "junction", "exit"].includes(n.type)) errors.push(`${p}.type must be room, junction, or exit.`);
    else if (typeof n.id === "string") nodeTypes.set(n.id, n.type);
    if (typeof n.x !== "number" || !Number.isFinite(n.x) || typeof n.y !== "number" || !Number.isFinite(n.y)) errors.push(`${p}.x and ${p}.y must be finite numbers.`);
  });

  const nonExitCount = data.nodes.filter(n => n && ["room","junction"].includes(n.type)).length;
  const exitCount = data.nodes.filter(n => n && n.type === "exit").length;
  if (nonExitCount < 1) errors.push("At least one room or junction is required.");
  if (exitCount < 1) errors.push("At least one exit is required.");

  const edgeIds = new Set();
  const pairs = new Set();
  data.edges.forEach((e, i) => {
    const p = `edges[${i}]`;
    if (!e || typeof e !== "object" || Array.isArray(e)) return errors.push(`${p} must be an object.`);
    if (typeof e.id !== "string" || !e.id) errors.push(`${p}.id must be a non-empty string.`);
    else if (edgeIds.has(e.id)) errors.push(`Duplicate edge id: ${e.id}.`);
    else edgeIds.add(e.id);
    if (!nodeIds.has(e.from)) errors.push(`${p}.from references unknown node: ${e.from}.`);
    if (!nodeIds.has(e.to)) errors.push(`${p}.to references unknown node: ${e.to}.`);
    if (e.from === e.to) errors.push(`${p} must not be a self-loop.`);
    if (!Number.isInteger(e.cost) || e.cost <= 0) errors.push(`${p}.cost must be a positive integer.`);
    if (typeof e.from === "string" && typeof e.to === "string") {
      const pair = [e.from, e.to].sort(lexStringCompare).join("\u0000");
      if (pairs.has(pair)) errors.push(`${p} repeats an undirected node pair (${e.from}, ${e.to}).`);
      else pairs.add(pair);
    }
  });

  const init = data.initial_state;
  ["blocked_nodes", "blocked_edges", "closed_exits"].forEach(k => {
    if (!Array.isArray(init[k])) errors.push(`initial_state.${k} must be an array.`);
  });
  if (errors.length) return errors;

  const duplicateCheck = (arr, name) => {
    const s = new Set();
    for (const id of arr) {
      if (typeof id !== "string") errors.push(`${name} must contain string IDs only.`);
      else if (s.has(id)) errors.push(`${name} contains duplicate ID: ${id}.`);
      else s.add(id);
    }
  };
  duplicateCheck(init.blocked_nodes, "initial_state.blocked_nodes");
  duplicateCheck(init.blocked_edges, "initial_state.blocked_edges");
  duplicateCheck(init.closed_exits, "initial_state.closed_exits");

  init.blocked_nodes.forEach(id => {
    if (!nodeIds.has(id)) errors.push(`blocked_nodes references unknown node: ${id}.`);
    else if (!["room","junction"].includes(nodeTypes.get(id))) errors.push(`blocked_nodes ID ${id} must be a room or junction.`);
  });
  init.closed_exits.forEach(id => {
    if (!nodeIds.has(id)) errors.push(`closed_exits references unknown node: ${id}.`);
    else if (nodeTypes.get(id) !== "exit") errors.push(`closed_exits ID ${id} must be an exit.`);
  });
  init.blocked_edges.forEach(id => { if (!edgeIds.has(id)) errors.push(`blocked_edges references unknown edge: ${id}.`); });

  return errors;
}

function loadData(data, sourceText = "") {
  const errors = validateBuilding(data);
  if (errors.length) {
    showValidation(errors);
    return false;
  }
  hideValidation();
  state.data = deepClone(data);
  state.initial = deepClone(data.initial_state);
  state.blockedNodes = new Set(data.initial_state.blocked_nodes);
  state.blockedEdges = new Set(data.initial_state.blocked_edges);
  state.closedExits = new Set(data.initial_state.closed_exits);
  state.startId = "";
  state.route = null;
  els.buildingName.textContent = data.building;
  els.datasetMeta.textContent = `${data.nodes.length} nodes • ${data.edges.length} corridors${sourceText ? ` • ${sourceText}` : ""}`;
  els.emptyState.classList.add("hidden");
  populateStartSelect();
  renderControls();
  recalcAndRender();
  setStatus("neutral", t("datasetLoaded"), t("datasetLoadedHelp"), false);
  return true;
}

function showValidation(errors) {
  els.validationPanel.classList.remove("hidden");
  els.validationList.innerHTML = errors.map(e => `<li>${esc(e)}</li>`).join("");
  setStatus("danger", t("invalidFile"), errors[0] || t("invalidJson"), false);
}
function hideValidation() { els.validationPanel.classList.add("hidden"); els.validationList.innerHTML = ""; }

function populateStartSelect() {
  const current = state.startId;
  els.startSelect.innerHTML = `<option value="">${esc(t("selectPlaceholder"))}</option>`;
  if (!state.data) return;
  const options = state.data.nodes
    .filter(n => n.type !== "exit")
    .sort((a,b) => lexStringCompare(a.id, b.id));
  for (const n of options) {
    const opt = document.createElement("option");
    opt.value = n.id;
    opt.textContent = `${n.id} — ${n.label}`;
    els.startSelect.appendChild(opt);
  }
  els.startSelect.value = current;
}

function renderControls() {
  if (!state.data) { els.nodeControls.innerHTML = ""; els.edgeControls.innerHTML = ""; return; }
  const nodes = [...state.data.nodes].sort((a,b) => lexStringCompare(a.id, b.id));
  els.nodeControls.innerHTML = nodes.map(n => {
    const isExit = n.type === "exit";
    const active = isExit ? state.closedExits.has(n.id) : state.blockedNodes.has(n.id);
    const stateText = isExit ? (active ? t("closedState") : t("openState")) : (active ? t("blockedState") : t("availableState"));
    const action = isExit ? (active ? t("reopen") : t("close")) : (active ? t("unblock") : t("block"));
    return `<div class="hazard-item">
      <div><strong>${esc(n.id)} — ${esc(n.label)}</strong><small>${esc(t(`nodeType${n.type[0].toUpperCase()}${n.type.slice(1)}`))} • ${esc(stateText)}</small></div>
      <button type="button" class="toggle ${active ? "active" : ""}" data-node-toggle="${esc(n.id)}">${esc(action)}</button>
    </div>`;
  }).join("");

  els.edgeControls.innerHTML = [...state.data.edges].sort((a,b) => lexStringCompare(a.id, b.id)).map(e => {
    const active = state.blockedEdges.has(e.id);
    return `<div class="hazard-item">
      <div><strong>${esc(e.from)} ↔ ${esc(e.to)}</strong><small>${esc(e.id)} • ${esc(t("cost"))}: ${e.cost}</small></div>
      <button type="button" class="toggle ${active ? "active" : ""}" data-edge-toggle="${esc(e.id)}">${esc(active ? t("unblock") : t("block"))}</button>
    </div>`;
  }).join("");
}

function buildAdjacency() {
  const adj = new Map(state.data.nodes.map(n => [n.id, []]));
  const blockedNode = id => state.blockedNodes.has(id);
  for (const e of state.data.edges) {
    if (state.blockedEdges.has(e.id) || blockedNode(e.from) || blockedNode(e.to)) continue;
    adj.get(e.from).push({ to: e.to, cost: e.cost, edgeId: e.id });
    adj.get(e.to).push({ to: e.from, cost: e.cost, edgeId: e.id });
  }
  for (const list of adj.values()) list.sort((a,b) => lexStringCompare(a.to, b.to) || lexStringCompare(a.edgeId, b.edgeId));
  return adj;
}

function bestRoute(startId) {
  if (!state.data || !startId) return null;
  if (state.blockedNodes.has(startId)) return { error: "startBlocked" };

  const adj = buildAdjacency();
  const best = new Map();
  const queue = [{ node: startId, cost: 0, path: [startId], edges: [] }];
  best.set(startId, { cost: 0, path: [startId] });

  while (queue.length) {
    queue.sort((a,b) => a.cost - b.cost || lexPathCompare(a.path, b.path));
    const cur = queue.shift();
    const known = best.get(cur.node);
    if (!known || cur.cost !== known.cost || lexPathCompare(cur.path, known.path) !== 0) continue;

    for (const step of adj.get(cur.node) || []) {
      const nextNodeObj = state.data.nodes.find(n => n.id === step.to);
      if (!nextNodeObj) continue;
      if (nextNodeObj.type === "exit" && state.closedExits.has(nextNodeObj.id)) continue;
      const nextCost = cur.cost + step.cost;
      const nextPath = [...cur.path, step.to];
      const old = best.get(step.to);
      if (!old || nextCost < old.cost || (nextCost === old.cost && lexPathCompare(nextPath, old.path) < 0)) {
        best.set(step.to, { cost: nextCost, path: nextPath });
        queue.push({ node: step.to, cost: nextCost, path: nextPath, edges: [...cur.edges, step.edgeId] });
      }
    }
  }

  const candidates = [];
  for (const n of state.data.nodes) {
    if (n.type !== "exit" || state.closedExits.has(n.id)) continue;
    const info = best.get(n.id);
    if (!info) continue;
    const edgeIds = [];
    for (let i = 0; i < info.path.length - 1; i++) {
      const a = info.path[i], b = info.path[i+1];
      const e = state.data.edges.find(x => (x.from === a && x.to === b) || (x.from === b && x.to === a));
      if (e) edgeIds.push(e.id);
    }
    candidates.push({ exitId: n.id, cost: info.cost, path: info.path, edgeIds });
  }
  if (!candidates.length) return { error: "noRoute" };
  candidates.sort((a,b) => a.cost - b.cost || lexStringCompare(a.exitId, b.exitId) || lexPathCompare(a.path, b.path));
  return candidates[0];
}

function recalcAndRender() {
  if (!state.data) return;
  state.route = state.startId ? bestRoute(state.startId) : null;
  renderMap();
  renderControls();

  if (!state.startId) {
    setStatus("neutral", t("chooseStart"), t("chooseStartHelp"), false);
    return;
  }
  if (state.route?.error === "startBlocked") {
    setStatus("warning", t("startBlocked"), t("startBlockedHelp"), false);
    return;
  }
  if (state.route?.error === "noRoute") {
    setStatus("danger", t("noRoute"), t("noRouteHelp"), false);
    return;
  }
  if (state.route) {
    setStatus("success", t("routeFound"), t("routeFoundHelp"), true);
    els.routePath.textContent = state.route.path.join(" → ");
    els.routeExit.textContent = state.route.exitId;
    els.routeCost.textContent = state.route.cost;
  }
}

function setStatus(kind, title, text, showRoute) {
  els.statusCard.className = `status-card ${kind}`;
  els.statusTitle.textContent = title;
  els.statusText.textContent = text;
  els.routeDetails.classList.toggle("hidden", !showRoute);
}

function getDisplayPositions() {
  const nodes = state.data.nodes;
  const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const padX = 80, padY = 80, width = 840, height = 490;
  const spanX = maxX - minX || 1, spanY = maxY - minY || 1;
  const pos = new Map();
  for (const n of nodes) {
    pos.set(n.id, {
      x: padX + ((n.x - minX) / spanX) * width,
      y: padY + ((n.y - minY) / spanY) * height
    });
  }
  return pos;
}

function renderMap() {
  if (!state.data) { els.map.innerHTML = ""; els.emptyState.classList.remove("hidden"); return; }
  const pos = getDisplayPositions();
  const routeEdges = new Set(state.route && !state.route.error ? state.route.edgeIds : []);
  const routeNodes = new Set(state.route && !state.route.error ? state.route.path : []);
  const nodeById = new Map(state.data.nodes.map(n => [n.id, n]));

  const edgeSvg = state.data.edges.map(e => {
    const a = pos.get(e.from), b = pos.get(e.to);
    const incidentBlocked = state.blockedNodes.has(e.from) || state.blockedNodes.has(e.to);
    const blocked = state.blockedEdges.has(e.id);
    const cls = ["edge", routeEdges.has(e.id) ? "route-edge" : "", blocked ? "blocked-edge" : "", incidentBlocked ? "disabled-edge" : ""].filter(Boolean).join(" ");
    const mx = (a.x + b.x)/2, my = (a.y + b.y)/2;
    return `<g data-edge-id="${esc(e.id)}">
      <line class="${cls}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />
      <line class="edge-hit" data-edge-click="${esc(e.id)}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"><title>${esc(`${e.from} ↔ ${e.to}, ${t("cost")}: ${e.cost}`)}</title></line>
      <text class="edge-label" x="${mx}" y="${my - 9}" text-anchor="middle">${e.cost}</text>
    </g>`;
  }).join("");

  const nodeSvg = state.data.nodes.map(n => {
    const p = pos.get(n.id);
    const blocked = n.type === "exit" ? state.closedExits.has(n.id) : state.blockedNodes.has(n.id);
    const cls = ["node", n.type, blocked ? (n.type === "exit" ? "closed-exit" : "blocked-node") : "", state.startId === n.id ? "selected-start" : "", routeNodes.has(n.id) ? "route-node" : ""].filter(Boolean).join(" ");
    const stateMark = blocked ? `<text class="state-mark" x="${p.x+26}" y="${p.y-24}">×</text>` : "";
    return `<g class="${cls}" data-node-click="${esc(n.id)}" tabindex="0" role="button" aria-label="${esc(n.label)}">
      <circle cx="${p.x}" cy="${p.y}" r="29"></circle>
      <text x="${p.x}" y="${p.y}">${esc(n.id)}</text>
      <text class="node-label" x="${p.x}" y="${p.y + 52}">${esc(n.label)}</text>
      ${stateMark}
      <title>${esc(`${n.id} — ${n.label} (${n.type})`)}</title>
    </g>`;
  }).join("");

  els.map.innerHTML = `<g>${edgeSvg}</g><g>${nodeSvg}</g>`;
}

function toggleNode(id) {
  const n = state.data.nodes.find(x => x.id === id);
  if (!n) return;
  if (n.type === "exit") state.closedExits.has(id) ? state.closedExits.delete(id) : state.closedExits.add(id);
  else state.blockedNodes.has(id) ? state.blockedNodes.delete(id) : state.blockedNodes.add(id);
  recalcAndRender();
}
function toggleEdge(id) {
  state.blockedEdges.has(id) ? state.blockedEdges.delete(id) : state.blockedEdges.add(id);
  recalcAndRender();
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "bn" ? "bn" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => { const key = el.dataset.i18n; if (I18N[state.lang][key]) el.textContent = I18N[state.lang][key]; });
  els.langBtn.textContent = state.lang === "en" ? "বাংলা" : "English";
  populateStartSelect();
  renderControls();
  recalcAndRender();
}

async function loadSample() {
  try {
    const res = await fetch("building.json", { cache: "no-store" });
    if (!res.ok) throw new Error("sample fetch failed");
    const data = await res.json();
    loadData(data, t("sampleLoaded"));
  } catch {
    loadData(FALLBACK_SAMPLE, t("sampleLoaded"));
  }
}

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      loadData(data, t("fileLoaded"));
    } catch {
      showValidation([t("invalidJson")]);
    }
  };
  reader.onerror = () => showValidation([t("invalidFile")]);
  reader.readAsText(file);
}

els.importBtn.addEventListener("click", () => els.fileInput.click());
els.fileInput.addEventListener("change", e => handleFile(e.target.files?.[0]));
els.sampleBtn.addEventListener("click", loadSample);
els.resetBtn.addEventListener("click", () => {
  if (!state.data || !state.initial) return;
  state.blockedNodes = new Set(state.initial.blocked_nodes);
  state.blockedEdges = new Set(state.initial.blocked_edges);
  state.closedExits = new Set(state.initial.closed_exits);
  recalcAndRender();
});
els.langBtn.addEventListener("click", () => { state.lang = state.lang === "en" ? "bn" : "en"; applyLanguage(); });
els.startSelect.addEventListener("change", e => { state.startId = e.target.value; recalcAndRender(); });

els.nodeControls.addEventListener("click", e => {
  const btn = e.target.closest("[data-node-toggle]");
  if (btn) toggleNode(btn.dataset.nodeToggle);
});
els.edgeControls.addEventListener("click", e => {
  const btn = e.target.closest("[data-edge-toggle]");
  if (btn) toggleEdge(btn.dataset.edgeToggle);
});
els.map.addEventListener("click", e => {
  const node = e.target.closest("[data-node-click]");
  if (node) {
    const id = node.dataset.nodeClick;
    const n = state.data.nodes.find(x => x.id === id);
    if (n && n.type !== "exit") { state.startId = id; els.startSelect.value = id; recalcAndRender(); }
    return;
  }
  const edge = e.target.closest("[data-edge-click]");
  if (edge) toggleEdge(edge.dataset.edgeClick);
});
els.map.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const node = e.target.closest("[data-node-click]");
  if (!node) return;
  e.preventDefault();
  const id = node.dataset.nodeClick;
  const n = state.data.nodes.find(x => x.id === id);
  if (n && n.type !== "exit") { state.startId = id; els.startSelect.value = id; recalcAndRender(); }
});

document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b === btn));
  const tab = btn.dataset.tab;
  els.nodeControls.classList.toggle("hidden", tab !== "nodes");
  els.edgeControls.classList.toggle("hidden", tab !== "edges");
}));

["dragenter", "dragover"].forEach(type => els.dropZone.addEventListener(type, e => { e.preventDefault(); els.dropZone.classList.add("dragover"); }));
["dragleave", "drop"].forEach(type => els.dropZone.addEventListener(type, e => { e.preventDefault(); els.dropZone.classList.remove("dragover"); }));
els.dropZone.addEventListener("drop", e => handleFile(e.dataTransfer?.files?.[0]));

async function bootstrap() {
  await loadSample();
  const params = new URLSearchParams(location.search);
  const start = params.get("start");
  if (start && state.data?.nodes.some(n => n.id === start && n.type !== "exit")) {
    state.startId = start;
    els.startSelect.value = start;
  }
  const blockedNodes = params.getAll("blockNode");
  blockedNodes.forEach(id => {
    const n = state.data?.nodes.find(x => x.id === id);
    if (n && n.type !== "exit") state.blockedNodes.add(id);
  });
  const blockedEdges = params.getAll("blockEdge");
  blockedEdges.forEach(id => { if (state.data?.edges.some(e => e.id === id)) state.blockedEdges.add(id); });
  const closedExits = params.getAll("closeExit");
  closedExits.forEach(id => {
    const n = state.data?.nodes.find(x => x.id === id);
    if (n?.type === "exit") state.closedExits.add(id);
  });
  recalcAndRender();
}

bootstrap();
