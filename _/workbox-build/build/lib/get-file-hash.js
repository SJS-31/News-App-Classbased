'use strict';

/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var fs = require('fs');

var getStringHash = require('./get-string-hash');
var errors = require('./errors');

module.exports = function (file) {
  try {
    var buffer = fs.readFileSync(file);
    return getStringHash(buffer);
  } catch (err) {
    throw new Error(errors['unable-to-get-file-hash'] + ` '${err.message}'`);
  }
};