const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        callback(null, Date.now() + name);
    }
});

module.exports = multer({ storage }).single('avatar');