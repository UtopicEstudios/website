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
})({"075e82a97e28fbb77abedcff75118394":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "3d5ec068ab96aaef0d6e772f15316ea1";
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
},{}],"f42ed6084e9c0448f788fec9e30ba2ab":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"0d6e772f15316ea1\":\"lcdm.9ecd0eed.js\",\"5c60679f84604d8e\":\"1.7b50bb42.jpg\",\"3b091057f4f5bb0d\":\"2.a3bc03f7.jpg\",\"d295046b9de8e2fd\":\"3.6a083575.jpg\",\"6b520e90a7cb51e3\":\"4.9d3928a8.jpg\",\"dce32ed1a47910c6\":\"5.ae1ae3a9.jpg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"e936e94cf35095f698c30143d8e7922a":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("url:/img/lcdm/cubes/1.jpg"));

var _2 = _interopRequireDefault(require("url:/img/lcdm/cubes/2.jpg"));

var _3 = _interopRequireDefault(require("url:/img/lcdm/cubes/3.jpg"));

var _4 = _interopRequireDefault(require("url:/img/lcdm/cubes/4.jpg"));

var _5 = _interopRequireDefault(require("url:/img/lcdm/cubes/5.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let scene, camera, canvas, renderer;
let grabPoint;
let cubes = [];
let interactable = [];
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let physicsWorld;
let clock;
let AmmoLib;
let tmpTrans;
let tbv;
let linePositions = [0, 0, 0,
/**/
0, 0, 0];
let line;
let directionalLight;
const cubeSettings = [{
  elem: document.querySelector('.cube.is-1'),
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: new THREE.Euler(30, 0, 0),
  texture: _.default,
  active: true
}, {
  elem: document.querySelector('.cube.is-2'),
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: new THREE.Euler(30, 0, 0),
  texture: _2.default
}, {
  elem: document.querySelector('.cube.is-3'),
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: new THREE.Euler(30, 0, 0),
  texture: _3.default
}, {
  elem: document.querySelector('.cube.is-4'),
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: new THREE.Euler(0, 0, 0),
  texture: _4.default
}, {
  elem: document.querySelector('.cube.is-5'),
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: new THREE.Euler(0, 0, 0),
  texture: _5.default,
  active: true
}];
const planElems = document.querySelectorAll('.shadow-panel');
window.addEventListener('load', () => {
  Ammo().then(function (ammo) {
    AmmoLib = ammo;
    tmpTrans = new AmmoLib.btTransform();
    tbv = new AmmoLib.btVector3();
    start();
  });
});

function getGameXY(bounds) {
  let x = bounds.x;
  let y = bounds.y; //get relative to document

  x += window.pageXOffset;
  y += window.pageYOffset; //get relative to game axis

  x = x + canvas.clientWidth / -2;
  y = canvas.clientHeight / 2 - y; //center

  x += bounds.width / 2;
  y -= bounds.height / 2;
  return {
    x: x / camera.zoom,
    y: y / camera.zoom,
    height: bounds.height / camera.zoom,
    width: bounds.width / camera.zoom
  };
}

function updateCubeSettings() {
  for (let i = 0; i < cubeSettings.length; i++) {
    const curCube = cubeSettings[i];
    const e = curCube.elem;
    if (!e) continue;
    const bounds = getGameXY(e.getBoundingClientRect());
    curCube.pos = new THREE.Vector3(bounds.x, bounds.y, 0);
  }
}

function createAndAddCubesContainer() {
  const element = document.querySelector('.puzzle');
  const bounds = element.getBoundingClientRect();
  const gameBounds = getGameXY(bounds);
  const min_x = gameBounds.x;
  const min_y = gameBounds.y;
  const w = 0.2; //Crystal

  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.2,
    transparent: true
  });
  const planeGeometry = new THREE.PlaneBufferGeometry(gameBounds.width, gameBounds.height, 8, 8);
  const crystal = new THREE.Mesh(planeGeometry, planeMaterial);
  crystal.position.set(min_x, min_y, 10);
  crystal.name = "NOCOLLIDE_CRYSTAL";
  scene.add(crystal);
  interactable.push(crystal);
  createBound("TOP_SHELF", min_x, min_y - w / 2 + gameBounds.height / 2, 0, w, gameBounds.width, 100, 0x9c9c9c);
  createBound("BOTTOM_SHELF", min_x, min_y + w / 2 - gameBounds.height / 2, 0, w, gameBounds.width * 1.1, 100, 0x9c9c9c);
}

