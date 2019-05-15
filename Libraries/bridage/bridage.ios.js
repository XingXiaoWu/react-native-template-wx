/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Stub of bridage for Android.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const Nativebridage = require('NativeModules').bridage;

/**
 * High-level docs for the bridage iOS API can be written here.
 */

const bridage = {
  test: function() {
    Nativebridage.test();
  },
};

module.exports = bridage;
