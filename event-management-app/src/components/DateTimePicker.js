import React, { useState } from 'react';

const DateTimePicker = ({ date, setDate, time, setTime, duration, setDuration, errors }) => {
  const [isManualDuration, setIsManualDuration] = useState(false);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleDurationUp = () => {
    setDuration((prevDuration) => {
      const newDuration = prevDuration + 30;
      return newDuration;
    });
  };

  const handleDurationDown = () => {
    setDuration((prevDuration) => {
      const newDuration = prevDuration - 30;
      return newDuration < 30 ? 30 : newDuration;
    });
  };

  const handleManualDuration = (e) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    setDuration(totalMinutes);
    setIsManualDuration(true);
  };

  return (
    <div className="date-time-picker">
      <h3 className="text-lg font-bold mb-2">Date, Time, and Duration</h3>
      <div className="date-time-inputs">
        <div className="input-group">
          <label htmlFor="date" className="block font-bold">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="time" className="block font-bold">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>
        <div className="input-group duration-group">
          <label htmlFor="duration" className="block font-bold">
            Duration
          </label>
          <div className="relative">
            {isManualDuration ? (
              <input
                type="text"
                id="duration"
                name="duration"
                value={formatDuration(duration)}
                onChange={handleManualDuration}
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 w-full"
              />
            ) : (
              <input
                type="text"
                id="duration"
                name="duration"
                value={formatDuration(duration)}
                readOnly
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 w-full"
              />
            )}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="button"
                className="bg-gray-200 rounded-md p-1 hover:bg-gray-300 mr-1"
                onClick={handleDurationUp}
                disabled={isManualDuration}
              >
                <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="bg-gray-200 rounded-md p-1 hover:bg-gray-300"
                onClick={handleDurationDown}
                disabled={isManualDuration}
              >
                <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
        </div>
      </div>
      <p className="mt-2">
        This event will take place on the {new Date(date).toLocaleDateString()} from {time} until{' '}
        {new Date(new Date(date).getTime() + duration * 60000).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>

      <style jsx>{`
        .date-time-picker {
          max-width: 600px;
          margin: 0 auto;
        }

        .date-time-inputs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
          margin-bottom: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .duration-group {
          position: relative;
        }

        @media (max-width: 768px) {
          .date-time-inputs {
            grid-template-columns: repeat(2, 1fr);
          }

          .duration-group {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .date-time-inputs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DateTimePicker;