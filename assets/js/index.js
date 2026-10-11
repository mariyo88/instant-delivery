const API_BASE = "https://instant-delivery-engine-cwbhusfcmq-ew.a.run.app";
const EXTRACT_URL = API_BASE + "/api/delivery/extract";
const PRINT_URL = API_BASE + "/api/print/delivery-labels";
const STORAGE_KEY = "firstcode.instantDeliveries";
const SETTINGS_KEY = "firstcode.instantPrintSettings";
const DEFAULT_SETTINGS = { format: "PREMIUM_A4_2x3", language: "sr" };
const FORMAT_VALUES = [
  "PREMIUM_A4_2x3",
  "CLASSIC_A4_2x3",
  "A4_4x2",
  "A4_3x3",
  "LABEL_100x150"
];
const LANGUAGE_VALUES = ["sr", "en"];

const home = document.getElementById("home");
const form = document.getElementById("composer");
const prompt = document.getElementById("prompt");
const send = document.getElementById("send");
const suggestions = document.getElementById("suggestions");
const chat = document.getElementById("chat");
const savedPanel = document.getElementById("savedPanel");
const savedList = document.getElementById("savedList");
const savedEmpty = document.getElementById("savedEmpty");
const savedCount = document.getElementById("savedCount");
const printSavedBtn = document.getElementById("printSaved");
const clearSavedBtn = document.getElementById("clearSaved");
const savedActions = document.getElementById("savedActions");
const selectAllSavedBtn = document.getElementById("selectAllSaved");
const savedPagination = document.getElementById("savedPagination");
const savedPageInfo = document.getElementById("savedPageInfo");
const savedPrevPage = document.getElementById("savedPrevPage");
const savedNextPage = document.getElementById("savedNextPage");
const selectedIds = new Set();
const PAGE_SIZE = 6;
let currentPage = 1;
const printSettings = document.getElementById("printSettings");
const printSettingsToggle = document.getElementById("printSettingsToggle");
const printSettingsSummary = document.getElementById("printSettingsSummary");
const printFormatSelect = document.getElementById("printFormat");
const printLanguageToggle = document.getElementById("printLanguage");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editModalClose = document.getElementById("editModalClose");
const editCancelBtn = document.getElementById("editCancel");
const editPrintBtn = document.getElementById("editPrint");
const editSaveBtn = document.getElementById("editSave");
const confirmModal = document.getElementById("confirmModal");
const confirmModalClose = document.getElementById("confirmModalClose");
const confirmModalTitle = document.getElementById("confirmModalTitle");
const confirmModalMessage = document.getElementById("confirmModalMessage");
const confirmCancelBtn = document.getElementById("confirmCancel");
const confirmOkBtn = document.getElementById("confirmOk");
let confirmAction = null;
const pdfPreviewModal = document.getElementById("pdfPreviewModal");
const pdfPreviewClose = document.getElementById("pdfPreviewClose");
const pdfPreviewDownload = document.getElementById("pdfPreviewDownload");
const pdfPreviewPrint = document.getElementById("pdfPreviewPrint");
const pdfPreviewPages = document.getElementById("pdfPreviewPages");
const pdfPreviewStatus = document.getElementById("pdfPreviewStatus");
const pdfPreviewStatusText = document.getElementById("pdfPreviewStatusText");
const PDFJS_SRC = "vendors/pdfjs/pdf.min.js";
const PDFJS_WORKER = "vendors/pdfjs/pdf.worker.min.js";
let pdfjsLoader = null;
let pdfPreviewUrl = null;
let pdfPreviewData = null;
let pdfPreviewDoc = null;
let pdfPreviewFilename = "dostave.pdf";
let pdfPreviewRequest = 0;
let pdfPreviewRenderWidth = 0;
let pdfPreviewResizeTimer = 0;
let pdfPreviewRenderToken = 0;
const editId = document.getElementById("editId");
const editFullName = document.getElementById("editFullName");
const editPhone = document.getElementById("editPhone");
const editEmail = document.getElementById("editEmail");
const editStreet = document.getElementById("editStreet");
const editCity = document.getElementById("editCity");
const editPostal = document.getElementById("editPostal");
const editCountry = document.getElementById("editCountry");
const editPayer = document.getElementById("editPayer");
const editCod = document.getElementById("editCod");
const objectUrls = [];
let busy = false;
let selectedLanguage = DEFAULT_SETTINGS.language;

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const data = raw ? JSON.parse(raw) : {};
    return {
      format: FORMAT_VALUES.includes(data.format) ? data.format : DEFAULT_SETTINGS.format,
      language: LANGUAGE_VALUES.includes(data.language) ? data.language : DEFAULT_SETTINGS.language
    };
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
}

function persistSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function getSelectedFormat() {
  return printFormatSelect.value || DEFAULT_SETTINGS.format;
}

function getSelectedLanguage() {
  return selectedLanguage || DEFAULT_SETTINGS.language;
}

function setLanguage(language) {
  selectedLanguage = LANGUAGE_VALUES.includes(language) ? language : DEFAULT_SETTINGS.language;
  printLanguageToggle.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.lang === selectedLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function formatSummaryLabel(format) {
  const option = printFormatSelect.querySelector('option[value="' + format + '"]');
  const label = option ? option.textContent : format;
  return label.replace(/\s*A4.*$/i, "").trim() || label;
}

function updateSettingsSummary() {
  printSettingsSummary.textContent =
    formatSummaryLabel(getSelectedFormat()) + " · " + getSelectedLanguage().toUpperCase();
}

function syncSettingsControls() {
  const settings = loadSettings();
  printFormatSelect.value = settings.format;
  setLanguage(settings.language);
  updateSettingsSummary();
}

function saveSettingsFromControls() {
  persistSettings({
    format: getSelectedFormat(),
    language: getSelectedLanguage()
  });
  updateSettingsSummary();
}

function syncSendButton() {
  send.disabled = prompt.value.trim().length === 0 || busy;
}

function resizePrompt() {
  prompt.style.height = "auto";
  prompt.style.height = Math.min(prompt.scrollHeight, 144) + "px";
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function persistSaved(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  renderSavedList();
}

function deliveryKey(delivery) {
  return [
    delivery.fullName || "",
    delivery.streetAddress || "",
    delivery.city || "",
    delivery.phoneNumber || "",
    delivery.codAmount || ""
  ].join("|").toLowerCase();
}

function isAlreadySaved(delivery) {
  const key = deliveryKey(delivery);
  return loadSaved().some((item) => deliveryKey(item.delivery) === key);
}

function toPrintAddress(delivery) {
  return {
    name: delivery.fullName || "Bez imena",
    street: delivery.streetAddress || "-",
    city: delivery.city || "-",
    zip: delivery.postalCode || "",
    phone: delivery.phoneNumber || "-",
    country: delivery.country || "Serbia",
    payerType: delivery.payerType || null,
    codAmount: delivery.codAmount != null ? delivery.codAmount : null,
    email: delivery.email || null
  };
}

function toNameFilename(name) {
  const cleaned = String(name || "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, " ");
  return cleaned ? cleaned + " dostava.pdf" : "dostava.pdf";
}

function formatMoney(value) {
  if (value == null || value === "") return "";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString("sr-RS") + " RSD";
}

function formatPayer(value) {
  if (!value) return "";
  if (value === "SENDER") return "Pošiljalac";
  if (value === "RECEIVER") return "Primalac";
  return value;
}

function addMessage(role, content) {
  chat.classList.add("is-visible");
  home.classList.add("is-chatting");
  const row = document.createElement("div");
  row.className = "chat-row " + role;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  if (typeof content === "string") {
    bubble.textContent = content;
  } else {
    bubble.appendChild(content);
  }
  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
  return { row, bubble };
}

function addUserMessage(text) {
  const textEl = document.createElement("div");
  textEl.className = "chat-text";
  textEl.textContent = text;

  const actions = document.createElement("div");
  actions.className = "chat-actions";

  const { row, bubble } = addMessage("user", textEl);
  row.appendChild(actions);
  return { bubble, actions };
}

function editSourceText(text) {
  prompt.value = text;
  resizePrompt();
  syncSendButton();
  prompt.focus();
  prompt.setSelectionRange(prompt.value.length, prompt.value.length);
}

function showLoading(actions) {
  actions.replaceChildren();
  actions.classList.add("is-visible");
  const loading = document.createElement("div");
  loading.className = "chat-loading";
  loading.innerHTML = '<span class="chat-loading-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>Izvlačim adresu</span>';
  actions.appendChild(loading);
}

function iconButton(tag, icon, label) {
  const el = document.createElement(tag);
  el.className = "msg-btn";
  el.setAttribute("aria-label", label);
  el.title = label;
  el.innerHTML = '<i class="fas ' + icon + '" aria-hidden="true"></i>';
  return el;
}

function fillMessageActions(actions, sourceText) {
  actions.replaceChildren();
  actions.classList.add("is-visible");

  const edit = iconButton("button", "fa-pen", "Izmeni");
  edit.type = "button";
  edit.addEventListener("click", () => editSourceText(sourceText));
  actions.appendChild(edit);
  return edit;
}

function metaItem(icon, text) {
  if (!text) return null;
  const li = document.createElement("li");
  li.innerHTML = '<i class="fas ' + icon + '" aria-hidden="true"></i><span></span>';
  li.querySelector("span").textContent = text;
  return li;
}

function createDeliveryCard(delivery, sourceText) {
  const card = document.createElement("div");
  card.className = "delivery-card";

  const title = document.createElement("h3");
  title.className = "delivery-card-title";
  title.textContent = delivery.fullName || "Bez imena";

  const meta = document.createElement("ul");
  meta.className = "delivery-card-meta";

  const addressParts = [delivery.streetAddress, [delivery.postalCode, delivery.city].filter(Boolean).join(" "), delivery.country]
    .filter(Boolean)
    .join(", ");

  [
    metaItem("fa-phone", delivery.phoneNumber),
    metaItem("fa-envelope", delivery.email),
    metaItem("fa-map-marker-alt", addressParts),
    metaItem("fa-money-bill", delivery.codAmount != null ? "Pouzeće: " + formatMoney(delivery.codAmount) : ""),
    metaItem("fa-user-check", delivery.payerType ? "Plaća: " + formatPayer(delivery.payerType) : "")
  ].forEach((item) => {
    if (item) meta.appendChild(item);
  });

  const actions = document.createElement("div");
  actions.className = "delivery-card-actions";

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "action-btn";
  const saved = isAlreadySaved(delivery);
  saveBtn.classList.toggle("is-saved", saved);
  saveBtn.innerHTML = saved
    ? '<i class="fas fa-check" aria-hidden="true"></i> Sačuvano'
    : '<i class="fas fa-bookmark" aria-hidden="true"></i> Sačuvaj';
  saveBtn.disabled = saved;
  saveBtn.addEventListener("click", () => {
    saveDelivery(delivery, sourceText);
    saveBtn.classList.add("is-saved");
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Sačuvano';
  });

  const printBtn = document.createElement("button");
  printBtn.type = "button";
  printBtn.className = "action-btn";
  printBtn.innerHTML = '<i class="fas fa-print" aria-hidden="true"></i> Odštampaj';
  printBtn.addEventListener("click", async () => {
    printBtn.disabled = true;
    try {
      await previewDeliveries([delivery], toNameFilename(delivery.fullName));
    } catch (error) {
      alert(error.message || "Štampa nije uspela.");
    } finally {
      printBtn.disabled = false;
    }
  });

  actions.append(saveBtn, printBtn);
  card.append(title, meta, actions);
  return { card, saveBtn };
}

function focusParsedAction(button) {
  if (!button || button.disabled) return;
  window.setTimeout(() => {
    button.focus({ focusVisible: true });
    button.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, 0);
}

function saveDelivery(delivery, sourceText) {
  if (isAlreadySaved(delivery)) {
    renderSavedList();
    return;
  }

  const list = loadSaved();
  const id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random();
  list.unshift({
    id,
    savedAt: new Date().toISOString(),
    sourceText: sourceText || "",
    delivery: delivery
  });
  selectedIds.add(id);
  currentPage = 1;
  persistSaved(list);
}

function removeSaved(id) {
  selectedIds.delete(id);
  persistSaved(loadSaved().filter((item) => item.id !== id));
}

function pruneSelection(list) {
  const valid = new Set(list.map((item) => item.id));
  [...selectedIds].forEach((id) => {
    if (!valid.has(id)) selectedIds.delete(id);
  });
}

function getSelectedItems() {
  return loadSaved().filter((item) => selectedIds.has(item.id));
}

function updatePrintButtonLabel() {
  const selectedCount = getSelectedItems().length;
  if (selectedCount > 0) {
    printSavedBtn.innerHTML =
      '<i class="fas fa-print" aria-hidden="true"></i> Odštampaj (' + selectedCount + ")";
  } else {
    printSavedBtn.innerHTML = '<i class="fas fa-print" aria-hidden="true"></i> Odštampaj';
  }
}

function updateSelectAllButton(list) {
  const hasItems = list.length > 0;
  selectAllSavedBtn.classList.toggle("is-hidden", !hasItems);
  if (!hasItems) return;

  const allSelected = list.every((item) => selectedIds.has(item.id));
  selectAllSavedBtn.textContent = allSelected ? "Poništi izbor" : "Izaberi sve";
}

function toggleSelectAll() {
  const list = loadSaved();
  if (!list.length) return;

  const allSelected = list.every((item) => selectedIds.has(item.id));
  if (allSelected) {
    selectedIds.clear();
  } else {
    list.forEach((item) => selectedIds.add(item.id));
  }
  renderSavedList();
}

function findSaved(id) {
  return loadSaved().find((item) => item.id === id) || null;
}

function openEditModal(id) {
  const item = findSaved(id);
  if (!item) return;

  const delivery = item.delivery || {};
  editId.value = item.id;
  editFullName.value = delivery.fullName || "";
  editPhone.value = delivery.phoneNumber || "";
  editEmail.value = delivery.email || "";
  editStreet.value = delivery.streetAddress || "";
  editCity.value = delivery.city || "";
  editPostal.value = delivery.postalCode || "";
  editCountry.value = delivery.country || "";
  editPayer.value = delivery.payerType || "";
  editCod.value = delivery.codAmount != null && delivery.codAmount !== "" ? delivery.codAmount : "";

  editModal.classList.add("is-open");
  editModal.setAttribute("aria-hidden", "false");
  editSaveBtn.focus();
}

function closeEditModal() {
  editModal.classList.remove("is-open");
  editModal.setAttribute("aria-hidden", "true");
  editForm.reset();
  editId.value = "";
}

function openConfirmModal({ title, message, confirmLabel, onConfirm }) {
  confirmModalTitle.textContent = title || "Potvrda";
  confirmModalMessage.textContent = message || "";
  confirmOkBtn.innerHTML =
    '<i class="fas fa-trash" aria-hidden="true"></i> ' + (confirmLabel || "Obriši");
  confirmAction = typeof onConfirm === "function" ? onConfirm : null;
  confirmModal.classList.add("is-open");
  confirmModal.setAttribute("aria-hidden", "false");
  confirmOkBtn.focus();
}

function closeConfirmModal() {
  confirmModal.classList.remove("is-open");
  confirmModal.setAttribute("aria-hidden", "true");
  confirmAction = null;
}

function requestRemoveSaved(id) {
  const item = findSaved(id);
  const name = item && item.delivery && item.delivery.fullName
    ? item.delivery.fullName
    : "ovu dostavu";

  openConfirmModal({
    title: "Brisanje dostave",
    message: 'Da li želiš da obrišeš "' + name + '" iz liste za štampu?',
    confirmLabel: "Obriši",
    onConfirm: () => removeSaved(id)
  });
}

function requestClearSaved() {
  if (!loadSaved().length) return;

  openConfirmModal({
    title: "Brisanje liste",
    message: "Da li želiš da obrišeš celu listu za štampu?",
    confirmLabel: "Obriši sve",
    onConfirm: () => {
      selectedIds.clear();
      currentPage = 1;
      persistSaved([]);
    }
  });
}

function readEditFormDelivery() {
  const fullName = editFullName.value.trim();
  const streetAddress = editStreet.value.trim();
  const city = editCity.value.trim();
  if (!fullName || !streetAddress || !city) {
    throw new Error("Ime, ulica i grad su obavezni.");
  }

  const codRaw = editCod.value.trim();
  let codAmount = null;
  if (codRaw !== "") {
    const parsed = Number(codRaw);
    if (Number.isNaN(parsed) || parsed < 0) {
      throw new Error("Pouzeće mora biti validan iznos.");
    }
    codAmount = parsed;
  }

  return {
    fullName,
    phoneNumber: editPhone.value.trim() || null,
    email: editEmail.value.trim() || null,
    streetAddress,
    city,
    postalCode: editPostal.value.trim() || null,
    country: editCountry.value.trim() || null,
    payerType: editPayer.value || null,
    codAmount
  };
}

function updateSavedDelivery(id, delivery) {
  const list = loadSaved();
  const index = list.findIndex((item) => item.id === id);
  if (index < 0) return false;

  list[index] = {
    ...list[index],
    delivery,
    updatedAt: new Date().toISOString()
  };
  persistSaved(list);
  return true;
}

function getTotalPages(listLength) {
  return Math.max(1, Math.ceil(listLength / PAGE_SIZE));
}

function clampCurrentPage(listLength) {
  const totalPages = getTotalPages(listLength);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
}

function getPageItems(list) {
  clampCurrentPage(list.length);
  const start = (currentPage - 1) * PAGE_SIZE;
  return list.slice(start, start + PAGE_SIZE);
}

function updatePagination(listLength) {
  const totalPages = getTotalPages(listLength);
  const show = listLength > PAGE_SIZE;
  savedPagination.classList.toggle("is-visible", show);
  savedPageInfo.textContent = currentPage + " / " + totalPages;
  savedPrevPage.disabled = currentPage <= 1 || busy;
  savedNextPage.disabled = currentPage >= totalPages || busy;
}

function renderSavedList() {
  const list = loadSaved();
  pruneSelection(list);
  clampCurrentPage(list.length);

  const selectedCount = list.filter((item) => selectedIds.has(item.id)).length;
  savedCount.textContent = selectedCount > 0
    ? "(" + selectedCount + "/" + list.length + ")"
    : "(" + list.length + ")";

  printSavedBtn.disabled = selectedCount === 0 || busy;
  clearSavedBtn.disabled = list.length === 0 || busy;
  savedActions.classList.toggle("is-empty", list.length === 0);
  savedEmpty.classList.toggle("is-hidden", list.length > 0);
  updateSelectAllButton(list);
  updatePrintButtonLabel();
  updatePagination(list.length);
  savedList.replaceChildren();

  getPageItems(list).forEach((item) => {
    const selected = selectedIds.has(item.id);
    const row = document.createElement("div");
    row.className = "saved-item" + (selected ? " is-selected" : "");
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute(
      "aria-pressed",
      selected ? "true" : "false"
    );
    row.setAttribute(
      "aria-label",
      (selected ? "Izabrano: " : "Izaberi: ") + (item.delivery.fullName || "dostavu")
    );

    const body = document.createElement("div");
    body.className = "saved-item-body";

    const title = document.createElement("p");
    title.className = "saved-item-title";
    title.textContent = item.delivery.fullName || "Bez imena";

    const meta = document.createElement("p");
    meta.className = "saved-item-meta";
    meta.textContent = [item.delivery.streetAddress, item.delivery.phoneNumber]
      .filter(Boolean)
      .join(" · ");

    body.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "saved-item-actions";

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "saved-item-edit";
    edit.setAttribute("aria-label", "Izmeni");
    edit.title = "Izmeni";
    edit.innerHTML = '<i class="fas fa-pen" aria-hidden="true"></i>';
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      openEditModal(item.id);
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "saved-item-remove";
    remove.setAttribute("aria-label", "Ukloni");
    remove.title = "Ukloni";
    remove.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      requestRemoveSaved(item.id);
    });

    actions.append(edit, remove);

    row.addEventListener("click", () => {
      if (selectedIds.has(item.id)) selectedIds.delete(item.id);
      else selectedIds.add(item.id);
      renderSavedList();
    });

    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });

    row.append(body, actions);
    savedList.appendChild(row);
  });
}

