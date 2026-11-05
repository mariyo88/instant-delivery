const I18N_SETTINGS_KEY = "firstcode.instantPrintSettings";
const I18N_LANGUAGES = ["sr", "en"];

const STRINGS = {
  sr: {
    pageTitle: "FirstCode | Asistent za nalepnice",
    pageDescription: "Nalepi poruku o dostavi i FirstCode izvlači ime, adresu i telefon. Sačuvaj dostavu u listu i odštampaj nalepnice.",
    language: "Jezik",
    heroTitle: "Zdravo. Spreman da počnemo?",
    heroLead: "Nalepi poruku o dostavi, a FirstCode će izvući adresu. Sačuvaj je u listu i odštampaj nalepnice grupno.",
    promptLabel: "Nalepi poruku o dostavi",
    extractAddress: "Izvuci adresu",
    addressShort: "Adresa",
    cashOnDelivery: "Pouzeće",
    international: "Inostranstvo",
    sampleLocal: "Molimo dostaviti za Anu Petrović, Knez Mihailova 12, 11000 Beograd. Telefon +381 64 123 4567.",
    sampleCod: "Pouzeće 3500 RSD za Marka Jovića, Bulevar kralja Aleksandra 72, 11000 Beograd. Telefon +381 63 111 2222. Tip pošiljke paket, naziv pošiljke Patike Nike.",
    sampleIntl: "Pošalji za John Smith, 221B Baker Street, London NW1 6XE, United Kingdom. Telefon +44 20 7946 0958.",
    guideJump: "Kako se koristi",
    guidePageTitle: "FirstCode | Uputstvo",
    guideKicker: "Uputstvo",
    guideTitle: "Kako se koristi",
    guideLead: "Nalepi poruku običnim rečima. FirstCode izvlači ime, adresu, telefon, pouzeće i tip pošiljke. Za tip dovoljna je i skraćenica.",
    guideStep1Title: "Nalepi poruku",
    guideStep1Body: "Na početnoj nalepi tekst o dostavi u polje. Ime, ulica i grad su osnova. Ostalo dodaj ako ga imaš.",
    guideStep2Title: "Proveri karticu",
    guideStep2Body: "FirstCode predlaže šta je pročitao. Ako nešto fali ili je pogrešno, izmeni pre štampe.",
    guideStep3Title: "Sačuvaj i odštampaj",
    guideStep3Body: "Sačuvaj dostavu u listu. Jednu ili više njih odštampaš kao nalepnice.",
    guideWriteTitle: "Šta može da stoji u poruci",
    guideWriteBody: "Piši rečenicom. Ime, ulica i grad su obavezni. Telefon, email, poštanski broj, državu, pouzeće, ko plaća, tip i naziv pošiljke dodaj kad ih imaš. Ako ne kažeš ko plaća, računa se primalac.",
    guideExampleLabel: "Primer",
    guideExampleBefore: "Pouzeće 3500 RSD za Marka Jovića, Bulevar kralja Aleksandra 72, 11000 Beograd. Telefon +381 63 111 2222. Plaća primalac. Tip pošiljke ",
    guideExampleAfter: ", naziv pošiljke Patike Nike.",
    guideMarksTitle: "Skraćenice za tip pošiljke",
    guideMarksLead: "Oznake Pošte Srbije. Dovoljne su dve slovne oznake, na primer „tip PE“ ili „tip pe“.",
    guideMarkDomestic: "u Srbiji",
    guideMarkExceptRe: "osim RE",
    guideMarksHint: "RE je izuzetak u nizu RA–RZ: to je preporučena u Srbiji. Ostale oznake od RA do RZ su preporučena za inostranstvo.",
    guideWordsTitle: "Isto, napisano rečima",
    guideWordsLead: "Velika i mala slova su ista, kvačice nisu obavezne. Duža fraza sa istom rečju, na primer „preporučena pošiljka“, prolazi isto.",
    guideAliasYouWrite: "Napišeš",
    guideAliasBecomes: "Postaje",
    guideUnknown: "Tip koji nije na listi ostaje kako si ga napisao. Naziv pošiljke je roba, ne ime primaoca.",
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
    offer: "Ponuda",
    offerNote: "Asistent je trenutno besplatan. Pro i Posao stoje ovde dok ne budu spremni.",
    offerCurrent: "Sada",
    offerSoon: "Uskoro",
    offerPriceLater: "Cena kasnije",
    offerFreeName: "Besplatno",
    offerFreePrice: "0 RSD",
    offerFreeSummary: "Sve što treba da izvučeš adresu i odštampaš nalepnice.",
    offerFree1: "Izvlačenje adrese iz poruke",
    offerFree2: "Lista za štampu u pregledaču",
    offerFree3: "Grupna štampa nalepnica",
    offerFree4: "Formati A4 i 100×150",
    offerProName: "Pro",
    offerProSummary: "Za one koji šalju češće i hoće svoj znak na nalepnici.",
    offerPro1: "Logo na nalepnici",
    offerPro2: "Uvoz liste iz tabele",
    offerPro3: "Više sačuvanih formata",
    offerBusinessName: "Posao",
    offerBusinessSummary: "Za firmu koja hoće API i zajedničku listu.",
    offerBusiness1: "API za adresu i PDF",
    offerBusiness2: "Zajednička lista za tim",
    offerBusiness3: "Brendirane nalepnice",
    footerTagline: "Nalepi poruku, izvuci adresu i odštampaj nalepnice.",
    footerProduct: "Asistent",
    footerNav: "Stranice",
    home: "Početna",
    support: "Podrška",
    terms: "Uslovi korišćenja",
    contact: "Kontakt",
    usagePolicy: "Politika privatnosti",
    privacyTitle: "FirstCode | Politika privatnosti",
    privacyHeading: "Politika privatnosti",
    privacyUpdated: "Ažurirano 12. oktobra 2026.",
    privacyIntro: "FirstCode asistent za nalepnice izvlači adresu iz poruke o dostavi i pravi nalepnice za štampu. Ovde piše šta se dešava sa podacima koje uneseš.",
    privacyLocalTitle: "Lista ostaje u pregledaču",
    privacyLocalBody: "Ime, adresa, telefon, email, pouzeće i ostala polja koja sačuvaš u listi za štampu ostaju u tvom pregledaču, na ovom uređaju. FirstCode tu listu ne drži na serveru. Jezik i format štampe takođe ostaju u pregledaču. Ako obrišeš listu u aplikaciji, ili obrišeš podatke ovog sajta u pregledaču, lista nestaje sa tog uređaja.",
    privacyServerTitle: "Poruka ide na server",
    privacyServerBody: "Kad zatražiš izvlačenje adrese, poruka koju si nalepio šalje se na server FirstCode-a. Server tu poruku šalje Google-u da bi iz nje izvukao adresu. FirstCode od te poruke ne pravi nalog i ne koristi je za oglase.",
    privacyPrintBody: "Kad zatražiš štampu, izabrane adrese se šalju na server FirstCode-a. Server od njih pravi PDF i vraća ga u tvoj pregledač.",
    privacyContactTitle: "Kontakt",
    privacyContactLead: "Za pitanja o ovim podacima piši na",
    termsTitle: "FirstCode | Uslovi korišćenja",
    termsHeading: "Uslovi korišćenja",
    termsUpdated: "Ažurirano 12. oktobra 2026.",
    termsIntro: "Asistent za nalepnice je besplatan alat. Nalepiš poruku, FirstCode predloži adresu, ti je proveriš, sačuvaš i odštampaš nalepnicu.",
    termsDataTitle: "Koje podatke smeš da uneseš",
    termsDataBody: "Smeš da uneseš podatke koje imaš pravo da koristiš: svoje, ili podatke osobe za koju šalješ pošiljku. Nemoj da unosiš tuđe ime, adresu ili telefon bez osnova.",
    termsAccuracyTitle: "Adresa može biti pogrešna",
    termsAccuracyBody: "Adresa koju FirstCode izvuče može biti pogrešna ili nepotpuna. Pre štampe i pre slanja proveri ime, ulicu, grad, poštanski broj i telefon.",
    termsLiabilityTitle: "Odgovornost",
    termsLiabilityBody: "FirstCode ne odgovara za pogrešnu nalepnicu, za pošiljku koja ode na pogrešnu adresu, niti za štetu nastalu jer si se oslonio na izvučenu adresu. Alat se daje takav kakav jeste, bez garancije da će adresa biti tačna.",
    termsContactLead: "Pitanja o ovim uslovima:",
    footerCredit: "Proizvod FirstCode-a",
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
    shipmentType: "Tip pošiljke",
    shipmentName: "Naziv pošiljke",
    shipmentTypePaket: "Paket",
    shipmentTypePostExpress: "Post Express",
    shipmentTypeRegistered: "Preporučena",
    shipmentTypeRegisteredIntl: "Preporučena inostranstvo",
    shipmentTypeEms: "EMS",
    shipmentTypeValueLetter: "Vrednosno pismo",
    shipmentTypeDokument: "Dokument",
    shipmentTypePismo: "Pismo",
    shipmentTypePaleta: "Paleta",
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
    shipmentLine: "Pošiljka: {shipment}",
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
    tryAgain: "Pokušaj ponovo"
  },
  en: {
    pageTitle: "FirstCode | Label assistant",
    pageDescription: "Paste a delivery message and FirstCode extracts the name, address, and phone. Save the delivery to a list and print labels.",
    language: "Language",
    heroTitle: "Hi. Ready to get started?",
    heroLead: "Paste a delivery message and FirstCode will extract the address. Save it to the list and print labels in a batch.",
    promptLabel: "Paste a delivery message",
    extractAddress: "Extract address",
    addressShort: "Address",
    cashOnDelivery: "Cash on delivery",
    international: "International",
    sampleLocal: "Please deliver to Ana Petrović, Knez Mihailova 12, 11000 Belgrade. Phone +381 64 123 4567.",
    sampleCod: "Cash on delivery 3500 RSD for Marko Jović, Bulevar kralja Aleksandra 72, 11000 Belgrade. Phone +381 63 111 2222. Shipment type package, shipment name Nike sneakers.",
    sampleIntl: "Send to John Smith, 221B Baker Street, London NW1 6XE, United Kingdom. Phone +44 20 7946 0958.",
    guideJump: "How to use it",
    guidePageTitle: "FirstCode | Guide",
    guideKicker: "Guide",
    guideTitle: "How to use it",
    guideLead: "Paste a message in plain language. FirstCode pulls out the name, address, phone, cash on delivery, and shipment type. A short code is enough for the type.",
    guideStep1Title: "Paste a message",
    guideStep1Body: "On the home page, paste the delivery text into the field. Name, street, and city are the base. Add the rest when you have it.",
    guideStep2Title: "Check the card",
    guideStep2Body: "FirstCode suggests what it read. If something is missing or wrong, edit it before you print.",
    guideStep3Title: "Save and print",
    guideStep3Body: "Save the delivery to the list. Print one label, or several at once.",
    guideWriteTitle: "What can go in the message",
    guideWriteBody: "Write a sentence. Name, street, and city are required. Add phone, email, postal code, country, cash on delivery, who pays, shipment type, and shipment name when you have them. If you do not say who pays, the recipient is used.",
    guideExampleLabel: "Example",
    guideExampleBefore: "Cash on delivery 3500 RSD for Marko Jović, Bulevar kralja Aleksandra 72, 11000 Belgrade. Phone +381 63 111 2222. Paid by the recipient. Shipment type ",
    guideExampleAfter: ", shipment name Nike sneakers.",
    guideMarksTitle: "Shortcuts for the shipment type",
    guideMarksLead: "Post of Serbia marks. Two letters are enough, for example “type PE” or “type pe”.",
    guideMarkDomestic: "in Serbia",
    guideMarkExceptRe: "except RE",
    guideMarksHint: "RE is the exception inside RA–RZ: it is registered mail inside Serbia. The other marks from RA to RZ are registered mail abroad.",
    guideWordsTitle: "The same, in words",
    guideWordsLead: "Capital letters do not matter, and you can skip diacritics. A longer phrase with the same word, such as “preporučena pošiljka”, works the same way.",
    guideAliasYouWrite: "You write",
    guideAliasBecomes: "Becomes",
    guideUnknown: "A type that is not on this list stays as you wrote it. The shipment name is the goods, not the recipient’s name.",
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
    offer: "Plans",
    offerNote: "The assistant is free right now. Pro and Business stay here until they are ready.",
    offerCurrent: "Now",
    offerSoon: "Soon",
    offerPriceLater: "Price later",
    offerFreeName: "Free",
    offerFreePrice: "0 RSD",
    offerFreeSummary: "Everything you need to pull an address and print labels.",
    offerFree1: "Address extraction from a message",
    offerFree2: "Print list kept in the browser",
    offerFree3: "Batch label printing",
    offerFree4: "A4 and 100×150 formats",
    offerProName: "Pro",
    offerProSummary: "For people who ship often and want their own mark on the label.",
    offerPro1: "Logo on the label",
    offerPro2: "Import a list from a spreadsheet",
    offerPro3: "More saved formats",
    offerBusinessName: "Business",
    offerBusinessSummary: "For a company that wants an API and a shared list.",
    offerBusiness1: "API for addresses and PDFs",
    offerBusiness2: "A shared list for the team",
    offerBusiness3: "Branded labels",
    footerTagline: "Paste a message, extract the address, and print labels.",
    footerProduct: "Assistant",
    footerNav: "Pages",
    home: "Home",
    support: "Support",
    terms: "Terms of use",
    contact: "Contact",
    usagePolicy: "Privacy policy",
    privacyTitle: "FirstCode | Privacy policy",
    privacyHeading: "Privacy policy",
    privacyUpdated: "Updated 12 October 2026.",
    privacyIntro: "The FirstCode label assistant extracts an address from a delivery message and makes labels for printing. This page says what happens to the data you enter.",
    privacyLocalTitle: "The list stays in the browser",
    privacyLocalBody: "The name, address, phone, email, cash-on-delivery amount, and any other fields you save in the print list stay in your browser, on this device. FirstCode does not keep that list on a server. Language and print format stay in the browser as well. If you delete the list in the app, or clear this site's data in the browser, the list is gone from that device.",
    privacyServerTitle: "The message goes to the server",
    privacyServerBody: "When you ask to extract an address, the message you pasted is sent to FirstCode's server. The server sends that message to Google so Google can extract the address. FirstCode does not create an account from that message and does not use it for ads.",
    privacyPrintBody: "When you ask to print, the addresses you selected are sent to FirstCode's server. The server turns them into a PDF and returns it to your browser.",
    privacyContactTitle: "Contact",
    privacyContactLead: "Questions about this data:",
    termsTitle: "FirstCode | Terms of use",
    termsHeading: "Terms of use",
    termsUpdated: "Updated 12 October 2026.",
    termsIntro: "The label assistant is a free tool. You paste a message, FirstCode suggests an address, and you check it, save it, and print a label.",
    termsDataTitle: "What you may enter",
    termsDataBody: "Enter only data you have a right to use: your own, or the details of a person you are sending a shipment for. Do not enter someone else's name, address, or phone without a reason to do so.",
    termsAccuracyTitle: "The address can be wrong",
    termsAccuracyBody: "The address FirstCode extracts can be wrong or incomplete. Before you print or ship, check the name, street, city, postal code, and phone.",
    termsLiabilityTitle: "Liability",
    termsLiabilityBody: "FirstCode is not responsible for a wrong label, for a shipment that goes to the wrong address, or for loss that comes from relying on the extracted address. The tool is provided as it is, with no guarantee that the address will be correct.",
    termsContactLead: "Questions about these terms:",
    footerCredit: "A FirstCode product",
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
    shipmentType: "Shipment type",
    shipmentName: "Shipment name",
    shipmentTypePaket: "Package",
    shipmentTypePostExpress: "Post Express",
    shipmentTypeRegistered: "Registered (domestic)",
    shipmentTypeRegisteredIntl: "Registered (international)",
    shipmentTypeEms: "EMS",
    shipmentTypeValueLetter: "Value letter",
    shipmentTypeDokument: "Document",
    shipmentTypePismo: "Letter",
    shipmentTypePaleta: "Pallet",
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
    shipmentLine: "Shipment: {shipment}",
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
    tryAgain: "Try again"
  }
};

