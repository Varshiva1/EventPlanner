import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    console.log('Saved description:', description);
    setShowDescription(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 rounded-md p-4">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Duration: {event.duration}</p>
            <p>Guests: {event.guests}</p>
            <p>Agenda: {event.agenda}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleShowDescription}
        >
          Add description
        </button>
        {showDescription && (
          <div className="mt-4">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              rows={4}
              placeholder="Enter description"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                onClick={handleSaveDescription}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => setShowDescription(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;