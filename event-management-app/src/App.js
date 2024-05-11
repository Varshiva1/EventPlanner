import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(true);

  const toggleView = (view) => {
    setShowCreateEvent(view === 'create');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Event Manager</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => toggleView('create')}
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                  showCreateEvent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Create Event
              </button>
              <button
                onClick={() => toggleView('list')}
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                  !showCreateEvent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                My Events
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        {showCreateEvent ? <EventForm /> : <EventList />}
      </div>
    </div>
  );
};

export default App;