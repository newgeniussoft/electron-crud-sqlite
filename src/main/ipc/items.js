const { ipcMain } = require('electron');
const db = require('../database/database');

const registerItemHandlers = () => {
  ipcMain.handle('get-items', async () => {
    return await db.all('SELECT * FROM items ORDER BY created_at DESC');
  });

  ipcMain.handle('create-item', async (event, item) => {
    const { title, description } = item;
    const result = await db.run(
      'INSERT INTO items (title, description) VALUES (?, ?)',
      [title, description]
    );
    return { id: result.lastID, title, description };
  });

  ipcMain.handle('update-item', async (event, item) => {
    const { id, title, description } = item;
    await db.run(
      'UPDATE items SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );
    return { id, title, description };
  });

  ipcMain.handle('delete-item', async (event, id) => {
    await db.run('DELETE FROM items WHERE id = ?', [id]);
    return id;
  });
};

module.exports = registerItemHandlers;
