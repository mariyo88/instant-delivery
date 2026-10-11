const I18N_SETTINGS_KEY = "firstcode.instantPrintSettings";
const I18N_LANGUAGES = ["sr", "en"];

const STRINGS = {
  sr: {
    pageTitle: "FirstCode | Asistent za nalepnice",
    language: "Jezik",
    heroTitle: "Zdravo. Spreman da počnemo?",
    heroLead: "Nalepi poruku o dostavi, a FirstCode će izvući adresu. Sačuvaj je u listu i odštampaj nalepnice grupno.",
    promptLabel: "Nalepi poruku o dostavi",
    extractAddress: "Izvuci adresu",
    addressShort: "Adresa",
    cashOnDelivery: "Pouzeće",
    international: "Inostranstvo",
    sampleLocal: "Molimo dostaviti za Anu Petrović, Knez Mihailova 12, 11000 Beograd. Telefon +381 64 123 4567.",
    sampleCod: "Pouzeće 3500 RSD za Marka Jovića, Bulevar kralja Aleksandra 72, 11000 Beograd. Telefon +381 63 111 2222.",
    sampleIntl: "Pošalji za John Smith, 221B Baker Street, London NW1 6XE, United Kingdom. Telefon +44 20 7946 0958.",
    settings: "Podešavanja",
    format: "Format",
    printList: "Lista za štampu",
    selectAll: "Izaberi sve",
    clearSelection: "Poništi izbor",
    savedEmpty: "Sačuvaj dostave da bi ih grupno odštampao.",
    listPagination: "Paginacija liste",
    prevPage: "Prethodna strana",
    nextPage: "Sledeća strana",
    print: "Odštampaj",
    printCount: "Odštampaj ({count})",
    printing: "Štampam",
    deleteAll: "Obriši sve",
    about: "O nama",
    news: "Vesti",
    blog: "Blog",
    giftCards: "Poklon kartice",
    careers: "Karijera",
    offer: "Ponuda",
    support: "Podrška",
    terms: "Uslovi korišćenja",
    contact: "Kontakt",
    usagePolicy: "Pravila upotrebe",
    madeWith: "Napravljeno sa",
    madeBy: "od",
    editDelivery: "Izmena dostave",
    close: "Zatvori",
    fullName: "Ime i prezime",
    phone: "Telefon",
    email: "Email",
    street: "Ulica i broj",
    city: "Grad",
    postalCode: "Poštanski broj",
    country: "Država",
    payer: "Plaća",
    receiver: "Primalac",
    sender: "Pošiljalac",
    codAmount: "Pouzeće (RSD)",
    save: "Sačuvaj",
    saved: "Sačuvano",
    confirm: "Potvrda",
    cancel: "Otkaži",
    delete: "Obriši",
    download: "Preuzmi",
    labelPreview: "Pregled nalepnice",
    preparingPreview: "Pripremam pregled",
    extracting: "Izvlačim adresu",
    edit: "Izmeni",
    remove: "Ukloni",
    unnamed: "Bez imena",
    codLine: "Pouzeće: {amount}",
    payerLine: "Plaća: {payer}",
    selectedItem: "Izabrano: {name}",
    selectItem: "Izaberi: {name}",
    deliveryNoun: "dostavu",
    thisDelivery: "ovu dostavu",
    deleteDeliveryTitle: "Brisanje dostave",
    deleteDeliveryMessage: "Da li želiš da obrišeš \"{name}\" iz liste za štampu?",
    deleteListTitle: "Brisanje liste",
    deleteListMessage: "Da li želiš da obrišeš celu listu za štampu?",
    requiredFields: "Ime, ulica i grad su obavezni.",
    invalidCod: "Pouzeće mora biti validan iznos.",
    extractFailed: "Adresa nije mogla da se izvuče.",
    incompleteAddress: "Servis nije vratio kompletnu adresu dostave.",
    printFailed: "Štampa nije uspela.",
    batchPrintFailed: "Grupna štampa nije uspela.",
    pdfUnavailable: "PDF pregled nije dostupan.",
    pdfLoadFailed: "PDF pregled nije mogao da se učita.",
    previewFailed: "Pregled nije mogao da se prikaže.",
    networkError: "Nije moguće povezati se sa servisom za dostavu. Proveri API adresu ili CORS.",
    textLength: "Tekst mora imati između 10 i 5000 karaktera.",
    notInList: "Dostava nije pronađena u listi.",
    saveFailed: "Izmena nije sačuvana.",
    filenameSuffix: "dostava.pdf",
    filenameDefault: "dostava.pdf",
    filenameBatch: "grupne-dostave.pdf",
    filenameDeliveries: "dostave.pdf",
    notFoundTitle: "FirstCode | Stranica nije pronađena",
    notFoundHeading: "Stranica nije pronađena",
    notFoundLead: "Adresa koju tražiš ne postoji ili je premeštena. Vrati se na početnu i nastavi sa nalepnicama.",
    backHome: "Nazad na početnu",
    serverErrorTitle: "FirstCode | Greška na serveru",
    serverErrorHeading: "Nešto nije u redu",
    serverErrorLead: "Došlo je do greške na našoj strani. Pokušaj ponovo za trenutak, ili se vrati na početnu.",
    tryAgain: "Pokušaj ponovo",
    madeByError: "Napravljeno od"
  },
  en: {
    pageTitle: "FirstCode | Label assistant",
    language: "Language",
    heroTitle: "Hi. Ready to get started?",
    heroLead: "Paste a delivery message and FirstCode will extract the address. Save it to the list and print labels in a batch.",
    promptLabel: "Paste a delivery message",
    extractAddress: "Extract address",
    addressShort: "Address",
    cashOnDelivery: "Cash on delivery",
    international: "International",
    sampleLocal: "Please deliver to Ana Petrović, Knez Mihailova 12, 11000 Belgrade. Phone +381 64 123 4567.",
    sampleCod: "Cash on delivery 3500 RSD for Marko Jović, Bulevar kralja Aleksandra 72, 11000 Belgrade. Phone +381 63 111 2222.",
    sampleIntl: "Send to John Smith, 221B Baker Street, London NW1 6XE, United Kingdom. Phone +44 20 7946 0958.",
    settings: "Settings",
    format: "Format",
    printList: "Print list",
    selectAll: "Select all",
    clearSelection: "Clear selection",
    savedEmpty: "Save deliveries to print them together.",
    listPagination: "List pagination",
    prevPage: "Previous page",
    nextPage: "Next page",
    print: "Print",
    printCount: "Print ({count})",
    printing: "Printing",
    deleteAll: "Delete all",
    about: "About",
    news: "News",
    blog: "Blog",
    giftCards: "Gift cards",
    careers: "Careers",
    offer: "Products",
    support: "Support",
    terms: "Terms of use",
    contact: "Contact",
    usagePolicy: "Usage policy",
    madeWith: "Made with",
    madeBy: "by",
    editDelivery: "Edit delivery",
    close: "Close",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    street: "Street and number",
    city: "City",
    postalCode: "Postal code",
    country: "Country",
    payer: "Paid by",
    receiver: "Recipient",
    sender: "Sender",
    codAmount: "Cash on delivery (RSD)",
    save: "Save",
    saved: "Saved",
    confirm: "Confirm",
    cancel: "Cancel",
    delete: "Delete",
    download: "Download",
    labelPreview: "Label preview",
    preparingPreview: "Preparing preview",
    extracting: "Extracting address",
    edit: "Edit",
    remove: "Remove",
    unnamed: "No name",
    codLine: "Cash on delivery: {amount}",
    payerLine: "Paid by: {payer}",
    selectedItem: "Selected: {name}",
    selectItem: "Select: {name}",
    deliveryNoun: "delivery",
    thisDelivery: "this delivery",
    deleteDeliveryTitle: "Delete delivery",
    deleteDeliveryMessage: "Do you want to remove \"{name}\" from the print list?",
    deleteListTitle: "Delete list",
    deleteListMessage: "Do you want to delete the entire print list?",
    requiredFields: "Name, street, and city are required.",
    invalidCod: "Cash on delivery must be a valid amount.",
    extractFailed: "The address could not be extracted.",
    incompleteAddress: "The service did not return a complete delivery address.",
    printFailed: "Printing failed.",
    batchPrintFailed: "Batch printing failed.",
    pdfUnavailable: "PDF preview is unavailable.",
    pdfLoadFailed: "PDF preview could not be loaded.",
    previewFailed: "The preview could not be shown.",
    networkError: "Could not reach the delivery service. Check the API address or CORS.",
    textLength: "Text must be between 10 and 5000 characters.",
    notInList: "Delivery was not found in the list.",
    saveFailed: "The change was not saved.",
    filenameSuffix: "delivery.pdf",
    filenameDefault: "delivery.pdf",
    filenameBatch: "batch-deliveries.pdf",
    filenameDeliveries: "deliveries.pdf",
    notFoundTitle: "FirstCode | Page not found",
    notFoundHeading: "Page not found",
    notFoundLead: "The address you requested does not exist or has moved. Go back home and continue with labels.",
    backHome: "Back to home",
    serverErrorTitle: "FirstCode | Server error",
    serverErrorHeading: "Something went wrong",
    serverErrorLead: "Something went wrong on our side. Try again in a moment, or go back home.",
    tryAgain: "Try again",
    madeByError: "Made by"
  }
};