function createAndAddShadowPlanes() {
  const createShadowPlane = function (width, height, position, rotation, opacity = 0.5) {
    const planeGeometry = new THREE.PlaneBufferGeometry(width, height, 32, 32);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = opacity;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.copy(position);
    plane.rotation.copy(rotation);
    plane.receiveShadow = true;
    return plane;
  };

  const rot = new THREE.Euler(0, 0, 0);

  for (let i = 0; i < planElems.length; i++) {
    const e = planElems[i];
    const b = e.getBoundingClientRect();
    const pos = getGameXY(b);
    pos.z = -1;
    const shadowPlane = createShadowPlane(pos.width, pos.height, pos, rot);
    scene.add(shadowPlane);
  }
}

function init() {
  clock = new THREE.Clock();
  canvas = document.getElementById('c');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  camera = new THREE.OrthographicCamera(0, 0, 0, 0, 1, 2000);
  camera.position.z = 100;
  camera.zoom = 100;
  updateCameraSize();
  updateCubeSettings();
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x505050));
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-5, -5, 30);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera = camera.clone();
  scene.add(directionalLight);
  directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
  const lineGeometry = new THREE.BufferGeometry();
  linePositions = new Float32Array(2 * 3); // 3 vertices per point

  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 2);
  line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: scaleByPixelRatio(2)
  }));
  scene.add(line);
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  grabPoint = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshLambertMaterial({
    color: 0xffffff
  }));
  grabPoint.scale.set(0.1, 0.1, 0.1);
  grabPoint.visible = false;
  scene.add(grabPoint);

  function createCube(quat, scale, pos, i, mass, textureUrl) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      map: texture
    }));
    object.position.set(pos.x, pos.y, pos.z);
    object.scale.set(scale.x, scale.y, scale.z);
    object.quaternion.set(quat.x, quat.y, quat.z, quat.w);
    let transform = new AmmoLib.btTransform();
    transform.setIdentity();
    transform.setOrigin(new AmmoLib.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new AmmoLib.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new AmmoLib.btDefaultMotionState(transform);
    let colShape = new AmmoLib.btBoxShape(new AmmoLib.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
    let localInertia = new AmmoLib.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(mass, localInertia);
    let rbInfo = new AmmoLib.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
    let body = new AmmoLib.btRigidBody(rbInfo);
    body.forceActivationState(2);
    physicsWorld.addRigidBody(body);
    object.name = "cube" + i;
    object.userData.physicsBody = body;
    object.castShadow = true;
    return object;
  }

  for (let i = 0; i < cubeSettings.length; i++) {
    const config = cubeSettings[i] || {
      pos: undefined,
      rot: undefined
    };
    let pos = config.pos;
    let rot = config.rot || new THREE.Euler(0, 0, 0);
    let scale = {
      x: 1,
      y: 1,
      z: 1
    };
    const quat = new THREE.Quaternion();
    let mass = 10;
    quat.setFromEuler(rot);
    const size = document.querySelector('.cube').getBoundingClientRect().width / camera.zoom;
    scale.x = size;
    scale.y = size;
    scale.z = size;

    if (!pos) {
      pos = {};
      pos.x = -4 + i * (size + .1);
      pos.y = 2;
      pos.z = 0;
    }

    const object = createCube(quat, scale, pos, i, mass, config.texture);
    if (config.active) object.userData.physicsBody.activate();
    object.userData.domElem = config.elem;
    scene.add(object);
    cubes.push(object);
    interactable.push(object);
  }

  createAndAddCubesContainer();
  createAndAddShadowPlanes();
  window.lastWidth = window.innerWidth; //HACK: Reloads page on resize... Too hard to recreate physics+render worlds u.u"

  window.addEventListener('resize', () => {
    if (window.lastWidth === window.innerWidth) {
      updateSize();
      return;
    }

    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(() => window.location.reload(false), 500);
  }, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('dragstart', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, {
    passive: false
  });
  window.addEventListener('mouseup', onMouseCancel, false);
  window.addEventListener('touchstart', onMouseDown, {
    passive: false
  });
  window.addEventListener('touchend', onMouseCancel, false);
  window.addEventListener('touchmove', onMouseMove, false);
}

function createBound(name, x, y, z, height, width, depth, color, friction = 1) {
  const groundShape = new AmmoLib.btBoxShape(new AmmoLib.btVector3(width / 2, height / 2, depth / 2));
  const groundTransform = new AmmoLib.btTransform();
  groundTransform.setIdentity();
  groundTransform.setOrigin(new AmmoLib.btVector3(x, y, z));

  (function () {
    const localInertia = new AmmoLib.btVector3(0, 0, 0);
    const myMotionState = new AmmoLib.btDefaultMotionState(groundTransform);
    const rbInfo = new AmmoLib.btRigidBodyConstructionInfo(0, myMotionState, groundShape, localInertia);
    const body = new AmmoLib.btRigidBody(rbInfo);
    body.setCollisionFlags(1);
    body.setFriction(friction);
    physicsWorld.addRigidBody(body);
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: color
    }));
    object.scale.set(width, height, depth);
    object.position.x = x;
    object.position.y = y;
    object.position.z = z;
    object.name = name;
    object.userData.body = body;
    scene.add(object);
  })();
}

