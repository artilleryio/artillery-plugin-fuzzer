'use strict';

const blns = require('./data/blns.json');
const debug = require('debug')('plugin:fuzzer');

module.exports.Plugin = FuzzerPlugin;
module.exports.pluginInterfaceVersion = 2;

function FuzzerPlugin (script, events) {
  this.script = script;
  this.events = events;

  if (!script.config.processor) {
    script.config.processor = {};
  }

  script.config.processor.fuzzerPluginCreateVariable = fuzzerPluginCreateVariable;

  script.scenarios.forEach(function (scenario) {
    if (!scenario.beforeRequest) {
      scenario.beforeRequest = [];
    }

    scenario.beforeRequest.push('fuzzerPluginCreateVariable');

    if (['socketio', 'ws'].includes(scenario.engine)) {
      scenario.flow.unshift({function: 'fuzzerPluginCreateVariable'});
    }
  });

  debug('Plugin initialized');
  return this;
}

function fuzzerPluginCreateVariable (req, userContext, events, done) {
  let ctx = userContext;
  let cb = done;

  if (arguments.length === 3) {
    // called as a "function"
    ctx = req;
    cb = events;
  }
  const ns = blns[Math.floor(Math.random() * blns.length)];
  ctx.vars.naughtyString = ns;
  debug(`fuzzerPluginCreateVariable: ${ns}`);
  return cb();
}
