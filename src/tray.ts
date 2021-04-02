import { app, BrowserWindow, Menu, Tray } from "electron";
import { autoUpdater } from "electron-updater";
import { createWindow, mainWindow } from "./index";

export async function HandleTray(tray: Tray) {
    let TRAY_MENU: any = [
        {
            label: "Open Easy RPC",
            click: () => {
                if (mainWindow.isDestroyed()) {
                    createWindow();
                } else {
                    mainWindow.focus();
                }
            },
        },
        {
            label: "Check For Updates",
            click: () => {
                autoUpdater.checkForUpdatesAndNotify();
            },
        },
        { type: 'separator' },
        {
            label: "Quit Easy RPC",
            click: () => {
                if (!mainWindow.isDestroyed()) {
                    mainWindow.close();
                }
                app.quit();
            },
        },
    ];


    // create system tray
    tray.setToolTip("Amitoj's Easy RPC");
    tray.on("click", () => {
        if (mainWindow.isDestroyed()) {
            createWindow();
        } else {
            mainWindow.focus();
        }
    });

    let contextMenu = Menu.buildFromTemplate(TRAY_MENU);
    tray.setContextMenu(contextMenu);
}