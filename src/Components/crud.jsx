import React, { useState, useEffect } from 'react';

// Mock API functions
const mockApi = {
  create: (item) => new Promise((resolve) => setTimeout(() => resolve(item), 500)),
  read: () => new Promise((resolve) => setTimeout(() => resolve([{ id: 1, name: 'John Doe' }]), 500)),
  update: (id, updatedItem) => new Promise((resolve) => setTimeout(() => resolve(updatedItem), 500)),
  delete: (id) => new Promise((resolve) => setTimeout(() => resolve(id), 500)),
};

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Fetch initial data
    mockApi.read().then(setItems);
  }, []);

  const handleCreate = () => {
    const item = { id: Date.now(), name: newItem };
    mockApi.create(item).then((createdItem) => {
      setItems([...items, createdItem]);
      setNewItem('');
    });
  };

  const handleUpdate = (id) => {
    const updatedItem = { ...editingItem, name: newItem };
    mockApi.update(id, updatedItem).then((updated) => {
      setItems(items.map((item) => (item.id === id ? updated : item)));
      setEditingItem(null);
      setNewItem('');
    });
  };

  const handleDelete = (id) => {
    mockApi.delete(id).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">CRUD App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        {editingItem ? (
          <button
            onClick={() => handleUpdate(editingItem.id)}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Update Item
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Add Item
          </button>
        )}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditingItem(item);
                  setNewItem(item.name);
                }}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;
