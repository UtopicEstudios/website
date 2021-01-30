// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"179874081e982e4d355744e4c5a247c4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0e1cd9b5a917becd93156d416210f4ac";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      var newStyle = document.createElement('style');
      newStyle.innerHTML = asset.output;
      document.body.appendChild(newStyle);
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"73ea0f8fa7d925bd58ace3b6abddb77f":[function(require,module,exports) {
"use strict";

var _simplestatemanager = _interopRequireDefault(require("simplestatemanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let panels;
let timeout = null;
const speed = 100;
let slides = document.querySelector(".glide__slides");

const onMouseOver = function (e) {
  [].forEach.call(projects, function (p) {
    p.classList.remove('hover');
  });
  e.target.classList.add('hover');
};

const projects = document.querySelectorAll('.project');
[].forEach.call(projects, function (p) {
  p.addEventListener('mouseenter', onMouseOver, false);
});
window.addEventListener('scroll', function (event) {
  [].forEach.call(projects, function (p) {
    if (isInViewport(p)) p.classList.add('hover');else p.classList.remove('hover');
  });
}, false);

const isInViewport = function (elem) {
  const distance = elem.getBoundingClientRect();
  return distance.top >= 0 && distance.left >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
};

_simplestatemanager.default.addState({
  id: "mobile",
  query: "(min-width: 700px)",
  onEnter: function () {
    slides.classList.remove("flex-column");
    panels = new Glide('#carousel', {
      type: 'slider',
      perView: 4,
      focusAt: 'center',
      breakpoints: {
        960: {
          perView: 2
        },
        1300: {
          perView: 3
        }
      },
      startAt: 2
    });
    panels.on(['run.after', 'mount.after'], function (e) {
      let elem = document.querySelector(".glide__slide--active .project");
      if (elem) onMouseOver({
        "target": elem
      });
    });
    panels.mount();
  },
  onLeave: function () {
    slides.classList.add("flex-column");
    panels.destroy();
  }
});

document.querySelector('#carousel').addEventListener('wheel', function (event) {
  if (timeout !== null) {
    event.preventDefault();
    return false;
  }

  let delta = event.detail ? event.detail * -120 : event.wheelDelta ? event.wheelDelta : event.deltaY ? event.deltaY * -120 : 0;
  let scrollDown = delta < 0;
  let canScroll = !document.querySelector(".glide__slides.flex-column");

  if (canScroll) {
    timeout = setTimeout(function () {
      timeout = null;
    }, speed);
    event.preventDefault();

    if (scrollDown) {
      panels.go("<");
    } else {
      panels.go(">");
    }

    return false;
  }

  return true;
});
},{"simplestatemanager":"b4668a8ae8fb2afe25a2b85be6506343"}],"b4668a8ae8fb2afe25a2b85be6506343":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _state = _interopRequireDefault(require("./state"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// State Manager Constructor
class StateManager {
  constructor() {
    this.states = [];
    this.resizeTimer = null;
    this.configOptions = [];
    window.addEventListener('resize', (0, _utils.debounce)(this.resizeBrowser.bind(this), 25), true);
  }

  addState(options) {
    const newState = new _state.default(options);

    if (newState.valid) {
      this.states.push(newState);
    }

    return newState;
  }

  addStates(statesArray) {
    statesArray.forEach(state => this.addState(state));
  }

  getState(id) {
    const selectedState = this.states.filter(state => state.id === id);
    return selectedState[0] || false;
  }

  isActive(id) {
    const selectedState = this.getState(id) || {};
    return selectedState.active || false;
  }

  getStates(idArr) {
    if (typeof idArr === 'undefined') {
      return this.states;
    }

    return idArr.map(id => this.getState(id));
  }

  removeState(id) {
    this.states.forEach((state, index) => {
      if (state.id === id) {
        state.destroy();
        this.states.splice(index, 1);
      }
    });
  }

  removeStates(idArray) {
    idArray.forEach(id => this.removeState(id));
  }

  removeAllStates() {
    this.states.forEach(state => state.destroy());
    this.states = [];
  }

  addConfigOption({
    name = '',
    // name, this is used to apply to a state
    test = null,
    // function which will perform the test
    when = 'resize' // resize or match (match will mean that resize will never fire either), or once (which will test once, then delete state if test doesnt pass)

  }) {
    if (name !== '' && test !== null) {
      _state.default.addConfigOption({
        name,
        test,
        when
      });
    }
  }

  removeConfigOption(name) {
    _state.default.removeConfigOption(name);
  }

  getConfigOptions(name) {
    const configOptions = _state.default.getConfigOptions();

    if (typeof name === 'string') {
      return configOptions.filter(configOption => configOption.name === name);
    }

    return configOptions;
  }

  resizeBrowser() {
    const activeStates = (0, _utils.filterStates)(this.states, 'active', true);
    activeStates.forEach(state => {
      state.resizeState();
    });
  }

  stateChange(func) {
    _state.default.setStateChangeMethod(func);
  }

}

var _default = new StateManager();

exports.default = _default;
},{"./state":"ae8a2239255f09fbb309999b6e985b1d","./utils":"4050d74b32f5bcad1138e896d3f71cec"}],"ae8a2239255f09fbb309999b6e985b1d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

const configOptions = [];

let stateChangeMethod = () => {};

class State {
  constructor(options) {
    this.id = options.id || (0, _utils.makeID)();
    this.query = options.query || 'all';
    const defaultOptions = {
      onEnter: [],
      onLeave: [],
      onResize: [],
      onFirstRun: []
    }; // Merge options with defaults to make the state

    this.options = Object.assign({}, defaultOptions, options); // Migrate methods into an array, this is to enable future functionality of adding extra methods to an existing state

    if (typeof this.options.onEnter === 'function') {
      this.options.onEnter = [this.options.onEnter];
    }

    if (typeof this.options.onLeave === 'function') {
      this.options.onLeave = [this.options.onLeave];
    }

    if (typeof this.options.onResize === 'function') {
      this.options.onResize = [this.options.onResize];
    }

    if (typeof this.options.onFirstRun === 'function') {
      this.options.onFirstRun = [this.options.onFirstRun];
    } // Test the one time tests first, if the test is invalid we wont create the config option


    if (this.testConfigOptions('once') === false) {
      this.valid = false;
      return false;
    }

    this.valid = true;
    this.active = false;
    this.init();
  }

  init() {
    this.test = window.matchMedia(this.query);

    if (this.test.matches && this.testConfigOptions('match')) {
      this.enterState();
    }

    this.listener = test => {
      let changed = false;

      if (test.matches) {
        if (this.testConfigOptions('match')) {
          this.enterState();
          changed = true;
        }
      } else {
        this.leaveState();
        changed = true;
      }

      if (changed) {
        stateChangeMethod();
      }
    };

    this.test.addListener(this.listener);
  } // Handle entering a state


  enterState() {
    (0, _utils.fireAllMethodsInArray)(this.options.onFirstRun, this.eventData('firstRun'));
    (0, _utils.fireAllMethodsInArray)(this.options.onEnter, this.eventData('enter'));
    this.options.onFirstRun = [];
    this.active = true;
  } // Handle leaving a state


  leaveState() {
    (0, _utils.fireAllMethodsInArray)(this.options.onLeave, this.eventData('leave'));
    this.active = false;
  } // Handle the user resizing the browser


  resizeState() {
    if (this.testConfigOptions('resize')) {
      (0, _utils.fireAllMethodsInArray)(this.options.onResize, this.eventData('resize'));
    }
  } // When the StateManager removes a state we want to remove the event listener


  destroy() {
    this.test.removeListener(this.listener);
  }

  attachCallback(type, callback, runIfActive) {
    switch (type) {
      case 'enter':
        this.options.onEnter.push(callback);
        break;

      case 'leave':
        this.options.onLeave.push(callback);
        break;

      case 'resize':
        this.options.onResize.push(callback);
        break;

      default:
        break;
    }

    if (type === 'enter' && runIfActive && this.active) {
      callback(this.eventData(type));
    }
  }

  testConfigOptions(when) {
    let test = true;
    configOptions.forEach(configOption => {
      if (typeof this.options[configOption.name] !== 'undefined') {
        if (configOption.when === when && configOption.test.bind(this)() === false) {
          test = false;
        }
      }
    });
    return test;
  }

  eventData(eventType) {
    return {
      eventType,
      state: this
    };
  }

  static addConfigOption(configOption) {
    configOptions.push(configOption);
  }

  static getConfigOptions() {
    return configOptions;
  }

  static removeConfigOption(name) {
    configOptions.forEach((item, index) => {
      if (item.name === name) {
        configOptions.splice(index, 1);
      }
    });
  }

  static setStateChangeMethod(func) {
    if (typeof func === 'function') {
      stateChangeMethod = func;
    } else {
      throw new Error('Not a function');
    }
  }

}

exports.default = State;
},{"./utils":"4050d74b32f5bcad1138e896d3f71cec"}],"4050d74b32f5bcad1138e896d3f71cec":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterStates = filterStates;
exports.makeID = makeID;
exports.fireAllMethodsInArray = fireAllMethodsInArray;
exports.funcToArray = funcToArray;
exports.debounce = debounce;

function filterStates(states, key, value) {
  return states.filter(state => state[key] && state[key] === value);
}

function makeID() {
  return Math.random().toString(36).substr(2, 9);
}

function fireAllMethodsInArray(arr, event) {
  arr.forEach(method => method(event));
}

function funcToArray(func) {
  return typeof func === 'function' ? [func] : func;
}

function debounce(func) {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(later);
  };
}
},{}]},{},["179874081e982e4d355744e4c5a247c4","73ea0f8fa7d925bd58ace3b6abddb77f"], null)

//# sourceMappingURL=logic.fd9da8e2.js.map
