module.exports = {
	setUser: (req, res, next) => {
		res.status(500).send('ERROR')
		next();
	}
}