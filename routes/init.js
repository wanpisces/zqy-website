var express = require('express');
var router = express.Router();

require('./index')(router);
require('./users')(router);

require('./analysis')(router);
require('./dm')(router);

require('./core-first')(router);
require('./core-comments')(router);
require('./core-member')(router);

module.exports = router;