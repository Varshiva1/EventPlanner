import React, { useState } from 'react';
import axios from 'axios';
import DateTimePicker from './DateTimePicker';
import LocationPicker from './LocationPicker';
import GuestList from './GuestList';
import NotificationSettings from './NotificationSettings';
import FileUpload from './FileUpload';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    guests: [],
    notifications: {},
    files: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name) errors.name = 'Event name is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.location) errors.location = 'Location is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/events', formData);
      alert('Event created successfully');
      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        guests: [],
        notifications: {},
        files: [],
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert('Error creating event');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label htmlFor="name" className="block font-bold">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block font-bold">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        <DateTimePicker
          date={formData.date}
          setDate={(date) => handleChange({ target: { name: 'date', value: date } })}
          time={formData.time}
          setTime={(time) => handleChange({ target: { name: 'time', value: time } })}
          duration={formData.duration}
          setDuration={(duration) =>
            handleChange({ target: { name: 'duration', value: duration } })
          }
          errors={errors}
        />

        <LocationPicker
          location={formData.location}
          setLocation={(location) =>
            handleChange({ target: { name: 'location', value: location } })
          }
          error={errors.location}
        />

        <GuestList
          guests={formData.guests}
          setGuests={(guests) =>
            handleChange({ target: { name: 'guests', value: guests } })
          }
        />

        <NotificationSettings
          notifications={formData.notifications}
          setNotifications={(notifications) =>
            handleChange({ target: { name: 'notifications', value: notifications } })
          }
        />

        <FileUpload
          files={formData.files}
          setFiles={(files) =>
            handleChange({ target: { name: 'files', value: files } })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;