import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const items = await window.electron.getItems();
      setItems(items);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    try {
      if (editingId) {
        await window.electron.updateItem({
          id: editingId,
          title,
          description
        });
      } else {
        await window.electron.createItem({
          title,
          description
        });
      }

      setTitle('');
      setDescription('');
      setEditingId(null);
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await window.electron.deleteItem(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className="content">
      <div className="container">
        <h1>Item Management</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
        </form>

        <div className="items-container">
          <h2>Items</h2>
          {items.map(item => (
            <div key={item.id} className="item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
