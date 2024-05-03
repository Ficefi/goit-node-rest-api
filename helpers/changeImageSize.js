const Jimp = require("jimp");

const changeSize = (path) => {
	return Jimp.read(path)
		.then((image) => {
			image.resize(250, 250).writeAsync(path);
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = {
	changeSize,
};
