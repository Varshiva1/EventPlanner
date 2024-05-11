const Event = require('../models/event_model');

exports.create = async (req, res) => {
  const {
    name,
    description,
    date,
    time,
    duration,
    location,
    guests,
    notifications,
    files,
  } = req.body;

  try {
    // Create event
    const event = await Event.create({
      name,
      description,
      date,
      time,
      duration,
      location,
      guests,
      notifications,
      files,
    });
    res.status(201).send(event);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.findAll = async (req, res) => {
  try {
    // Find all events
    const events = await Event.findAll();
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    // Find event by ID
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    // Update event description
    event.description = description;
    await event.save();
    
    res.send({ message: 'Event description updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
