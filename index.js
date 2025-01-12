// const { app, BrowserWindow } = require('electron/main')

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 800
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

//Import dependencies
const { app, BrowserWindow } = require('electron');
const ejse = require('ejs-electron');
const getStock = require('./dataController/showStock');

let mainWindow;

app.on('ready', async () => {
  try {
    const products = await getStock();
    const data = { items: products };

    ejse.data(data);

    mainWindow = new BrowserWindow();

    mainWindow.loadURL('file://' + __dirname + '/views/index.ejs');
  } catch (err) {
    console.error(err);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    app.emit('ready');
  }
});