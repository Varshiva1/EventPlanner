import React, { useState } from 'react';

const LocationPicker = ({ location, setLocation, error }) => {
  const [showMeetingRoom, setShowMeetingRoom] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const toggleMeetingRoom = () => {
    setShowMeetingRoom(!showMeetingRoom);
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Location</h3>
      <div className="relative">
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
          required
          className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center justify-center bg-gray-200 rounded-md p-2 hover:bg-gray-300"
          onClick={toggleMeetingRoom}
        >
          <svg
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showMeetingRoom ? 'M19 9l-7 7-7-7' : 'M19 15l-7-7-7 7'}
            />
          </svg>
          <span className="ml-2">Set meeting room</span>
        </button>
      </div>
      {showMeetingRoom && (
        <div className="mt-4">
          <p>Meeting room options will go here.</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
