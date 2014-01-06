/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Author: Michael Kohler <mkohler@picobudget.com>
 * Contributors:
 *   - yournamehere <mail@mail.ch>
 */

(function () {
  'use strict';

  var express = require('express');
  var server = express();

  server.configure(function () {
    server.set('port', 3001);
    server.set('publicfolder', 'public');
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
  });

  server.configure('development', function () {
    server.use(express.logger('dev'));
  });

  server.listen(server.get('port'), function () {
    console.log('Server started on Port ' + server.get('port'));
  });

  var mainRoutes = require('./routes/main.js');
  server.get('/status/:interval', mainRoutes.main);
  server.post('/ping', mainRoutes.ping);
  server.get('/getStatus/:interval', mainRoutes.getStatus);
  server.get('/initDB', mainRoutes.initDB);
}());
