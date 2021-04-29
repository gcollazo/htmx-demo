require( 'valyrian.js/register.js');
require('valyrian.js');
require('valyrian.js/plugins/node');
const safePlugin = require('./common/safe-plugin');
v.usePlugin(safePlugin);

require('./app.js');