async function extractDelivery(text) {
  const response = await fetch(EXTRACT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": getSelectedLanguage()
    },
    body: JSON.stringify({ text })
  });

  const type = response.headers.get("Content-Type") || "";
  const data = type.includes("json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error((data && (data.message || data.error)) || "Adresa nije mogla da se izvuče.");
  }

  if (!data || !data.fullName || !data.streetAddress || !data.city) {
    throw new Error("Servis nije vratio kompletnu adresu dostave.");
  }

  return data;
}

async function printDeliveries(deliveries, filename) {
  const response = await fetch(PRINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/pdf",
      "Accept-Language": getSelectedLanguage()
    },
    body: JSON.stringify({
      addresses: deliveries.map(toPrintAddress),
      format: getSelectedFormat()
    })
  });

  const type = response.headers.get("Content-Type") || "";
  if (!response.ok) {
    let message = "Štampa nije uspela.";
    if (type.includes("json")) {
      const data = await response.json();
      message = data.message || data.error || message;
    }
    throw new Error(message);
  }

  const bytes = await response.blob();
  const name = filename || "dostave.pdf";
  const pdf = new File([bytes], name, { type: "application/pdf" });
  const url = URL.createObjectURL(pdf);
  objectUrls.push(url);
  return { url, filename: name };
}

