/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Author: Michael Kohler <mkohler@picobudget.com>
 * Contributors:
 *   - yournamehere <mail@mail.ch>
 */

'use strict';

var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('requests.sqlite3');

module.exports.getLastRequestDate = function (aInterval, aCallback) {
    db.serialize(function() {
        db.all("SELECT requestDate FROM requests ORDER BY `requestDate` DESC LIMIT 1", function(err, rows) {
            if (rows && rows.length > 0) {
                aCallback(new Date(rows[0].requestDate));
            }
            else {
                aCallback(new Date(1900, 1, 1));
            }
        });
    });
};

module.exports.getStatus = function (aDate, aInterval, aCallback) {
    var now = new Date();
    aCallback(aDate >= now.setMinutes(now.getMinutes() - aInterval));
};

module.exports.add = function(aCallback) {
    var stmt = db.prepare("INSERT INTO requests VALUES (?)");
    stmt.run(new Date());
    stmt.finalize();
    aCallback();
};

module.exports.initDB = function(aCallback) {
    db.run("CREATE TABLE IF NOT EXISTS requests (requestDate DATE)");
    aCallback();
};
