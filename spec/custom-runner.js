"use babel";

import {
  createRunner,
} from "atom-jasmine2-test-runner";

const extraOptions = {
  "suffix": "-spec",
  "legacySuffix": "-spec-v1",
  "specHelper": {
    "atom": true,
    "attachToDom": true,
    "ci": false,
    "customMatchers": true,
    "jasmineFocused": false,
    "jasmineJson": false,
    "jasminePass": false,
    "jasmineTagged": false,
    "mockClock": false,
    "mockLocalStorage": false,
    "profile": false,
    "set": false,
    "unspy": false,
  },
};

function optionalConfigurationFunction() {
  //
}

const customRunner = createRunner(extraOptions, optionalConfigurationFunction);

export default customRunner;