function discardObjectUrl(url) {
  const index = objectUrls.indexOf(url);
  if (index >= 0) objectUrls.splice(index, 1);
  URL.revokeObjectURL(url);
}

function releasePdfPreviewUrl() {
  if (!pdfPreviewUrl) return;
  const url = pdfPreviewUrl;
  pdfPreviewUrl = null;
  discardObjectUrl(url);
}

function loadPdfJs() {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    return Promise.resolve(window.pdfjsLib);
  }
  if (!pdfjsLoader) {
    pdfjsLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PDFJS_SRC;
      script.async = true;
      script.onload = () => {
        if (!window.pdfjsLib) {
          pdfjsLoader = null;
          reject(new Error("PDF pregled nije dostupan."));
          return;
        }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        resolve(window.pdfjsLib);
      };
      script.onerror = () => {
        pdfjsLoader = null;
        reject(new Error("PDF pregled nije mogao da se učita."));
      };
      document.head.appendChild(script);
    });
  }
  return pdfjsLoader;
}

function setPdfToolsEnabled(enabled) {
  pdfPreviewDownload.disabled = !enabled;
  pdfPreviewPrint.disabled = !enabled;
}

function resetPdfPreviewStatus() {
  pdfPreviewStatus.classList.remove("is-error");
  pdfPreviewStatusText.textContent = "Pripremam pregled";
  pdfPreviewStatus.hidden = false;
}