function readI18nSettings() {
  try {
    const raw = localStorage.getItem(I18N_SETTINGS_KEY);
    const data = raw ? JSON.parse(raw) : {};
    return data && typeof data === "object" ? data : {};
  } catch (e) {
    return {};
  }
}

function getStoredLanguage() {
  const language = readI18nSettings().language;
  return I18N_LANGUAGES.includes(language) ? language : "sr";
}

function persistStoredLanguage(language) {
  const data = readI18nSettings();
  data.language = I18N_LANGUAGES.includes(language) ? language : "sr";
  localStorage.setItem(I18N_SETTINGS_KEY, JSON.stringify(data));
  return data.language;
}

function t(key, params) {
  const table = STRINGS[getStoredLanguage()] || STRINGS.sr;
  let text = Object.prototype.hasOwnProperty.call(table, key) ? table[key] : STRINGS.sr[key];
  if (text == null) text = key;
  if (params) {
    Object.keys(params).forEach((name) => {
      text = text.split("{" + name + "}").join(params[name] == null ? "" : String(params[name]));
    });
  }
  return text;
}

function applyI18n(root) {
  const scope = root || document;
  scope.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });
  scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.dataset.i18nTitle));
  });
  scope.querySelectorAll("[data-i18n-text]").forEach((el) => {
    el.dataset.text = t(el.dataset.i18nText);
  });
  document.documentElement.lang = getStoredLanguage();
}

function syncLanguageToggle(root) {
  const lang = getStoredLanguage();
  (root || document).querySelectorAll(".lang-toggle button[data-lang]").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function initLanguageToggle(onChange) {
  applyI18n(document);
  syncLanguageToggle(document);
  const toggle = document.getElementById("appLanguage");
  if (!toggle || toggle.dataset.bound === "true") return;
  toggle.dataset.bound = "true";
  toggle.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-lang]");
    if (!button) return;
    const language = persistStoredLanguage(button.dataset.lang);
    applyI18n(document);
    syncLanguageToggle(document);
    if (typeof onChange === "function") onChange(language);
  });
}