function removeEntity(name) {
  const selectedObject = scene.getObjectByName(name);

  if (selectedObject) {
    physicsWorld.removeRigidBody(selectedObject.userData.body);
    scene.remove(selectedObject);
  }
}

function CreateBounds() {
  const min_x = camera.left / camera.zoom;
  const max_x = camera.right / camera.zoom;
  const min_y = camera.bottom / camera.zoom;
  const max_y = camera.top / camera.zoom;
  let w = 2;
  removeEntity("TOP");
  removeEntity("BOTTOM");
  removeEntity("LEFT");
  removeEntity("RIGHT");
  createBound("TOP", min_x - w / 2, 0, 0, max_y - min_y, w, 100, 0xffffff);
  createBound("BOTTOM", max_x + w / 2, 0, 0, max_y - min_y, w, 100, 0x0000ff);
  createBound("LEFT", 0, max_y + w / 2, 0, w, max_x - min_x, 100, 0xff0000);
  createBound("RIGHT", 0, min_y - w / 2, 0, w, max_x - min_x, 100, 0x00ff00);
}

function updateCameraSize() {
  camera.left = canvas.clientWidth / -2;
  camera.right = canvas.clientWidth / 2;
  camera.top = canvas.clientHeight / 2;
  camera.bottom = canvas.clientHeight / -2;
  camera.updateProjectionMatrix();
}

function resizeRendererToDisplaySize(renderer) {
  const r = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = r.width !== width || r.height !== height;
  if (needResize) renderer.setSize(width, height, false);
  return needResize;
}

