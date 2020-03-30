const router = require('express').Router();
let User = require('../models/user');

// Get one user
router.route('/').post((req, res) => {
	User.findOne({
		email: req.body.email,
		password: req.body.password
	})
		.then(
			(user) => {
				if (!user) {
					// return to prevent below code from executing
					return res.status(404).send();
				}

				res.status(200).send({
					user: { _id: user._id, email: user.email }
				});
			},
			(e) => {
				res.status(400).send({});
			}
		)
		.catch((e) => {
			res.status(400).send();
		});
});

module.exports = router;
