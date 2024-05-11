const Event = require('../models/event_model');

exports.create = (req, res) => {
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

  Event.create({
    name,
    description,
    date,
    time,
    duration,
    location,
    guests,
    notifications,
    files,
  })
    .then((event) => res.status(201).send(event))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Event.findAll()
    .then((events) => res.send(events))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  Event.findByPk(id)
    .then((event) => {
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }

      event.description = description;
      event
        .save()
        .then(() => res.send({ message: 'Event description updated' }))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};