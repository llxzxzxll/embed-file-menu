const obsidian = require("obsidian");
const { Menu, Notice, Plugin, TFile, Platform } = obsidian;

const WRAP_IN_QUOTES = false;

const KEYS = [
  "showInExplorer",
  "revealInVault",
  "copyFile",
  "copyFilePath",
  "copyFolderPath",
  "pathCopied",
  "pathCopyFailed",
  "fileCopied",
  "fileCopyFailed",
  "explorerFailed",
  "filesDisabled",
];

const LOCALES = {
  en: [
    "Show in system explorer",
    "Reveal in vault",
    "Copy file",
    "Copy file path",
    "Copy folder path",
    "Path copied",
    "Failed to copy path",
    "File copied",
    "Failed to copy file",
    "Failed to open file explorer",
    "The Files core plugin is disabled",
  ],
  ru: [
    "Показать в проводнике",
    "Показать в хранилище",
    "Копировать файл",
    "Копировать путь к файлу",
    "Копировать путь к папке",
    "Путь скопирован",
    "Не удалось скопировать путь",
    "Файл скопирован",
    "Не удалось скопировать файл",
    "Не удалось открыть проводник",
    "Плагин «Файлы» отключён",
  ],
  uk: [
    "Показати у провіднику",
    "Показати у сховищі",
    "Копіювати файл",
    "Копіювати шлях до файлу",
    "Копіювати шлях до теки",
    "Шлях скопійовано",
    "Не вдалося скопіювати шлях",
    "Файл скопійовано",
    "Не вдалося скопіювати файл",
    "Не вдалося відкрити провідник",
    "Плагін «Файли» вимкнено",
  ],
  be: [
    "Паказаць у правадніку",
    "Паказаць у сховішчы",
    "Капіраваць файл",
    "Капіраваць шлях да файла",
    "Капіраваць шлях да папкі",
    "Шлях скапіраваны",
    "Не ўдалося скапіраваць шлях",
    "Файл скапіраваны",
    "Не ўдалося скапіраваць файл",
    "Не ўдалося адкрыць праваднік",
    "Убудова «Файлы» адключана",
  ],
  de: [
    "Im Explorer anzeigen",
    "Im Tresor anzeigen",
    "Datei kopieren",
    "Dateipfad kopieren",
    "Ordnerpfad kopieren",
    "Pfad kopiert",
    "Pfad konnte nicht kopiert werden",
    "Datei kopiert",
    "Datei konnte nicht kopiert werden",
    "Explorer konnte nicht geöffnet werden",
    "Das Kernplugin „Dateien“ ist deaktiviert",
  ],
  fr: [
    "Afficher dans l'explorateur",
    "Afficher dans le coffre",
    "Copier le fichier",
    "Copier le chemin du fichier",
    "Copier le chemin du dossier",
    "Chemin copié",
    "Échec de la copie du chemin",
    "Fichier copié",
    "Échec de la copie du fichier",
    "Impossible d'ouvrir l'explorateur",
    "Le plugin « Fichiers » est désactivé",
  ],
  es: [
    "Mostrar en el explorador",
    "Mostrar en la bóveda",
    "Copiar archivo",
    "Copiar ruta del archivo",
    "Copiar ruta de la carpeta",
    "Ruta copiada",
    "No se pudo copiar la ruta",
    "Archivo copiado",
    "No se pudo copiar el archivo",
    "No se pudo abrir el explorador",
    "El plugin «Archivos» está desactivado",
  ],
  pt: [
    "Mostrar no explorador",
    "Mostrar no cofre",
    "Copiar ficheiro",
    "Copiar caminho do ficheiro",
    "Copiar caminho da pasta",
    "Caminho copiado",
    "Falha ao copiar o caminho",
    "Ficheiro copiado",
    "Falha ao copiar o ficheiro",
    "Falha ao abrir o explorador",
    "O plugin «Ficheiros» está desactivado",
  ],
  "pt-br": [
    "Mostrar no explorador",
    "Mostrar no cofre",
    "Copiar arquivo",
    "Copiar caminho do arquivo",
    "Copiar caminho da pasta",
    "Caminho copiado",
    "Falha ao copiar o caminho",
    "Arquivo copiado",
    "Falha ao copiar o arquivo",
    "Falha ao abrir o explorador",
    "O plugin «Arquivos» está desativado",
  ],
  it: [
    "Mostra in Esplora file",
    "Mostra nel vault",
    "Copia file",
    "Copia percorso del file",
    "Copia percorso della cartella",
    "Percorso copiato",
    "Impossibile copiare il percorso",
    "File copiato",
    "Impossibile copiare il file",
    "Impossibile aprire Esplora file",
    "Il plugin «File» è disattivato",
  ],
  nl: [
    "Tonen in verkenner",
    "Tonen in kluis",
    "Bestand kopiëren",
    "Bestandspad kopiëren",
    "Mappad kopiëren",
    "Pad gekopieerd",
    "Pad kopiëren mislukt",
    "Bestand gekopieerd",
    "Bestand kopiëren mislukt",
    "Verkenner openen mislukt",
    "De plugin 'Bestanden' is uitgeschakeld",
  ],
  pl: [
    "Pokaż w eksploratorze",
    "Pokaż w skarbcu",
    "Kopiuj plik",
    "Kopiuj ścieżkę pliku",
    "Kopiuj ścieżkę folderu",
    "Skopiowano ścieżkę",
    "Nie udało się skopiować ścieżki",
    "Skopiowano plik",
    "Nie udało się skopiować pliku",
    "Nie udało się otworzyć eksploratora",
    "Wtyczka „Pliki” jest wyłączona",
  ],
  cs: [
    "Zobrazit v průzkumníku",
    "Zobrazit v trezoru",
    "Kopírovat soubor",
    "Kopírovat cestu k souboru",
    "Kopírovat cestu ke složce",
    "Cesta zkopírována",
    "Cestu se nepodařilo zkopírovat",
    "Soubor zkopírován",
    "Soubor se nepodařilo zkopírovat",
    "Průzkumník se nepodařilo otevřít",
    "Plugin „Soubory“ je vypnutý",
  ],
  tr: [
    "Gezginde göster",
    "Kasada göster",
    "Dosyayı kopyala",
    "Dosya yolunu kopyala",
    "Klasör yolunu kopyala",
    "Yol kopyalandı",
    "Yol kopyalanamadı",
    "Dosya kopyalandı",
    "Dosya kopyalanamadı",
    "Gezgin açılamadı",
    "\"Dosyalar\" eklentisi devre dışı",
  ],
  ja: [
    "エクスプローラーで表示",
    "Vault 内で表示",
    "ファイルをコピー",
    "ファイルパスをコピー",
    "フォルダーパスをコピー",
    "パスをコピーしました",
    "パスをコピーできませんでした",
    "ファイルをコピーしました",
    "ファイルをコピーできませんでした",
    "エクスプローラーを開けませんでした",
    "「ファイル」プラグインが無効です",
  ],
  ko: [
    "탐색기에서 보기",
    "보관함에서 보기",
    "파일 복사",
    "파일 경로 복사",
    "폴더 경로 복사",
    "경로를 복사했습니다",
    "경로를 복사하지 못했습니다",
    "파일을 복사했습니다",
    "파일을 복사하지 못했습니다",
    "탐색기를 열지 못했습니다",
    "'파일' 플러그인이 비활성화되어 있습니다",
  ],
  zh: [
    "在资源管理器中显示",
    "在库中显示",
    "复制文件",
    "复制文件路径",
    "复制文件夹路径",
    "路径已复制",
    "复制路径失败",
    "文件已复制",
    "复制文件失败",
    "无法打开资源管理器",
    "“文件”插件已禁用",
  ],
  "zh-tw": [
    "在檔案總管中顯示",
    "在檔案庫中顯示",
    "複製檔案",
    "複製檔案路徑",
    "複製資料夾路徑",
    "路徑已複製",
    "複製路徑失敗",
    "檔案已複製",
    "複製檔案失敗",
    "無法開啟檔案總管",
    "「檔案」外掛已停用",
  ],
  ar: [
    "عرض في المستكشف",
    "عرض في الخزنة",
    "نسخ الملف",
    "نسخ مسار الملف",
    "نسخ مسار المجلد",
    "تم نسخ المسار",
    "فشل نسخ المسار",
    "تم نسخ الملف",
    "فشل نسخ الملف",
    "تعذر فتح المستكشف",
    "إضافة «الملفات» معطلة",
  ],
  he: [
    "הצג בסייר הקבצים",
    "הצג בכספת",
    "העתק קובץ",
    "העתק נתיב קובץ",
    "העתק נתיב תיקייה",
    "הנתיב הועתק",
    "העתקת הנתיב נכשלה",
    "הקובץ הועתק",
    "העתקת הקובץ נכשלה",
    "פתיחת סייר הקבצים נכשלה",
    "התוסף \"קבצים\" מושבת",
  ],
  hi: [
    "एक्सप्लोरर में दिखाएँ",
    "वॉल्ट में दिखाएँ",
    "फ़ाइल कॉपी करें",
    "फ़ाइल पथ कॉपी करें",
    "फ़ोल्डर पथ कॉपी करें",
    "पथ कॉपी हो गया",
    "पथ कॉपी नहीं हो सका",
    "फ़ाइल कॉपी हो गई",
    "फ़ाइल कॉपी नहीं हो सकी",
    "एक्सप्लोरर नहीं खुल सका",
    "\"फ़ाइलें\" प्लगइन अक्षम है",
  ],
  id: [
    "Tampilkan di penjelajah",
    "Tampilkan di vault",
    "Salin berkas",
    "Salin jalur berkas",
    "Salin jalur folder",
    "Jalur disalin",
    "Gagal menyalin jalur",
    "Berkas disalin",
    "Gagal menyalin berkas",
    "Gagal membuka penjelajah",
    "Plugin \"Berkas\" dinonaktifkan",
  ],
  vi: [
    "Hiển thị trong trình quản lý tệp",
    "Hiển thị trong kho",
    "Sao chép tệp",
    "Sao chép đường dẫn tệp",
    "Sao chép đường dẫn thư mục",
    "Đã sao chép đường dẫn",
    "Không thể sao chép đường dẫn",
    "Đã sao chép tệp",
    "Không thể sao chép tệp",
    "Không thể mở trình quản lý tệp",
    "Plugin \"Tệp\" đã bị tắt",
  ],
  th: [
    "แสดงในตัวสำรวจไฟล์",
    "แสดงในคลัง",
    "คัดลอกไฟล์",
    "คัดลอกพาธไฟล์",
    "คัดลอกพาธโฟลเดอร์",
    "คัดลอกพาธแล้ว",
    "คัดลอกพาธไม่สำเร็จ",
    "คัดลอกไฟล์แล้ว",
    "คัดลอกไฟล์ไม่สำเร็จ",
    "เปิดตัวสำรวจไฟล์ไม่สำเร็จ",
    "ปลั๊กอิน \"ไฟล์\" ถูกปิดใช้งาน",
  ],
  sv: [
    "Visa i utforskaren",
    "Visa i valvet",
    "Kopiera fil",
    "Kopiera filsökväg",
    "Kopiera mappsökväg",
    "Sökvägen kopierades",
    "Det gick inte att kopiera sökvägen",
    "Filen kopierades",
    "Det gick inte att kopiera filen",
    "Det gick inte att öppna utforskaren",
    "Insticksmodulen \"Filer\" är inaktiverad",
  ],
  da: [
    "Vis i stifinder",
    "Vis i boksen",
    "Kopiér fil",
    "Kopiér filsti",
    "Kopiér mappesti",
    "Sti kopieret",
    "Kunne ikke kopiere stien",
    "Fil kopieret",
    "Kunne ikke kopiere filen",
    "Kunne ikke åbne stifinder",
    "Pluginnet \"Filer\" er deaktiveret",
  ],
  no: [
    "Vis i utforsker",
    "Vis i hvelvet",
    "Kopier fil",
    "Kopier filbane",
    "Kopier mappebane",
    "Banen er kopiert",
    "Kunne ikke kopiere banen",
    "Filen er kopiert",
    "Kunne ikke kopiere filen",
    "Kunne ikke åpne utforsker",
    "Programtillegget «Filer» er deaktivert",
  ],
  fi: [
    "Näytä resurssienhallinnassa",
    "Näytä holvissa",
    "Kopioi tiedosto",
    "Kopioi tiedostopolku",
    "Kopioi kansiopolku",
    "Polku kopioitu",
    "Polun kopiointi epäonnistui",
    "Tiedosto kopioitu",
    "Tiedoston kopiointi epäonnistui",
    "Resurssienhallinnan avaaminen epäonnistui",
    "\"Tiedostot\"-liitännäinen on poissa käytöstä",
  ],
  ro: [
    "Afișează în explorator",
    "Afișează în seif",
    "Copiază fișierul",
    "Copiază calea fișierului",
    "Copiază calea folderului",
    "Cale copiată",
    "Nu s-a putut copia calea",
    "Fișier copiat",
    "Nu s-a putut copia fișierul",
    "Nu s-a putut deschide exploratorul",
    "Pluginul „Fișiere” este dezactivat",
  ],
  hu: [
    "Megjelenítés a fájlkezelőben",
    "Megjelenítés a tárolóban",
    "Fájl másolása",
    "Fájl elérési útjának másolása",
    "Mappa elérési útjának másolása",
    "Elérési út másolva",
    "Az elérési út másolása sikertelen",
    "Fájl másolva",
    "A fájl másolása sikertelen",
    "A fájlkezelő megnyitása sikertelen",
    "A „Fájlok” bővítmény ki van kapcsolva",
  ],
  el: [
    "Εμφάνιση στην εξερεύνηση",
    "Εμφάνιση στο vault",
    "Αντιγραφή αρχείου",
    "Αντιγραφή διαδρομής αρχείου",
    "Αντιγραφή διαδρομής φακέλου",
    "Η διαδρομή αντιγράφηκε",
    "Αποτυχία αντιγραφής διαδρομής",
    "Το αρχείο αντιγράφηκε",
    "Αποτυχία αντιγραφής αρχείου",
    "Αποτυχία ανοίγματος εξερεύνησης",
    "Το πρόσθετο «Αρχεία» είναι απενεργοποιημένο",
  ],
  bg: [
    "Показване в Explorer",
    "Показване в хранилището",
    "Копиране на файла",
    "Копиране на пътя до файла",
    "Копиране на пътя до папката",
    "Пътят е копиран",
    "Неуспешно копиране на пътя",
    "Файлът е копиран",
    "Неуспешно копиране на файла",
    "Неуспешно отваряне на Explorer",
    "Добавката „Файлове“ е изключена",
  ],
  ca: [
    "Mostra a l'explorador",
    "Mostra a la caixa forta",
    "Copia el fitxer",
    "Copia la ruta del fitxer",
    "Copia la ruta de la carpeta",
    "Ruta copiada",
    "No s'ha pogut copiar la ruta",
    "Fitxer copiat",
    "No s'ha pogut copiar el fitxer",
    "No s'ha pogut obrir l'explorador",
    "El connector «Fitxers» està desactivat",
  ],
};