function updateSize() {
  if (resizeRendererToDisplaySize(renderer)) {
    updateCubeSettings();
    updateCameraSize();
    CreateBounds();
  }
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

let intersection = undefined;
let constraint;
let pickedBody;
const mousePickClamping = 30;

function onMouseDown(event) {
  updateMouse(event);
  updateIntersection(mouse);
  if (!intersection) return;
  event.preventDefault();
  const inter = intersection;
  const obj = inter.object;
  pickedBody = obj.userData.physicsBody;
  pickedBody.activate(true);
  const localPoint = obj.worldToLocal(inter.point);
  const localPivot = new AmmoLib.btVector3(localPoint.x * obj.scale.x, localPoint.y * obj.scale.y, localPoint.z * obj.scale.z);
  constraint = new AmmoLib.btPoint2PointConstraint(pickedBody, localPivot);
  physicsWorld.addConstraint(constraint, true);
  constraint.m_setting.m_impulseClamp = mousePickClamping;
  constraint.m_setting.m_tau = 0.001;
  grabPoint.visible = true;
  grabPoint.position.copy(inter.point);
  grabPoint.parent = obj;
}

function onMouseCancel(event) {
  if (constraint) {
    physicsWorld.removeConstraint(constraint);
    constraint = undefined;
    pickedBody.setActivationState(1);
    pickedBody = undefined;
    grabPoint.visible = false;
  }
}

function updateMouse(event) {
  const touchEv = event.touches && event.touches[0];
  const changedTouchEv = event.changedTouches && event.changedTouches[0];
  const touch = touchEv || changedTouchEv || event;
  const documentBounds = document.documentElement.getBoundingClientRect();
  mouse.x = touch.pageX / documentBounds.width * 2 - 1;
  mouse.y = -(touch.pageY / documentBounds.height) * 2 + 1;
  mouse.nonPageX = touch.clientX / documentBounds.width * 2 - 1;
  mouse.nonPageY = -(touch.clientY / documentBounds.height) * 2 + 1;
}

function updateIntersection(mouse) {
  raycaster.setFromCamera(mouse, camera);
  const newIntersections = raycaster.intersectObjects(interactable);
  intersection = undefined;

  if (newIntersections.length > 0 && !newIntersections[0].object.name.startsWith("NOCOLLIDE")) {
    intersection = newIntersections[0];
  }

  if (intersection) {
    canvas.style.pointerEvents = 'all';
    canvas.style.cursor = 'pointer';
  } else if (!constraint) {
    canvas.style.pointerEvents = 'none';
    canvas.style.cursor = 'auto';
  }
}

function onMouseMove(event) {
  updateMouse(event);
  updateIntersection(mouse);

  if (constraint) {
    let v = new THREE.Vector3(mouse.x, mouse.y, -1);
    let {
      x,
      y,
      z
    } = v.unproject(camera);
    const oldPivotInB = constraint.getPivotInB();
    oldPivotInB.setX(x);
    oldPivotInB.setY(y);
    canvas.style.cursor = 'move';

    if (mouse.nonPageY > .8) {
      window.scroll(window.scrollX, window.scrollY - 10);
      updateMouse(event);
      updateIntersection(mouse);
    }
  }
}

let frame_counter = 0;
let first_time = true;

function render() {
  const deltaTime = clock.getDelta();
  const time = Date.now() * 0.0005;
  directionalLight.position.y = Math.cos(time * 3) * .75 - 5;
  ClampPositions();

  if (constraint) {
    if (first_time) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'LCDM',
        eventAction: 'start'
      });
      first_time = false;
    }

    let v = new THREE.Vector3(mouse.x, mouse.y, -1);
    let {
      x,
      y,
      z
    } = v.unproject(camera);
    let grabPointPos = new THREE.Vector3();
    grabPointPos.setFromMatrixPosition(grabPoint.matrixWorld);
    let i = 0;
    linePositions[i++] = grabPointPos.x;
    linePositions[i++] = grabPointPos.y;
    linePositions[i++] = grabPointPos.z;
    linePositions[i++] = x;
    linePositions[i++] = y;
    linePositions[i++] = z;
    line.geometry.attributes.position.needsUpdate = true;
    line.geometry.computeBoundingSphere();
    line.visible = true;
  } else {
    line.visible = false;
  }

  updatePhysics(deltaTime);

  if (!solved) {
    solved = CheckSolution();

    if (solved) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'LCDM',
        eventAction: 'solved'
      });
      PlaySolvedMagic();
    }
  } else {
    if (frame_counter++ % 300 === 0) {
      for (let i = 0; i < cubes.length; i++) {
        const body = cubes[i].userData.physicsBody;
        const force = Math.random() * 50;
        const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        v.normalize();
        v.multiplyScalar(force);
        const [vx, vy, vz] = [v.x, v.y, 0];
        body.activate();
        body.applyCentralImpulse(new AmmoLib.btVector3(vx, vy, vz));
      }
    }

    window.fluidsMovePointers(PreparePointers());
  }

  renderer.render(scene, camera);
}

window.solve = () => {
  solved = true;
  PlaySolvedMagic();
};

let solved = false;

function PreparePointers() {
  const cubePointers = [];

  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];
    const pos = cube.position;
    cubePointers.push({
      x: pos.x * camera.zoom + camera.right,
      y: pos.y * camera.zoom + camera.top,
      identifier: cube.name
    });
  }

  return cubePointers;
}

function PlaySolvedMagic() {
  removeEntity("TOP_SHELF");
  removeEntity("BOTTOM_SHELF");
  removeEntity("NOCOLLIDE_CRYSTAL");
  window.vantabg.destroy();
  window.enableFluids();
  const cubesPointers = PreparePointers();
  window.fluidsStartPointers(cubesPointers);
  gravity = new AmmoLib.btVector3(0, 0, 0);
}

