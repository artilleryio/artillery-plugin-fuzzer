'use strict';
const test = require('tape');
const { Plugin } = require('../index');

test('should add a fuzzerPluginCreateVariable function with a ws scenario', function (t) {
  t.plan(4);

  let script = {
    config: {},
    scenarios: [{ engine: 'ws', flow: [] }]
  };

  t.doesNotThrow(() => {
    t.ok(new Plugin(script));
    let { flow } = script.scenarios[0];
    t.equals(flow.length, 1, 'should add an init step');
    t.equals(flow[0].function, 'fuzzerPluginCreateVariable', 'should add the create function');
  });
});
