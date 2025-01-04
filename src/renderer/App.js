import React from 'react';
import TitleBar from './components/TitleBar/TitleBar';
import ItemForm from './components/ItemForm/ItemForm';
import ItemList from './components/ItemList/ItemList';
import useItems from './hooks/useItems';
import './styles/App.css';

function App() {
  const {
    items,
    currentItem,
    setCurrentItem,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useItems();

  return (
    <div className="app">
      <TitleBar />
      <div className="content">
        <div className="container">
          <h1>Item Management</h1>
          <ItemForm
            item={currentItem}
            onChange={setCurrentItem}
            onSubmit={handleSubmit}
          />
          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