function CheckSolution() {
  const element = document.querySelector('.puzzle');
  const bounds = element.getBoundingClientRect();
  const gameBounds = getGameXY(bounds);
  const min_x = gameBounds.x - gameBounds.width / 2;
  const max_x = gameBounds.x + gameBounds.width / 2;
  const min_y = gameBounds.y - gameBounds.height / 2;
  const max_y = gameBounds.y + gameBounds.height / 2;
  const solution = "12345";
  const trySol = [];

  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];

    if (cube.position.x > max_x || cube.position.x < min_x) {
      return false;
    }

    if (cube.position.y > max_y || cube.position.y < min_y) {
      return false;
    }

    trySol.push([i + 1, cube.position.x]);
  }

  trySol.sort((a, b) => a[1] - b[1]);
  const proposedSol = trySol.map(e => e[0].toString()).join("");
  return solution === proposedSol;
}

function ClampPositions() {
  for (let i = 0; i < cubes.length; i++) {
    const obj = cubes[i];
    const body = obj.userData.physicsBody;
    const transform = body.getCenterOfMassTransform();
    const position = obj.position;
    position.z = 0;
    position.x = Math.min(Math.max(camera.left / camera.zoom, position.x), camera.right / camera.zoom);
    position.y = Math.min(Math.max(camera.bottom / camera.zoom, position.y), camera.top / camera.zoom);
    transform.setOrigin(new AmmoLib.btVector3(position.x, position.y, position.z));
    body.setCenterOfMassTransform(transform);
  }
}

let gravity = undefined;

function setupPhysicsWorld() {
  let collisionConfiguration = new AmmoLib.btDefaultCollisionConfiguration(),
      dispatcher = new AmmoLib.btCollisionDispatcher(collisionConfiguration),
      overlappingPairCache = new AmmoLib.btDbvtBroadphase(),
      solver = new AmmoLib.btSequentialImpulseConstraintSolver();
  if (!gravity) gravity = new AmmoLib.btVector3(0, -9.8, 0);
  physicsWorld = new AmmoLib.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
  physicsWorld.setGravity(gravity);
}

function start() {
  setupPhysicsWorld();
  init();
  updateSize();
  CreateBounds();
  animate();
}

function updatePhysics(deltaTime) {
  // Update gravity
  physicsWorld.setGravity(gravity); // Step world

  physicsWorld.stepSimulation(deltaTime); // Update rigid bodies

  for (let i = 0; i < cubes.length; i++) {
    let objThree = cubes[i];
    let objAmmo = objThree.userData.physicsBody;
    let ms = objAmmo.getMotionState();

    if (ms) {
      ms.getWorldTransform(tmpTrans);
      let p = tmpTrans.getOrigin();
      let q = tmpTrans.getRotation();
      objThree.position.set(p.x(), p.y(), p.z());
      objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
    }
  }
}

const burger = document.querySelector('#navbar-burger-id');
burger.addEventListener('click', function () {
  if (burger.classList.contains('is-active')) {
    gravity = new AmmoLib.btVector3(0, -9.8, 0);

    for (let i = 0; i < cubes.length; i++) cubes[i].userData.physicsBody.activate(true);
  } else {
    if (!solved) return;
    gravity = new AmmoLib.btVector3(0, 0, 0);
  }
}, false);

function scaleByPixelRatio(input) {
  let pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}
},{"url:/img/lcdm/cubes/1.jpg":"0455cfa39cbad290b33e741cd78c731c","url:/img/lcdm/cubes/2.jpg":"e563c5885612cb23759a11381d39fe09","url:/img/lcdm/cubes/3.jpg":"35b7ef1bd73cd9c49556d34456632a06","url:/img/lcdm/cubes/4.jpg":"3c652deea79e733a4dccfe6ada3cebaa","url:/img/lcdm/cubes/5.jpg":"ac92f31df29f4b2c5c44a3b54995c135"}],"0455cfa39cbad290b33e741cd78c731c":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0d6e772f15316ea1", "5c60679f84604d8e");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"e563c5885612cb23759a11381d39fe09":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0d6e772f15316ea1", "3b091057f4f5bb0d");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"35b7ef1bd73cd9c49556d34456632a06":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0d6e772f15316ea1", "d295046b9de8e2fd");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"3c652deea79e733a4dccfe6ada3cebaa":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0d6e772f15316ea1", "6b520e90a7cb51e3");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"ac92f31df29f4b2c5c44a3b54995c135":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0d6e772f15316ea1", "dce32ed1a47910c6");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}]},{},["075e82a97e28fbb77abedcff75118394","f42ed6084e9c0448f788fec9e30ba2ab","e936e94cf35095f698c30143d8e7922a"], null)

//# sourceMappingURL=lcdm.9ecd0eed.js.map
