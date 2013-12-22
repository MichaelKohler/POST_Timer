'use strict';

module.exports.getStatus = function (aInterval) {
  return 1;
};

module.exports.getLastRequestDate = function () {
    return new Date();
}

module.exports.getLastRequest = function () {
    return {};
}

module.exports.add = function(aCallback) {
  aCallback();
}