// Plans shown in the footer. "current" is live. "planned" is reserved for later
// and is not sold yet. Reuse this list when a pricing page is added.
const OFFERS = [
  {
    id: "free",
    status: "current",
    price: 0,
    currency: "RSD",
    priceLabelKey: "offerFreePrice",
    nameKey: "offerFreeName",
    summaryKey: "offerFreeSummary",
    featureKeys: ["offerFree1", "offerFree2", "offerFree3", "offerFree4"]
  },
  {
    id: "pro",
    status: "planned",
    price: null,
    currency: "RSD",
    priceLabelKey: "offerPriceLater",
    nameKey: "offerProName",
    summaryKey: "offerProSummary",
    featureKeys: ["offerPro1", "offerPro2", "offerPro3"]
  },
  {
    id: "business",
    status: "planned",
    price: null,
    currency: "RSD",
    priceLabelKey: "offerPriceLater",
    nameKey: "offerBusinessName",
    summaryKey: "offerBusinessSummary",
    featureKeys: ["offerBusiness1", "offerBusiness2", "offerBusiness3"]
  }
];

if (typeof window !== "undefined") window.FirstCodeOffers = OFFERS;

function offerCard(offer) {
  const article = document.createElement("article");
  article.className = "footer-offer is-" + (offer.status === "current" ? "current" : "planned");
  article.dataset.offer = offer.id;

  const top = document.createElement("div");
  top.className = "footer-offer-top";

  const badge = document.createElement("span");
  badge.className = "footer-offer-badge";
  badge.textContent = t(offer.status === "current" ? "offerCurrent" : "offerSoon");

  const price = document.createElement("p");
  price.className = "footer-offer-price";
  price.textContent = t(offer.priceLabelKey);

  top.append(badge, price);

  const title = document.createElement("h3");
  title.textContent = t(offer.nameKey);

  const summary = document.createElement("p");
  summary.className = "footer-offer-summary";
  summary.textContent = t(offer.summaryKey);

  const list = document.createElement("ul");
  offer.featureKeys.forEach((key) => {
    const item = document.createElement("li");
    item.textContent = t(key);
    list.appendChild(item);
  });

  article.append(top, title, summary, list);
  return article;
}

function renderFooterOffers(root) {
  (root || document).querySelectorAll("[data-footer-offers]").forEach((mount) => {
    mount.replaceChildren.apply(mount, OFFERS.map(offerCard));
  });
}

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
  scope.querySelectorAll("[data-i18n-content]").forEach((el) => {
    el.setAttribute("content", t(el.dataset.i18nContent));
  });
  document.documentElement.lang = getStoredLanguage();
  renderFooterOffers(scope);
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