const ALIASES = { nb: "no", nn: "no" };

function toDict(values) {
  const dict = {};
  KEYS.forEach((key, i) => {
    dict[key] = values[i];
  });
  return dict;
}

function detectLanguage() {
  let raw = "";
  try {
    if (typeof obsidian.getLanguage === "function") {
      raw = obsidian.getLanguage();
    }
  } catch (e) {
    raw = "";
  }
  if (!raw) {
    try {
      raw = window.localStorage.getItem("language") || "";
    } catch (e) {
      raw = "";
    }
  }
  if (!raw && window.moment && typeof window.moment.locale === "function") {
    raw = window.moment.locale();
  }
  return String(raw || "en").toLowerCase().replace(/_/g, "-");
}

function resolveStrings() {
  const lang = detectLanguage();
  const base = lang.split("-")[0];
  const candidates = [lang, ALIASES[lang], base, ALIASES[base]];
  const found = candidates.find((code) => code && LOCALES[code]);
  const english = toDict(LOCALES.en);
  return found ? Object.assign({}, english, toDict(LOCALES[found])) : english;
}

module.exports = class EmbedFileMenu extends Plugin {
  onload() {
    this.registerDomEvent(
      document,
      "contextmenu",
      (evt) => this.onContextMenu(evt),
      true
    );
  }

  onContextMenu(evt) {
    const target = evt.target;
    const embed = target && target.closest ? target.closest(".internal-embed[src]") : null;
    if (!embed) return;

    const src = embed.getAttribute("src");
    if (!src) return;

    const linkpath = src.split("#")[0].split("|")[0];
    const active = this.app.workspace.getActiveFile();
    const sourcePath = active ? active.path : "";
    const file = this.app.metadataCache.getFirstLinkpathDest(linkpath, sourcePath);
    if (!(file instanceof TFile)) return;

    evt.preventDefault();
    evt.stopPropagation();

    const t = resolveStrings();
    const menu = new Menu();

    if (Platform.isDesktopApp) {
      menu.addItem((item) =>
        item
          .setTitle(t.showInExplorer)
          .setIcon("folder-open")
          .onClick(() => this.showInSystem(file))
      );
    }

    menu.addItem((item) =>
      item
        .setTitle(t.revealInVault)
        .setIcon("folder-search")
        .onClick(() => this.revealInVault(file))
    );

    menu.addSeparator();

    if (Platform.isDesktopApp) {
      menu.addItem((item) =>
        item
          .setTitle(t.copyFile)
          .setIcon("files")
          .onClick(() => this.copyFile(file))
      );
    }

    menu.addItem((item) =>
      item
        .setTitle(t.copyFilePath)
        .setIcon("copy")
        .onClick(() => this.copyPath(file, false))
    );

    menu.addItem((item) =>
      item
        .setTitle(t.copyFolderPath)
        .setIcon("folder")
        .onClick(() => this.copyPath(file, true))
    );

    menu.showAtMouseEvent(evt);
  }

  getFullPath(file) {
    let p = this.app.vault.adapter.getFullPath(file.path);
    if (Platform.isWin) p = p.replace(/\//g, "\\");
    return p;
  }

  async copyPath(file, folderOnly) {
    const t = resolveStrings();
    try {
      let p = this.getFullPath(file);
      if (folderOnly) {
        const sep = p.includes("\\") ? "\\" : "/";
        p = p.slice(0, p.lastIndexOf(sep) + 1);
      }
      if (WRAP_IN_QUOTES) p = `"${p}"`;
      await navigator.clipboard.writeText(p);
      new Notice(t.pathCopied);
    } catch (e) {
      new Notice(t.pathCopyFailed);
      console.error(e);
    }
  }

  copyFile(file) {
    const t = resolveStrings();
    const { execFile, spawn } = require("child_process");

    const p = this.getFullPath(file);
    const done = (err) => {
      if (err) {
        new Notice(t.fileCopyFailed);
        console.error(err);
      } else {
        new Notice(t.fileCopied);
      }
    };

    try {
      if (Platform.isWin) {
        execFile(
          "powershell.exe",
          [
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            "Set-Clipboard -LiteralPath $env:EFM_PATH",
          ],
          { env: Object.assign({}, process.env, { EFM_PATH: p }), windowsHide: true },
          done
        );
      } else if (Platform.isMacOS) {
        execFile(
          "osascript",
          [
            "-e", "on run argv",
            "-e", "set the clipboard to (POSIX file (item 1 of argv))",
            "-e", "end run",
            p,
          ],
          done
        );
      } else {
        const uri = "file://" + encodeURI(p) + "\n";
        const isWayland = !!process.env.WAYLAND_DISPLAY;
        const cmd = isWayland ? "wl-copy" : "xclip";
        const args = isWayland
          ? ["--type", "text/uri-list"]
          : ["-selection", "clipboard", "-t", "text/uri-list"];
        const proc = spawn(cmd, args, { stdio: ["pipe", "ignore", "ignore"] });
        proc.on("error", done);
        proc.on("close", (code) =>
          done(code ? new Error(`${cmd} exited with code ${code}`) : null)
        );
        proc.stdin.end(uri);
      }
    } catch (e) {
      done(e);
    }
  }

  showInSystem(file) {
    try {
      require("electron").shell.showItemInFolder(this.getFullPath(file));
    } catch (e) {
      new Notice(resolveStrings().explorerFailed);
      console.error(e);
    }
  }

  async revealInVault(file) {
    const t = resolveStrings();
    const explorer = this.app.internalPlugins?.getEnabledPluginById?.("file-explorer");
    if (!explorer) {
      new Notice(t.filesDisabled);
      return;
    }
    if (!this.app.workspace.getLeavesOfType("file-explorer").length) {
      await this.app.commands.executeCommandById("file-explorer:open");
    }
    explorer.revealInFolder(file);
  }
};