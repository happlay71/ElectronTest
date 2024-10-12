// console.log("preload", process.version);
const {contextBridge, ipcRenderer} =  require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    version: process.version,
    // 渲染进程向主进程通信
    saveFile: (data) => {
        // send(信道，数据)
        ipcRenderer.send('file-save', data)
    },
    readFile: () => {
        return ipcRenderer.invoke('file-read')
    }
})

