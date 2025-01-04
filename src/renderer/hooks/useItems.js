import { useState, useEffect } from 'react';

const useItems = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ title: '', description: '' });

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

  const handleSubmit = async (item) => {
    try {
      if (item.id) {
        await window.electron.updateItem(item);
      } else {
        await window.electron.createItem(item);
      }
      setCurrentItem({ title: '', description: '' });
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
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

  return {
    items,
    currentItem,
    setCurrentItem,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
};

export default useItems;
