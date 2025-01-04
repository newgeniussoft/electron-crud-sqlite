import React from 'react';
import './ItemList.css';

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="items-container">
      <h2>Items</h2>
      {items.map(item => (
        <div key={item.id} className="item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="item-actions">
            <button
              onClick={() => onEdit(item)}
              className="btn-edit"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="btn-delete"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