function showPdfPreviewError(message) {
  pdfPreviewStatus.classList.add("is-error");
  pdfPreviewStatusText.textContent = message;
  pdfPreviewStatus.hidden = false;
}

function destroyPdfPreviewDoc() {
  if (!pdfPreviewDoc) return;
  const doc = pdfPreviewDoc;
  pdfPreviewDoc = null;
  doc.destroy().catch(() => {});
}

function openPdfPreview() {
  const requestId = ++pdfPreviewRequest;
  pdfPreviewData = null;
  pdfPreviewRenderWidth = 0;
  destroyPdfPreviewDoc();
  pdfPreviewPages.replaceChildren();
  setPdfToolsEnabled(false);
  resetPdfPreviewStatus();
  pdfPreviewModal.classList.add("is-open");
  pdfPreviewModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("pdf-preview-open");
  pdfPreviewClose.focus();
  return requestId;
}

function isCurrentPdfRender(requestId, renderToken) {
  return requestId === pdfPreviewRequest && renderToken === pdfPreviewRenderToken;
}

async function renderPdfPages(requestId) {
  const renderToken = ++pdfPreviewRenderToken;
  const pdfjsLib = await loadPdfJs();
  if (!isCurrentPdfRender(requestId, renderToken) || !pdfPreviewData) return;

  destroyPdfPreviewDoc();
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(pdfPreviewData) }).promise;
  if (!isCurrentPdfRender(requestId, renderToken)) {
    doc.destroy().catch(() => {});
    return;
  }

  pdfPreviewDoc = doc;
  pdfPreviewPages.replaceChildren();
  const cssWidth = Math.max((pdfPreviewPages.clientWidth || 320) - 28, 240);
  pdfPreviewRenderWidth = pdfPreviewPages.clientWidth;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
    if (!isCurrentPdfRender(requestId, renderToken)) return;
    const page = await doc.getPage(pageNumber);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({
      scale: (cssWidth / base.width) * pixelRatio
    });
    const canvas = document.createElement("canvas");
    canvas.className = "pdf-preview-page";
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext("2d", { alpha: false });
    await page.render({ canvasContext: context, viewport }).promise;
    if (!isCurrentPdfRender(requestId, renderToken)) return;
    pdfPreviewPages.appendChild(canvas);
    pdfPreviewStatus.hidden = true;
  }
}

