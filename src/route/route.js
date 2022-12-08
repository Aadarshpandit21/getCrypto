let express = require('express');
const router = express.Router();
let cryptoController = require('../controller/crypto');

router.get('/getData',cryptoController.getCrypto);

module.exports = router;