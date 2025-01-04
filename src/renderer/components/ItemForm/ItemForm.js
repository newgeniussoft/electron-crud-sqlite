import React from 'react';
import './ItemForm.css';

const ItemForm = ({ item, onChange, onSubmit }) => {
  const { title, description, id } = item;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item);
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onChange({ ...item, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
      </div>
      <button type="submit">
        {id ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