async function showPdfPreview(file, requestId) {
  if (requestId !== pdfPreviewRequest) {
    discardObjectUrl(file.url);
    return;
  }

  releasePdfPreviewUrl();
  pdfPreviewUrl = file.url;
  pdfPreviewFilename = file.filename || "dostave.pdf";
  setPdfToolsEnabled(true);

  try {
    const response = await fetch(file.url);
    const data = await response.arrayBuffer();
    if (requestId !== pdfPreviewRequest) return;
    pdfPreviewData = data;
    await renderPdfPages(requestId);
  } catch (error) {
    if (requestId !== pdfPreviewRequest) return;
    showPdfPreviewError(error.message || "Pregled nije mogao da se prikaže.");
  }
}

function closePdfPreview() {
  pdfPreviewRequest += 1;
  window.clearTimeout(pdfPreviewResizeTimer);
  pdfPreviewModal.classList.remove("is-open");
  pdfPreviewModal.setAttribute("aria-hidden", "true");
  pdfPreviewPages.replaceChildren();
  pdfPreviewData = null;
  pdfPreviewRenderWidth = 0;
  setPdfToolsEnabled(false);
  pdfPreviewStatus.hidden = true;
  document.body.classList.remove("pdf-preview-open");
  destroyPdfPreviewDoc();
  releasePdfPreviewUrl();
}

