import React, { useState } from 'react';

const GuestList = ({ guests, setGuests }) => {
  const [newGuest, setNewGuest] = useState('');

  const handleGuestChange = (e) => {
    setNewGuest(e.target.value);
  };

  const handleAddGuest = () => {
    if (newGuest.trim()) {
      setGuests([...guests, newGuest.trim()]);
      setNewGuest('');
    }
  };

  const handleRemoveGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Add guests</h3>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newGuest}
          onChange={handleGuestChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          placeholder="Enter email address"
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddGuest}
        >
          Add
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        {guests.map((guest, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold">
              {guest[0]}
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-600"
              onClick={() => handleRemoveGuest(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
