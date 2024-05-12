const NotificationSettings = ({ notifications, setNotifications }) => {
  const handleNotificationChange = (service) => {
    setNotifications({
      ...notifications,
      email: service === 'email' ? true : false,
      slack: service === 'slack' ? true : false,
    });
  };

  const handleReminderChange = (e) => {
    setNotifications({ ...notifications, reminder: e.target.value });
  };

  const reminderOptions = [
    { value: '0', label: 'No reminder' },
    { value: '3600', label: '1 hour before event' },
    { value: '86400', label: '1 day before event' },
  ];

  const handleEmailClick = () => {
    handleNotificationChange('email');
  };

  const handleSlackClick = () => {
    handleNotificationChange('slack');
  };

  return (
    <div className="flex items-center">
      <div className="mr-10">
        <h3 className="font-bold mb-2">Notification</h3>
        <div className="flex items-center space-x-4">
          <div>
            <button
              type="button"
              className={`py-2 px-4 rounded-md ${
                notifications.email ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={handleEmailClick}
            >
              Email
            </button>
          </div>
          <div>
            <button
              type="button"
              className={`py-2 px-4 rounded-md ${
                notifications.slack ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={handleSlackClick}
            >
              Slack
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Set reminder</h3>
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center">
            <select
              id="reminder"
              name="reminder"
              value={notifications.reminder || '0'}
              onChange={handleReminderChange}
              className="border border-gray-300 rounded-md py-2 px-3"
            >
              {reminderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
