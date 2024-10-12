const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

function readFile() {
    const res = fs.readFileSync(path.resolve(__dirname, './hello.txt'))
    return res.toString()
}

function writeFile(_, data) {
    fs.writeFileSync(path.resolve(__dirname, './hello.txt'), data)
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js')
        }
    })
    // win.loadURL('http://happlay.online')

    ipcMain.on('file-save', writeFile)
    ipcMain.handle('file-read', readFile)
    win.loadFile("./src/index.html")
}

app.on('ready', () => {
    createWindow()
    // 应用被激活且窗口为0时--为mac准备
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    // 非mac系统
    if (process.platform !== 'darwin') app.quit()
})
 
