import React, { useState } from 'react';

const DateTimePicker = ({ date, setDate, time, setTime, duration, setDuration, errors }) => {
  const [isManualDuration, setIsManualDuration] = useState(false);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleDurationUp = () => {
let newDuration;
if (duration!==""){
  newDuration = parseInt(duration)+30;
}else{
newDuration =30;
}
setDuration(newDuration);
  
  };

  const handleDurationDown = () => {
    if (duration > 30) {
      setDuration(duration - 30);
    }
  };

  const handleManualDuration = (e) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    setDuration(hours * 60 + minutes);
    setIsManualDuration(true);
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Date, Time, and Duration</h3>
      <div className="flex items-center space-x-4 flex-wrap">
        <div>
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
            className="border border-gray-300 rounded-md py-2 px-3"
            min ={today}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>
        <div>
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
            className="border border-gray-300 rounded-md py-2 px-3"
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>
        <div>
          <div>
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
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8"
                />
              ) : (
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formatDuration(duration)}
                  readOnly
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8"
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
      </div>
     {/* {date!==''? <p className="mt-2">
        This event will take place on the {new Date(date).toLocaleDateString()} from {time} until{' '}
        {new Date(new Date(date).getTime() + duration * 60000).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>:''} */}
    </div>
  );
};

export default DateTimePicker;