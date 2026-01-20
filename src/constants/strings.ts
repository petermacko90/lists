export const strings = {
  en: {
    ACTIONS: 'Actions',
    ADD: 'Add',
    ADD_LIST: 'Add list',
    CANCEL: 'Cancel',
    CHECK: 'Check',
    CLOSE_EDIT: 'Close edit',
    CONFIRM: 'Confirm',
    CONFIRM_DELETE_ITEM: 'Are you sure you want to delete this item?',
    CONFIRM_DELETE_LIST: 'Are you sure you want to delete this list?',
    COPIED: 'Copied',
    COPY_NAME: 'Copy',
    COPY_TO_CLIPBOARD: 'Copy to clipboard',
    DELETE: 'Delete',
    DELETE_ITEM: 'Delete item',
    DELETE_LIST: 'Delete list',
    EDIT: 'Edit',
    EDIT_ITEM_NAME: 'Edit item text',
    EDIT_TITLE: 'Edit title',
    ITEM_NAME: 'Item text',
    LANGUAGE: 'Language',
    LIST_TITLE: 'List title',
    NO_ITEMS: 'No items',
    NO_LIST_FOUND: 'No lists found',
    NO_TITLE: '<No title>',
    SAVE: 'Save',
    TOGGLE_LISTS: 'Show/hide lists',
    UNCHECK: 'Uncheck',
  },
  sk: {
    ACTIONS: 'Akcie',
    ADD: 'Pridať',
    ADD_LIST: 'Pridať zoznam',
    CANCEL: 'Zrušiť',
    CHECK: 'Zaškrtnúť',
    CLOSE_EDIT: 'Zrušiť zmeny',
    CONFIRM: 'Potvrdiť',
    CONFIRM_DELETE_ITEM: 'Skutočne chcete vymazať túto položku?',
    CONFIRM_DELETE_LIST: 'Skutočne chcete vymazať tento zoznam?',
    COPIED: 'Skopírované',
    COPY_NAME: 'Kopírovať',
    COPY_TO_CLIPBOARD: 'Kopírovať do schránky',
    DELETE: 'Vymazať',
    DELETE_ITEM: 'Vymazať položku',
    DELETE_LIST: 'Vymazať zoznam',
    EDIT: 'Upraviť',
    EDIT_ITEM_NAME: 'Upraviť text položky',
    EDIT_TITLE: 'Upraviť názov zoznamu',
    ITEM_NAME: 'Text položky',
    LANGUAGE: 'Jazyk',
    LIST_TITLE: 'Názov zoznamu',
    NO_ITEMS: 'Žiadne položky',
    NO_LIST_FOUND: 'Žiadne zoznamy',
    NO_TITLE: '<Bez názvu>',
    SAVE: 'Uložiť',
    TOGGLE_LISTS: 'Zobraziť/schovať zoznamy',
    UNCHECK: 'Odškrtnúť',
  },
} as const;

export const languages = ['en', 'sk'] as const;

export type Language = (typeof languages)[number];

export type Translations = (typeof strings)[Language];

type LanguageDropdown = Array<{ value: Language; label: string }>;
export const languageDropdown: LanguageDropdown = [
  { value: 'en', label: 'English' },
  { value: 'sk', label: 'Slovenčina' },
];
