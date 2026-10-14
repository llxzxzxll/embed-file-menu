<div align="center">

# Embed File Menu

**Native right-click file operations for embedded attachments in Obsidian.**

[![GitHub release](https://img.shields.io/github/v/release/llxzxzxll/embed-file-menu?style=flat-square&color=7c3aed)](https://github.com/llxzxzxll/embed-file-menu/releases)
[![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=7c3aed&label=downloads&query=%24%5B%22embed-file-menu%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json&style=flat-square)](https://obsidian.md/plugins?id=embed-file-menu)
[![Min Obsidian Version](https://img.shields.io/badge/Obsidian-1.4.0%2B-483699?style=flat-square&logo=obsidian)](https://obsidian.md)
[![Languages](https://img.shields.io/badge/i18n-33_languages-2ea44f?style=flat-square)](#localization)
[![License](https://img.shields.io/github/license/llxzxzxll/embed-file-menu?style=flat-square)](LICENSE)

<br>

<img width="535" height="217" alt="embed-file-menu" src="https://github.com/user-attachments/assets/f86c703e-2766-4589-91e7-dec1c13a7519" />

</div>

---

## Why Embed File Menu?

When you embed attachments (`![[archive.zip]]`, `![[installer.exe]]`, `![[report.pdf]]`, images, or audio) inside your notes or callouts, interacting with the underlying file on your disk usually requires hunting it down in the sidebar first.

**Embed File Menu** adds a lightweight, zero-config context menu directly to any embedded file—letting you reveal, locate, or copy the actual file to your system clipboard in a single click.

## Features

| Action | Description | Platform |
| :--- | :--- | :---: |
| **Show in system explorer** | Highlights the file directly in Windows Explorer, macOS Finder, or Linux File Manager. | Desktop |
| **Reveal in vault** | Opens and highlights the file inside Obsidian's built-in File Explorer sidebar. | Desktop & Mobile |
| **Copy file** | Copies the **actual file object** to your OS clipboard—paste it (`Ctrl+V` / `Cmd+V`) directly into Telegram, Discord, email, or any folder. | Desktop |
| **Copy file path** | Copies the absolute system path of the file to the clipboard. | Desktop & Mobile |
| **Copy folder path** | Copies the absolute system path of the parent directory. | Desktop & Mobile |

> [!NOTE]
> **Linux Clipboard Support:** To copy binary file objects on Linux, the plugin automatically detects your session type and uses `wl-copy` (Wayland) or `xclip` (X11).

## Localization

Automatically adapts to your Obsidian interface language out of the box with **33 built-in locales**:

<details>
<summary><b>View all 33 supported languages</b></summary>
<br>

English (`en`), Russian (`ru`), Ukrainian (`uk`), Belarusian (`be`), German (`de`), French (`fr`), Spanish (`es`), Portuguese (`pt`, `pt-br`), Italian (`it`), Dutch (`nl`), Polish (`pl`), Czech (`cs`), Turkish (`tr`), Japanese (`ja`), Korean (`ko`), Simplified & Traditional Chinese (`zh`, `zh-tw`), Arabic (`ar`), Hebrew (`he`), Hindi (`hi`), Indonesian (`id`), Vietnamese (`vi`), Thai (`th`), Swedish (`sv`), Danish (`da`), Norwegian (`no`, `nb`, `nn`), Finnish (`fi`), Romanian (`ro`), Hungarian (`hu`), Greek (`el`), Bulgarian (`bg`), Catalan (`ca`).

</details>

## Installation

### From Obsidian Community Plugins
1. Open **Settings → Community plugins** in Obsidian.
2. Click **Browse** and search for **Embed File Menu**.
3. Click **Install**, then **Enable**.

### Manual Installation
1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/llxzxzxll/embed-file-menu/releases/latest).
2. Copy them into your vault's `.obsidian/plugins/embed-file-menu/` folder.
3. Reload Obsidian and enable the plugin in **Settings → Community plugins**.

#### Support

Embed File Menu is free and open source. If it's useful to you, you can support its development with TON or USDT on the TON network: <kbd>tonproxywallet.ton</kbd> | <kbd>UQALKfbKI2Czizms4SisKXHnejG2iEoH26O-fy3_rJ5FbJDu</kbd>

**Thank you!**

---

License

[MIT License](LICENSE) © [LXXVII](https://github.com/llxzxzxll).