function downloadPdfPreview() {
  if (!pdfPreviewUrl) return;
  const link = document.createElement("a");
  link.href = pdfPreviewUrl;
  link.download = pdfPreviewFilename || "dostave.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function printPdfPreview() {
  const canvases = pdfPreviewPages.querySelectorAll("canvas");
  if (!canvases.length) return;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.className = "pdf-print-frame";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  doc.open();
  doc.write("<!DOCTYPE html><html><head><title></title><style>@page{margin:8mm}body{margin:0}img{display:block;width:100%;height:auto;break-after:page}img:last-child{break-after:auto}</style></head><body></body></html>");
  doc.close();
  canvases.forEach((canvas) => {
    const image = doc.createElement("img");
    image.alt = "";
    image.src = canvas.toDataURL("image/png");
    doc.body.appendChild(image);
  });

  const win = iframe.contentWindow;
  const removeFrame = () => {
    if (iframe.parentNode) iframe.remove();
  };
  win.addEventListener("afterprint", () => window.setTimeout(removeFrame, 200));
  window.setTimeout(() => {
    win.focus();
    win.print();
    window.setTimeout(removeFrame, 1500);
  }, 200);
}

async function previewDeliveries(deliveries, filename) {
  const requestId = openPdfPreview();
  try {
    const file = await printDeliveries(deliveries, filename);
    await showPdfPreview(file, requestId);
  } catch (error) {
    if (requestId === pdfPreviewRequest) closePdfPreview();
    throw error;
  }
}

async function submitText(text) {
  if (busy) return;
  const value = text.trim();
  if (!value) return;

  closePdfPreview();
  objectUrls.forEach((url) => URL.revokeObjectURL(url));
  objectUrls.length = 0;
  chat.replaceChildren();

  const userMessage = addUserMessage(value);
  showLoading(userMessage.actions);

  prompt.value = "";
  resizePrompt();
  syncSendButton();

  if (value.length < 10) {
    const status = addMessage("assistant", "Tekst mora imati između 10 i 5000 karaktera.");
    status.bubble.classList.add("is-error");
    focusParsedAction(fillMessageActions(userMessage.actions, value));
    return;
  }

  busy = true;
  syncSendButton();
  renderSavedList();
  try {
    const delivery = await extractDelivery(value);
    const editBtn = fillMessageActions(userMessage.actions, value);
    const { card, saveBtn } = createDeliveryCard(delivery, value);
    addMessage("assistant", card);
    focusParsedAction(saveBtn.disabled ? editBtn : saveBtn);
  } catch (error) {
    const message = error && error.message === "Failed to fetch"
      ? "Nije moguće povezati se sa servisom za dostavu. Proveri API adresu ili CORS."
      : (error.message || "Adresa nije mogla da se izvuče.");
    const status = addMessage("assistant", message);
    status.bubble.classList.add("is-error");
    focusParsedAction(fillMessageActions(userMessage.actions, value));
  } finally {
    busy = false;
    syncSendButton();
    renderSavedList();
  }
}

