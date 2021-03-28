"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = exports.commons = exports.mainWindow = void 0;
var electron_1 = require("electron");
var path = __importStar(require("path"));
var electron_updater_1 = require("electron-updater");
var presence_1 = require("./presence");
var tray_1 = require("./tray");
var tray;
var instanceLock = electron_1.app.requestSingleInstanceLock();
exports.commons = {
    shouldDock: true,
};
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var handleLinks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.mainWindow = new electron_1.BrowserWindow({
                        height: 825,
                        width: 600,
                        autoHideMenuBar: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false
                        },
                    });
                    return [4 /*yield*/, exports.mainWindow.loadFile(path.join(__dirname, "../public/home.html"))];
                case 1:
                    _a.sent();
                    handleLinks = function (event, url) {
                        event.preventDefault();
                        electron_1.shell.openExternal(url);
                    };
                    exports.mainWindow.webContents.on("new-window", handleLinks);
                    exports.mainWindow.webContents.on("will-navigate", handleLinks);
                    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createWindow = createWindow;
electron_1.app.on("ready", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createWindow()];
            case 1:
                _a.sent();
                electron_1.app.on("activate", function () {
                    if (electron_1.BrowserWindow.getAllWindows().length === 0)
                        createWindow();
                });
                return [4 /*yield*/, presence_1.startHandler()];
            case 2:
                _a.sent();
                tray = new electron_1.Tray(path.join(__dirname, "../icons/tray.png"));
                return [4 /*yield*/, tray_1.HandleTray(tray)];
            case 3:
                _a.sent();
                exports.mainWindow.webContents.send("@app/shouldDock", "");
                electron_1.ipcMain.on("@app/shouldDock", function (event, shouldDock) {
                    exports.commons.shouldDock = shouldDock;
                });
                electron_1.ipcMain.on("@app/quit", function (event, args) {
                    electron_1.app.quit();
                });
                return [2 /*return*/];
        }
    });
}); });
if (!instanceLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", function (event, argv, workingDirectory) {
        if (exports.mainWindow) {
            if (exports.mainWindow.isMinimized()) {
                exports.mainWindow.restore();
            }
            else if (exports.mainWindow.isDestroyed()) {
                createWindow();
            }
            exports.mainWindow.focus();
        }
        else {
            createWindow();
        }
    });
}
electron_1.app.on("window-all-closed", function () {
    if (presence_1.RPC_STARTED && exports.commons.shouldDock) {
        return;
    }
    else {
        electron_1.app.quit();
    }
});
