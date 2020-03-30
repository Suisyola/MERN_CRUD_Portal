const router = require('express').Router();
let Stream = require('../models/stream');

// Get all streams
router.route('/').get((req, res) => {
	Stream.find()
		.then((streams) => res.json(streams))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Get one stream
router.route('/:id').get((req, res) => {
	Stream.findById(req.params.id)
		.then((stream) => res.json(stream))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Create a stream
router.route('/').post((req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const createdBy = req.body.createdBy;

	const newStream = new Stream({
		title,
		description,
		createdBy
	});

	newStream
		.save()
		.then((stream) => res.json(stream))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete a stream
router.route('/:id').delete((req, res) => {
	Stream.findByIdAndDelete(req.params.id)
		.then(() => res.json('Stream deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Update a stream
router.route('/:id').patch((req, res) => {
	Stream.findById(req.params.id)
		.then((stream) => {
			stream.title = req.body.title;
			stream.description = req.body.description;

			stream
				.save()
				.then((stream) => res.json(stream))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