prompt.addEventListener("input", () => {
  resizePrompt();
  syncSendButton();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitText(prompt.value);
});

suggestions.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  prompt.value = button.dataset.text;
  resizePrompt();
  syncSendButton();
  prompt.focus();
});

printSavedBtn.addEventListener("click", async () => {
  const selected = getSelectedItems();
  if (!selected.length || busy) return;

  busy = true;
  syncSendButton();
  renderSavedList();
  printSavedBtn.disabled = true;
  printSavedBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Štampam';

  try {
    await previewDeliveries(
      selected.map((item) => item.delivery),
      selected.length === 1
        ? toNameFilename(selected[0].delivery.fullName)
        : "grupne-dostave.pdf"
    );
  } catch (error) {
    alert(error.message || "Grupna štampa nije uspela.");
  } finally {
    busy = false;
    syncSendButton();
    renderSavedList();
  }
});

clearSavedBtn.addEventListener("click", requestClearSaved);

selectAllSavedBtn.addEventListener("click", toggleSelectAll);

savedPrevPage.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage -= 1;
  renderSavedList();
});

savedNextPage.addEventListener("click", () => {
  const totalPages = getTotalPages(loadSaved().length);
  if (currentPage >= totalPages) return;
  currentPage += 1;
  renderSavedList();
});

printSettingsToggle.addEventListener("click", () => {
  const open = printSettings.classList.toggle("is-open");
  printSettingsToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

printFormatSelect.addEventListener("change", saveSettingsFromControls);

printLanguageToggle.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-lang]");
  if (!button) return;
  setLanguage(button.dataset.lang);
  saveSettingsFromControls();
});

editModalClose.addEventListener("click", closeEditModal);
editCancelBtn.addEventListener("click", closeEditModal);

editModal.addEventListener("click", (event) => {
  if (event.target === editModal) closeEditModal();
});

confirmModalClose.addEventListener("click", closeConfirmModal);
confirmCancelBtn.addEventListener("click", closeConfirmModal);

confirmModal.addEventListener("click", (event) => {
  if (event.target === confirmModal) closeConfirmModal();
});

confirmOkBtn.addEventListener("click", () => {
  const action = confirmAction;
  closeConfirmModal();
  if (action) action();
});

pdfPreviewClose.addEventListener("click", closePdfPreview);
pdfPreviewDownload.addEventListener("click", downloadPdfPreview);
pdfPreviewPrint.addEventListener("click", printPdfPreview);

pdfPreviewModal.addEventListener("click", (event) => {
  if (event.target === pdfPreviewModal) closePdfPreview();
});

window.addEventListener("resize", () => {
  if (!pdfPreviewModal.classList.contains("is-open") || !pdfPreviewData) return;
  const width = pdfPreviewPages.clientWidth;
  if (Math.abs(width - pdfPreviewRenderWidth) < 48) return;
  window.clearTimeout(pdfPreviewResizeTimer);
  const requestId = pdfPreviewRequest;
  pdfPreviewResizeTimer = window.setTimeout(() => {
    renderPdfPages(requestId).catch(() => {});
  }, 180);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (pdfPreviewModal.classList.contains("is-open")) {
    closePdfPreview();
    return;
  }
  if (confirmModal.classList.contains("is-open")) {
    closeConfirmModal();
    return;
  }
  if (editModal.classList.contains("is-open")) {
    closeEditModal();
  }
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const id = editId.value;
    const delivery = readEditFormDelivery();
    if (!updateSavedDelivery(id, delivery)) {
      throw new Error("Dostava nije pronađena u listi.");
    }
    closeEditModal();
  } catch (error) {
    alert(error.message || "Izmena nije sačuvana.");
  }
});

editPrintBtn.addEventListener("click", async () => {
  try {
    const delivery = readEditFormDelivery();
    const id = editId.value;
    updateSavedDelivery(id, delivery);
    editPrintBtn.disabled = true;
    await previewDeliveries([delivery], toNameFilename(delivery.fullName));
  } catch (error) {
    alert(error.message || "Štampa nije uspela.");
  } finally {
    editPrintBtn.disabled = false;
    renderSavedList();
  }
});

syncSettingsControls();
syncSendButton();
renderSavedList();
