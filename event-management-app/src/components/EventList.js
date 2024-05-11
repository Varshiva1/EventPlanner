import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/events');
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleShowDescriptionModal = (eventId) => {
    setSelectedEventId(eventId);
    setShowDescriptionModal(true);
    setDescription('');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = async () => {
    try {
        await axios.put(`http://localhost:4000/api/events/${selectedEventId}`, {
            description,
          });
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId ? { ...event, description } : event
      );
      setEvents(updatedEvents);
      setShowDescriptionModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 rounded-md p-4">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Duration: {event.duration}</p>
            <p>Location: {event.location}</p>
            <p>Guests: {event.guests.map((guest) => guest).join(', ')}</p>
            <p>Description: {event.description || 'No description'}</p>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
              onClick={() => handleShowDescriptionModal(event.id)}
            >
              {event.description ? 'Edit Description' : 'Add Description'}
            </button>
          </div>
        ))}
      </div>

      {showDescriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Add/Edit Description</h3>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              rows={4}
              placeholder="Enter description"
            />
            <div className="flex justify-end mt-4">
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
                onClick={() => setShowDescriptionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;