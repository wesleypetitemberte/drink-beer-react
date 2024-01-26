import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-KRLOMQRZ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/parse-headers/parse-headers.js
var require_parse_headers = __commonJS({
  "node_modules/parse-headers/parse-headers.js"(exports, module) {
    var trim = function(string) {
      return string.replace(/^\s+|\s+$/g, "");
    };
    var isArray = function(arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
    module.exports = function(headers) {
      if (!headers)
        return {};
      var result = {};
      var headersArr = trim(headers).split("\n");
      for (var i = 0; i < headersArr.length; i++) {
        var row = headersArr[i];
        var index = row.indexOf(":"), key = trim(row.slice(0, index)).toLowerCase(), value = trim(row.slice(index + 1));
        if (typeof result[key] === "undefined") {
          result[key] = value;
        } else if (isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      }
      return result;
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// src/components/Beers/Beers.tsx
var import_react = __toESM(require_react(), 1);

// node_modules/get-it/dist/_chunks/defaultOptionsValidator-N21NGwyb.js
var isReactNative = typeof navigator === "undefined" ? false : navigator.product === "ReactNative";
var defaultOptions = { timeout: isReactNative ? 6e4 : 12e4 };
var processOptions = function processOptions2(opts) {
  const options = {
    ...defaultOptions,
    ...typeof opts === "string" ? { url: opts } : opts
  };
  const { searchParams } = new URL(options.url, "http://localhost");
  options.timeout = normalizeTimeout(options.timeout);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== void 0) {
        if (Array.isArray(value)) {
          for (const v of value) {
            searchParams.append(key, v);
          }
        } else {
          searchParams.append(key, value);
        }
      }
    }
  }
  const [url] = options.url.split("?");
  const search = searchParams.toString();
  if (search) {
    options.url = "".concat(url, "?").concat(search);
  }
  options.method = options.body && !options.method ? "POST" : (options.method || "GET").toUpperCase();
  return options;
};
function normalizeTimeout(time) {
  if (time === false || time === 0) {
    return false;
  }
  if (time.connect || time.socket) {
    return time;
  }
  const delay = Number(time);
  if (isNaN(delay)) {
    return normalizeTimeout(defaultOptions.timeout);
  }
  return { connect: delay, socket: delay };
}
var validUrl = /^https?:\/\//i;
var validateOptions = function validateOptions2(options) {
  if (!validUrl.test(options.url)) {
    throw new Error('"'.concat(options.url, '" is not a valid URL'));
  }
};

// node_modules/get-it/dist/index.browser.js
var import_parse_headers = __toESM(require_parse_headers(), 1);
var middlewareReducer = (middleware) => function applyMiddleware(hook, defaultValue, ...args) {
  const bailEarly = hook === "onError";
  let value = defaultValue;
  for (let i = 0; i < middleware[hook].length; i++) {
    const handler = middleware[hook][i];
    value = handler(value, ...args);
    if (bailEarly && !value) {
      break;
    }
  }
  return value;
};
function createPubSub() {
  const subscribers = /* @__PURE__ */ Object.create(null);
  let nextId = 0;
  function subscribe(subscriber) {
    const id = nextId++;
    subscribers[id] = subscriber;
    return function unsubscribe() {
      delete subscribers[id];
    };
  }
  function publish(event) {
    for (const id in subscribers) {
      subscribers[id](event);
    }
  }
  return {
    publish,
    subscribe
  };
}
var channelNames = [
  "request",
  "response",
  "progress",
  "error",
  "abort"
];
var middlehooks = [
  "processOptions",
  "validateOptions",
  "interceptRequest",
  "finalizeOptions",
  "onRequest",
  "onResponse",
  "onError",
  "onReturn",
  "onHeaders"
];
function createRequester(initMiddleware, httpRequest) {
  const loadedMiddleware = [];
  const middleware = middlehooks.reduce(
    (ware, name) => {
      ware[name] = ware[name] || [];
      return ware;
    },
    {
      processOptions: [processOptions],
      validateOptions: [validateOptions]
    }
  );
  function request(opts) {
    const onResponse = (reqErr, res, ctx) => {
      let error = reqErr;
      let response = res;
      if (!error) {
        try {
          response = applyMiddleware("onResponse", res, ctx);
        } catch (err) {
          response = null;
          error = err;
        }
      }
      error = error && applyMiddleware("onError", error, ctx);
      if (error) {
        channels.error.publish(error);
      } else if (response) {
        channels.response.publish(response);
      }
    };
    const channels = channelNames.reduce((target, name) => {
      target[name] = createPubSub();
      return target;
    }, {});
    const applyMiddleware = middlewareReducer(middleware);
    const options = applyMiddleware("processOptions", opts);
    applyMiddleware("validateOptions", options);
    const context2 = { options, channels, applyMiddleware };
    let ongoingRequest;
    const unsubscribe = channels.request.subscribe((ctx) => {
      ongoingRequest = httpRequest(ctx, (err, res) => onResponse(err, res, ctx));
    });
    channels.abort.subscribe(() => {
      unsubscribe();
      if (ongoingRequest) {
        ongoingRequest.abort();
      }
    });
    const returnValue = applyMiddleware("onReturn", channels, context2);
    if (returnValue === channels) {
      channels.request.publish(context2);
    }
    return returnValue;
  }
  request.use = function use(newMiddleware) {
    if (!newMiddleware) {
      throw new Error("Tried to add middleware that resolved to falsey value");
    }
    if (typeof newMiddleware === "function") {
      throw new Error(
        "Tried to add middleware that was a function. It probably expects you to pass options to it."
      );
    }
    if (newMiddleware.onReturn && middleware.onReturn.length > 0) {
      throw new Error(
        "Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event"
      );
    }
    middlehooks.forEach((key) => {
      if (newMiddleware[key]) {
        middleware[key].push(newMiddleware[key]);
      }
    });
    loadedMiddleware.push(newMiddleware);
    return request;
  };
  request.clone = () => createRequester(loadedMiddleware, httpRequest);
  initMiddleware.forEach(request.use);
  return request;
}
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _method;
var _url;
var _resHeaders;
var _headers;
var _controller;
var _init;
var _useAbortSignal;
var FetchXhr = class {
  constructor() {
    this.readyState = 0;
    this.responseType = "";
    __privateAdd(this, _method, void 0);
    __privateAdd(this, _url, void 0);
    __privateAdd(this, _resHeaders, void 0);
    __privateAdd(this, _headers, {});
    __privateAdd(this, _controller, void 0);
    __privateAdd(this, _init, {});
    __privateAdd(this, _useAbortSignal, void 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- _async is only declared for typings compatibility
  open(method, url, _async) {
    __privateSet(this, _method, method);
    __privateSet(this, _url, url);
    __privateSet(this, _resHeaders, "");
    this.readyState = 1;
    this.onreadystatechange();
    __privateSet(this, _controller, void 0);
  }
  abort() {
    if (__privateGet(this, _controller)) {
      __privateGet(this, _controller).abort();
    }
  }
  getAllResponseHeaders() {
    return __privateGet(this, _resHeaders);
  }
  setRequestHeader(name, value) {
    __privateGet(this, _headers)[name] = value;
  }
  // Allow setting extra fetch init options, needed for runtimes such as Vercel Edge to set `cache` and other options in React Server Components
  setInit(init, useAbortSignal = true) {
    __privateSet(this, _init, init);
    __privateSet(this, _useAbortSignal, useAbortSignal);
  }
  send(body) {
    const textBody = this.responseType !== "arraybuffer";
    const options = {
      ...__privateGet(this, _init),
      method: __privateGet(this, _method),
      headers: __privateGet(this, _headers),
      body
    };
    if (typeof AbortController === "function" && __privateGet(this, _useAbortSignal)) {
      __privateSet(this, _controller, new AbortController());
      if (typeof EventTarget !== "undefined" && __privateGet(this, _controller).signal instanceof EventTarget) {
        options.signal = __privateGet(this, _controller).signal;
      }
    }
    if (typeof document !== "undefined") {
      options.credentials = this.withCredentials ? "include" : "omit";
    }
    fetch(__privateGet(this, _url), options).then((res) => {
      res.headers.forEach((value, key) => {
        __privateSet(this, _resHeaders, __privateGet(this, _resHeaders) + "".concat(key, ": ").concat(value, "\r\n"));
      });
      this.status = res.status;
      this.statusText = res.statusText;
      this.readyState = 3;
      return textBody ? res.text() : res.arrayBuffer();
    }).then((resBody) => {
      if (typeof resBody === "string") {
        this.responseText = resBody;
      } else {
        this.response = resBody;
      }
      this.readyState = 4;
      this.onreadystatechange();
    }).catch((err) => {
      var _a;
      if (err.name === "AbortError") {
        this.onabort();
        return;
      }
      (_a = this.onerror) == null ? void 0 : _a.call(this, err);
    });
  }
};
_method = /* @__PURE__ */ new WeakMap();
_url = /* @__PURE__ */ new WeakMap();
_resHeaders = /* @__PURE__ */ new WeakMap();
_headers = /* @__PURE__ */ new WeakMap();
_controller = /* @__PURE__ */ new WeakMap();
_init = /* @__PURE__ */ new WeakMap();
_useAbortSignal = /* @__PURE__ */ new WeakMap();
var adapter = typeof XMLHttpRequest === "function" ? "xhr" : "fetch";
var XmlHttpRequest = adapter === "xhr" ? XMLHttpRequest : FetchXhr;
var httpRequester = (context2, callback) => {
  var _a;
  const opts = context2.options;
  const options = context2.applyMiddleware("finalizeOptions", opts);
  const timers = {};
  const injectedResponse = context2.applyMiddleware("interceptRequest", void 0, {
    adapter,
    context: context2
  });
  if (injectedResponse) {
    const cbTimer = setTimeout(callback, 0, null, injectedResponse);
    const cancel = () => clearTimeout(cbTimer);
    return { abort: cancel };
  }
  let xhr = new XmlHttpRequest();
  if (xhr instanceof FetchXhr && typeof options.fetch === "object") {
    xhr.setInit(options.fetch, (_a = options.useAbortSignal) != null ? _a : true);
  }
  const headers = options.headers;
  const delays = options.timeout;
  let aborted = false;
  let loaded = false;
  let timedOut = false;
  xhr.onerror = (event) => {
    onError(
      new Error(
        "Request error while attempting to reach ".concat(options.url).concat(event.lengthComputable ? "(".concat(event.loaded, " of ").concat(event.total, " bytes transferred)") : "")
      )
    );
  };
  xhr.ontimeout = (event) => {
    onError(
      new Error(
        "Request timeout while attempting to reach ".concat(options.url).concat(event.lengthComputable ? "(".concat(event.loaded, " of ").concat(event.total, " bytes transferred)") : "")
      )
    );
  };
  xhr.onabort = () => {
    stopTimers(true);
    aborted = true;
  };
  xhr.onreadystatechange = () => {
    resetTimers();
    if (aborted || xhr.readyState !== 4) {
      return;
    }
    if (xhr.status === 0) {
      return;
    }
    onLoad();
  };
  xhr.open(
    options.method,
    options.url,
    true
    // Always async
  );
  xhr.withCredentials = !!options.withCredentials;
  if (headers && xhr.setRequestHeader) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }
  if (options.rawBody) {
    xhr.responseType = "arraybuffer";
  }
  context2.applyMiddleware("onRequest", { options, adapter, request: xhr, context: context2 });
  xhr.send(options.body || null);
  if (delays) {
    timers.connect = setTimeout(() => timeoutRequest("ETIMEDOUT"), delays.connect);
  }
  return { abort };
  function abort() {
    aborted = true;
    if (xhr) {
      xhr.abort();
    }
  }
  function timeoutRequest(code) {
    timedOut = true;
    xhr.abort();
    const error = new Error(
      code === "ESOCKETTIMEDOUT" ? "Socket timed out on request to ".concat(options.url) : "Connection timed out on request to ".concat(options.url)
    );
    error.code = code;
    context2.channels.error.publish(error);
  }
  function resetTimers() {
    if (!delays) {
      return;
    }
    stopTimers();
    timers.socket = setTimeout(() => timeoutRequest("ESOCKETTIMEDOUT"), delays.socket);
  }
  function stopTimers(force) {
    if (force || aborted || xhr.readyState >= 2 && timers.connect) {
      clearTimeout(timers.connect);
    }
    if (timers.socket) {
      clearTimeout(timers.socket);
    }
  }
  function onError(error) {
    if (loaded) {
      return;
    }
    stopTimers(true);
    loaded = true;
    xhr = null;
    const err = error || new Error("Network error while attempting to reach ".concat(options.url));
    err.isNetworkError = true;
    err.request = options;
    callback(err);
  }
  function reduceResponse() {
    return {
      body: xhr.response || (xhr.responseType === "" || xhr.responseType === "text" ? xhr.responseText : ""),
      url: options.url,
      method: options.method,
      headers: (0, import_parse_headers.default)(xhr.getAllResponseHeaders()),
      statusCode: xhr.status,
      statusMessage: xhr.statusText
    };
  }
  function onLoad() {
    if (aborted || loaded || timedOut) {
      return;
    }
    if (xhr.status === 0) {
      onError(new Error("Unknown XHR error"));
      return;
    }
    stopTimers();
    loaded = true;
    callback(null, reduceResponse());
  }
};
var getIt = (initMiddleware = [], httpRequest = httpRequester) => createRequester(initMiddleware, httpRequest);

// node_modules/get-it/dist/middleware.browser.js
var import_debug = __toESM(require_browser(), 1);

// node_modules/is-plain-object/dist/is-plain-object.mjs
function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject(o) {
  var ctor, prot;
  if (isObject(o) === false)
    return false;
  ctor = o.constructor;
  if (ctor === void 0)
    return true;
  prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}

// node_modules/get-it/dist/middleware.browser.js
function agent(opts) {
  return {};
}
var isBuffer = typeof Buffer === "undefined" ? () => false : (obj) => Buffer.isBuffer(obj);
var serializeTypes = ["boolean", "string", "number"];
function jsonRequest() {
  return {
    processOptions: (options) => {
      const body = options.body;
      if (!body) {
        return options;
      }
      const isStream2 = typeof body.pipe === "function";
      const shouldSerialize = !isStream2 && !isBuffer(body) && (serializeTypes.indexOf(typeof body) !== -1 || Array.isArray(body) || isPlainObject(body));
      if (!shouldSerialize) {
        return options;
      }
      return Object.assign({}, options, {
        body: JSON.stringify(options.body),
        headers: Object.assign({}, options.headers, {
          "Content-Type": "application/json"
        })
      });
    }
  };
}
function jsonResponse(opts) {
  return {
    onResponse: (response) => {
      const contentType = response.headers["content-type"] || "";
      const shouldDecode = opts && opts.force || contentType.indexOf("application/json") !== -1;
      if (!response.body || !contentType || !shouldDecode) {
        return response;
      }
      return Object.assign({}, response, { body: tryParse(response.body) });
    },
    processOptions: (options) => Object.assign({}, options, {
      headers: Object.assign({ Accept: "application/json" }, options.headers)
    })
  };
  function tryParse(body) {
    try {
      return JSON.parse(body);
    } catch (err) {
      err.message = "Failed to parsed response body as JSON: ".concat(err.message);
      throw err;
    }
  }
}
var actualGlobal = {};
if (typeof globalThis !== "undefined") {
  actualGlobal = globalThis;
} else if (typeof window !== "undefined") {
  actualGlobal = window;
} else if (typeof globalThis !== "undefined") {
  actualGlobal = globalThis;
} else if (typeof self !== "undefined") {
  actualGlobal = self;
}
var global$1 = actualGlobal;
function observable(opts = {}) {
  const Observable2 = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- @TODO consider dropping checking for a global Observable since it's not on a standards track
    opts.implementation || global$1.Observable
  );
  if (!Observable2) {
    throw new Error(
      "`Observable` is not available in global scope, and no implementation was passed"
    );
  }
  return {
    onReturn: (channels, context2) => new Observable2((observer) => {
      channels.error.subscribe((err) => observer.error(err));
      channels.progress.subscribe(
        (event) => observer.next(Object.assign({ type: "progress" }, event))
      );
      channels.response.subscribe((response) => {
        observer.next(Object.assign({ type: "response" }, response));
        observer.complete();
      });
      channels.request.publish(context2);
      return () => channels.abort.publish();
    })
  };
}
function progress() {
  return {
    onRequest: (evt) => {
      if (evt.adapter !== "xhr") {
        return;
      }
      const xhr = evt.request;
      const context2 = evt.context;
      if ("upload" in xhr && "onprogress" in xhr.upload) {
        xhr.upload.onprogress = handleProgress("upload");
      }
      if ("onprogress" in xhr) {
        xhr.onprogress = handleProgress("download");
      }
      function handleProgress(stage) {
        return (event) => {
          const percent = event.lengthComputable ? event.loaded / event.total * 100 : -1;
          context2.channels.progress.publish({
            stage,
            percent,
            total: event.total,
            loaded: event.loaded,
            lengthComputable: event.lengthComputable
          });
        };
      }
    }
  };
}
var promise = (options = {}) => {
  const PromiseImplementation = options.implementation || Promise;
  if (!PromiseImplementation) {
    throw new Error("`Promise` is not available in global scope, and no implementation was passed");
  }
  return {
    onReturn: (channels, context2) => new PromiseImplementation((resolve, reject) => {
      const cancel = context2.options.cancelToken;
      if (cancel) {
        cancel.promise.then((reason) => {
          channels.abort.publish(reason);
          reject(reason);
        });
      }
      channels.error.subscribe(reject);
      channels.response.subscribe((response) => {
        resolve(options.onlyBody ? response.body : response);
      });
      setTimeout(() => {
        try {
          channels.request.publish(context2);
        } catch (err) {
          reject(err);
        }
      }, 0);
    })
  };
};
var Cancel = class {
  constructor(message) {
    this.__CANCEL__ = true;
    this.message = message;
  }
  toString() {
    return "Cancel".concat(this.message ? ": ".concat(this.message) : "");
  }
};
var _CancelToken = class _CancelToken2 {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise = null;
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    executor((message) => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message);
      resolvePromise(this.reason);
    });
  }
};
_CancelToken.source = () => {
  let cancel;
  const token = new _CancelToken((can) => {
    cancel = can;
  });
  return {
    token,
    cancel
  };
};
var CancelToken = _CancelToken;
var isCancel = (value) => !!(value && (value == null ? void 0 : value.__CANCEL__));
promise.Cancel = Cancel;
promise.CancelToken = CancelToken;
promise.isCancel = isCancel;
var defaultShouldRetry = (err, attempt, options) => {
  if (options.method !== "GET" && options.method !== "HEAD") {
    return false;
  }
  return err.isNetworkError || false;
};
var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
var sharedRetry = (opts) => {
  const maxRetries = opts.maxRetries || 5;
  const retryDelay = opts.retryDelay || getRetryDelay;
  const allowRetry = opts.shouldRetry;
  return {
    onError: (err, context2) => {
      const options = context2.options;
      const max = options.maxRetries || maxRetries;
      const shouldRetry2 = options.shouldRetry || allowRetry;
      const attemptNumber = options.attemptNumber || 0;
      if (isStream(options.body)) {
        return err;
      }
      if (!shouldRetry2(err, attemptNumber, options) || attemptNumber >= max) {
        return err;
      }
      const newContext = Object.assign({}, context2, {
        options: Object.assign({}, options, { attemptNumber: attemptNumber + 1 })
      });
      setTimeout(() => context2.channels.request.publish(newContext), retryDelay(attemptNumber));
      return null;
    }
  };
};
function getRetryDelay(attemptNum) {
  return 100 * Math.pow(2, attemptNum) + Math.random() * 100;
}
var retry = (opts = {}) => sharedRetry({ shouldRetry: defaultShouldRetry, ...opts });
retry.shouldRetry = defaultShouldRetry;
function buildKeepAlive(agent2) {
  return function keepAlive2(config2 = {}) {
    const ms = config2.ms || 1e3;
    const maxFree = config2.maxFree || 256;
    const agentOptions = {
      keepAlive: true,
      keepAliveMsecs: ms,
      maxFreeSockets: maxFree
    };
    return agent2(agentOptions);
  };
}
var keepAlive = buildKeepAlive(agent);

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});

// node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}

// node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable2 = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();

// node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}

// node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}

// node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable3 = new Observable2();
    observable3.source = this;
    observable3.operator = operator;
    return observable3;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable2] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);

// node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});

// node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
function lastValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}

// node_modules/@sanity/client/dist/_chunks/browserMiddleware-heyg-fDk.js
var MAX_ITEMS_IN_ERROR_MESSAGE = 5;
var ClientError = class extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    this.statusCode = 400;
    Object.assign(this, props);
  }
};
var ServerError = class extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    this.statusCode = 500;
    Object.assign(this, props);
  }
};
function extractErrorProps(res) {
  const body = res.body;
  const props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (body.error && body.message) {
    props.message = "".concat(body.error, " - ").concat(body.message);
    return props;
  }
  if (isMutationError(body)) {
    const allItems = body.error.items || [];
    const items = allItems.slice(0, MAX_ITEMS_IN_ERROR_MESSAGE).map((item) => {
      var _a;
      return (_a = item.error) == null ? void 0 : _a.description;
    }).filter(Boolean);
    let itemsStr = items.length ? ":\n- ".concat(items.join("\n- ")) : "";
    if (allItems.length > MAX_ITEMS_IN_ERROR_MESSAGE) {
      itemsStr += "\n...and ".concat(allItems.length - MAX_ITEMS_IN_ERROR_MESSAGE, " more");
    }
    props.message = "".concat(body.error.description).concat(itemsStr);
    props.details = body.error;
    return props;
  }
  if (body.error && body.error.description) {
    props.message = body.error.description;
    props.details = body.error;
    return props;
  }
  props.message = body.error || body.message || httpErrorMessage(res);
  return props;
}
function isMutationError(body) {
  return isPlainObject2(body) && isPlainObject2(body.error) && body.error.type === "mutationError" && typeof body.error.description === "string";
}
function isPlainObject2(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
  const statusMessage = res.statusMessage ? " ".concat(res.statusMessage) : "";
  return "".concat(res.method, "-request to ").concat(res.url, " resulted in HTTP ").concat(res.statusCode).concat(statusMessage);
}
function stringifyBody(body, res) {
  const contentType = (res.headers["content-type"] || "").toLowerCase();
  const isJson = contentType.indexOf("application/json") !== -1;
  return isJson ? JSON.stringify(body, null, 2) : body;
}
var httpError = {
  onResponse: (res) => {
    if (res.statusCode >= 500) {
      throw new ServerError(res);
    } else if (res.statusCode >= 400) {
      throw new ClientError(res);
    }
    return res;
  }
};
var printWarnings = {
  onResponse: (res) => {
    const warn = res.headers["x-sanity-warning"];
    const warnings = Array.isArray(warn) ? warn : [warn];
    warnings.filter(Boolean).forEach((msg) => console.warn(msg));
    return res;
  }
};
function defineHttpRequest(envMiddleware2, {
  maxRetries = 5,
  retryDelay
}) {
  const request = getIt([
    maxRetries > 0 ? retry({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retryDelay,
      // This option is typed incorrectly in get-it.
      maxRetries,
      shouldRetry
    }) : {},
    ...envMiddleware2,
    printWarnings,
    jsonRequest(),
    jsonResponse(),
    progress(),
    httpError,
    observable({ implementation: Observable })
  ]);
  function httpRequest(options, requester2 = request) {
    return requester2({ maxRedirects: 0, ...options });
  }
  httpRequest.defaultRequester = request;
  return httpRequest;
}
function shouldRetry(err, attempt, options) {
  const isSafe = options.method === "GET" || options.method === "HEAD";
  const uri = options.uri || options.url;
  const isQuery = uri.startsWith("/data/query");
  const isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  if ((isSafe || isQuery) && isRetriableResponse)
    return true;
  return retry.shouldRetry(err, attempt, options);
}
function getSelection(sel) {
  if (typeof sel === "string" || Array.isArray(sel)) {
    return { id: sel };
  }
  if (typeof sel === "object" && sel !== null && "query" in sel && typeof sel.query === "string") {
    return "params" in sel && typeof sel.params === "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  }
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join("\n");
  throw new Error("Unknown selection - must be one of:\n\n".concat(selectionOpts));
}
var VALID_ASSET_TYPES = ["image", "file"];
var VALID_INSERT_LOCATIONS = ["before", "after", "replace"];
var dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) {
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
  }
};
var projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id)) {
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
  }
};
var validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1) {
    throw new Error("Invalid asset type: ".concat(type, ". Must be one of ").concat(VALID_ASSET_TYPES.join(", ")));
  }
};
var validateObject = (op, val) => {
  if (val === null || typeof val !== "object" || Array.isArray(val)) {
    throw new Error("".concat(op, "() takes an object of properties"));
  }
};
var validateDocumentId = (op, id) => {
  if (typeof id !== "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes("..")) {
    throw new Error("".concat(op, '(): "').concat(id, '" is not a valid document ID'));
  }
};
var requireDocumentId = (op, doc) => {
  if (!doc._id) {
    throw new Error("".concat(op, '() requires that the document contains an ID ("_id" property)'));
  }
  validateDocumentId(op, doc._id);
};
var validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => '"'.concat(loc, '"')).join(", ");
    throw new Error("".concat(signature, ' takes an "at"-argument which is one of: ').concat(valid));
  }
  if (typeof selector !== "string") {
    throw new Error("".concat(signature, ' takes a "selector"-argument which must be a string'));
  }
  if (!Array.isArray(items)) {
    throw new Error("".concat(signature, ' takes an "items"-argument which must be an array'));
  }
};
var hasDataset = (config2) => {
  if (!config2.dataset) {
    throw new Error("`dataset` must be provided to perform queries");
  }
  return config2.dataset || "";
};
var requestTag = (tag) => {
  if (typeof tag !== "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag)) {
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  }
  return tag;
};
var __accessCheck$6 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$6 = (obj, member, getter) => {
  __accessCheck$6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$6 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$6 = (obj, member, value, setter) => {
  __accessCheck$6(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$5;
var _client2$5;
var BasePatch = class {
  constructor(selection, operations = {}) {
    this.selection = selection;
    this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    validateObject("diffMatchPatch", attrs);
    return this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs)) {
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    }
    this.operations = Object.assign({}, this.operations, { unset: attrs });
    return this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    validateInsert(at, selector, items);
    return this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", "".concat(selector, "[-1]"), items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", "".concat(selector, "[0]"), items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount === "undefined" || deleteCount === -1;
    const startIndex = start < 0 ? start - 1 : start;
    const delCount = delAll ? -1 : Math.max(0, start + deleteCount);
    const delRange = startIndex < 0 && delCount >= 0 ? "" : delCount;
    const rangeSelector = "".concat(selector, "[").concat(startIndex, ":").concat(delRange, "]");
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    this.operations.ifRevisionID = rev;
    return this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    this.operations = {};
    return this;
  }
  _assign(op, props, merge = true) {
    validateObject(op, props);
    this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge && this.operations[op] || {}, props)
    });
    return this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
};
var _ObservablePatch = class _ObservablePatch2 extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd$6(this, _client$5, void 0);
    __privateSet$6(this, _client$5, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _ObservablePatch2(this.selection, { ...this.operations }, __privateGet$6(this, _client$5));
  }
  commit(options) {
    if (!__privateGet$6(this, _client$5)) {
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    }
    const returnFirst = typeof this.selection === "string";
    const opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet$6(this, _client$5).mutate({ patch: this.serialize() }, opts);
  }
};
_client$5 = /* @__PURE__ */ new WeakMap();
var ObservablePatch = _ObservablePatch;
var _Patch = class _Patch2 extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd$6(this, _client2$5, void 0);
    __privateSet$6(this, _client2$5, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _Patch2(this.selection, { ...this.operations }, __privateGet$6(this, _client2$5));
  }
  commit(options) {
    if (!__privateGet$6(this, _client2$5)) {
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    }
    const returnFirst = typeof this.selection === "string";
    const opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet$6(this, _client2$5).mutate({ patch: this.serialize() }, opts);
  }
};
_client2$5 = /* @__PURE__ */ new WeakMap();
var Patch = _Patch;
var __accessCheck$5 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$5 = (obj, member, getter) => {
  __accessCheck$5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$5 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$5 = (obj, member, value, setter) => {
  __accessCheck$5(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$4;
var _client2$4;
var defaultMutateOptions = { returnDocuments: false };
var BaseTransaction = class {
  constructor(operations = [], transactionId) {
    this.operations = operations;
    this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    validateObject("create", doc);
    return this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    validateObject(op, doc);
    requireDocumentId(op, doc);
    return this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    validateObject(op, doc);
    requireDocumentId(op, doc);
    return this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    validateDocumentId("delete", documentId);
    return this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    if (!id) {
      return this.trxId;
    }
    this.trxId = id;
    return this;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    this.operations = [];
    return this;
  }
  _add(mut) {
    this.operations.push(mut);
    return this;
  }
};
var _Transaction = class _Transaction2 extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd$5(this, _client$4, void 0);
    __privateSet$5(this, _client$4, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _Transaction2([...this.operations], __privateGet$5(this, _client$4), this.trxId);
  }
  commit(options) {
    if (!__privateGet$5(this, _client$4)) {
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    }
    return __privateGet$5(this, _client$4).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps === "function";
    const isPatch = typeof patchOrDocumentId !== "string" && patchOrDocumentId instanceof Patch;
    if (isPatch) {
      return this._add({ patch: patchOrDocumentId.serialize() });
    }
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, __privateGet$5(this, _client$4)));
      if (!(patch instanceof Patch)) {
        throw new Error("function passed to `patch()` must return the patch");
      }
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client$4 = /* @__PURE__ */ new WeakMap();
var Transaction = _Transaction;
var _ObservableTransaction = class _ObservableTransaction2 extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd$5(this, _client2$4, void 0);
    __privateSet$5(this, _client2$4, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _ObservableTransaction2([...this.operations], __privateGet$5(this, _client2$4), this.trxId);
  }
  commit(options) {
    if (!__privateGet$5(this, _client2$4)) {
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    }
    return __privateGet$5(this, _client2$4).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps === "function";
    const isPatch = typeof patchOrDocumentId !== "string" && patchOrDocumentId instanceof ObservablePatch;
    if (isPatch) {
      return this._add({ patch: patchOrDocumentId.serialize() });
    }
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, __privateGet$5(this, _client2$4)));
      if (!(patch instanceof ObservablePatch)) {
        throw new Error("function passed to `patch()` must return the patch");
      }
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client2$4 = /* @__PURE__ */ new WeakMap();
var ObservableTransaction = _ObservableTransaction;
var BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
function once(fn) {
  let didCall = false;
  let returnValue;
  return (...args) => {
    if (didCall) {
      return returnValue;
    }
    returnValue = fn(...args);
    didCall = true;
    return returnValue;
  };
}
var createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args) => console.warn(message.join(" "), ...args))
);
var printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]);
var printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]);
var printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  "See ".concat(generateHelpUrl(
    "js-client-browser-token"
  ), " for more information and how to hide this warning.")
]);
var printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  "See ".concat(generateHelpUrl("js-client-api-version"))
]);
var printNoDefaultExport = createWarningPrinter([
  "The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."
]);
var defaultCdnHost = "apicdn.sanity.io";
var defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true
};
var LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];
var isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
var validateApiVersion = function validateApiVersion2(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X") {
    return;
  }
  const apiDate = new Date(apiVersion);
  const apiVersionValid = /^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0;
  if (!apiVersionValid) {
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
  }
};
var validateApiPerspective = function validateApiPerspective2(perspective) {
  switch (perspective) {
    case "previewDrafts":
    case "published":
    case "raw":
      return;
    default:
      throw new TypeError(
        "Invalid API perspective string, expected `published`, `previewDrafts` or `raw`"
      );
  }
};
var initConfig = (config2, prevConfig) => {
  const specifiedConfig = Object.assign({}, prevConfig, config2);
  if (!specifiedConfig.apiVersion) {
    printNoApiVersionSpecifiedWarning();
  }
  const newConfig = Object.assign({}, defaultConfig, specifiedConfig);
  const projectBased = newConfig.useProjectHostname;
  if (typeof Promise === "undefined") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error("No native Promise-implementation found, polyfill needed - see ".concat(helpUrl));
  }
  if (projectBased && !newConfig.projectId) {
    throw new Error("Configuration must contain `projectId`");
  }
  if (typeof newConfig.perspective === "string") {
    validateApiPerspective(newConfig.perspective);
  }
  if ("encodeSourceMapAtPath" in newConfig || "encodeSourceMap" in newConfig || "studioUrl" in newConfig || "logger" in newConfig) {
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client', such as 'encodeSourceMapAtPath', 'encodeSourceMap', 'studioUrl' and 'logger'. Make sure you're using the right import."
    );
  }
  if ("stega" in newConfig && newConfig["stega"] !== void 0 && newConfig["stega"] !== false) {
    throw new Error(
      "It looks like you're using options meant for '@sanity/client/stega'. Make sure you're using the right import. Or set 'stega' in 'createClient' to 'false'."
    );
  }
  const isBrowser = typeof window !== "undefined" && window.location && window.location.hostname;
  const isLocalhost = isBrowser && isLocal(window.location.hostname);
  if (isBrowser && isLocalhost && newConfig.token && newConfig.ignoreBrowserTokenWarning !== true) {
    printBrowserTokenWarning();
  } else if (typeof newConfig.useCdn === "undefined") {
    printCdnWarning();
  }
  if (projectBased) {
    projectId(newConfig.projectId);
  }
  if (newConfig.dataset) {
    dataset(newConfig.dataset);
  }
  if ("requestTagPrefix" in newConfig) {
    newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0;
  }
  newConfig.apiVersion = "".concat(newConfig.apiVersion).replace(/^v/, "");
  newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost;
  newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials;
  validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2);
  const protocol = hostParts[0];
  const host = hostParts[1];
  const cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  if (newConfig.useProjectHostname) {
    newConfig.url = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(host, "/v").concat(newConfig.apiVersion);
    newConfig.cdnUrl = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(cdnHost, "/v").concat(newConfig.apiVersion);
  } else {
    newConfig.url = "".concat(newConfig.apiHost, "/v").concat(newConfig.apiVersion);
    newConfig.cdnUrl = newConfig.url;
  }
  return newConfig;
};
var projectHeader = "X-Sanity-Project-ID";
function requestOptions(config2, overrides = {}) {
  const headers = {};
  const token = overrides.token || config2.token;
  if (token) {
    headers.Authorization = "Bearer ".concat(token);
  }
  if (!overrides.useGlobalApi && !config2.useProjectHostname && config2.projectId) {
    headers[projectHeader] = config2.projectId;
  }
  const withCredentials = Boolean(
    typeof overrides.withCredentials === "undefined" ? config2.token || config2.withCredentials : overrides.withCredentials
  );
  const timeout = typeof overrides.timeout === "undefined" ? config2.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout === "undefined" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config2.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch === "object" && typeof config2.fetch === "object" ? { ...config2.fetch, ...overrides.fetch } : overrides.fetch || config2.fetch
  });
}
var encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams();
  const { tag, ...opts } = options;
  if (tag)
    searchParams.append("tag", tag);
  searchParams.append("query", query);
  for (const [key, value] of Object.entries(params)) {
    searchParams.append("$".concat(key), JSON.stringify(value));
  }
  for (const [key, value] of Object.entries(opts)) {
    if (value)
      searchParams.append(key, "".concat(value));
  }
  return "?".concat(searchParams);
};
var excludeFalsey = (param, defValue) => {
  const value = typeof param === "undefined" ? defValue : param;
  return param === false ? void 0 : value;
};
var getMutationQuery = (options = {}) => {
  return {
    dryRun: options.dryRun,
    returnIds: true,
    returnDocuments: excludeFalsey(options.returnDocuments, true),
    visibility: options.visibility || "sync",
    autoGenerateArrayKeys: options.autoGenerateArrayKeys,
    skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
  };
};
var isResponse = (event) => event.type === "response";
var getBody = (event) => event.body;
var indexBy = (docs, attr) => docs.reduce((indexed, doc) => {
  indexed[attr(doc)] = doc;
  return indexed;
}, /* @__PURE__ */ Object.create(null));
var getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, query, params, options = {}) {
  if ("stega" in options && options["stega"] !== void 0 && options["stega"] !== false) {
    throw new Error(
      "It looks like you're using options meant for '@sanity/client/stega'. Make sure you're using the right import. Or set 'stega' in 'fetch' to 'false'."
    );
  }
  const mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result;
  const { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal !== "undefined",
    ...options
  };
  const reqOpts = typeof cache !== "undefined" || typeof next !== "undefined" ? { ...opts, fetch: { cache, next } } : opts;
  return _dataRequest(client, httpRequest, "query", { query, params }, reqOpts).pipe(map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const options = { uri: _getDataUrl(client, "doc", id), json: true, tag: opts.tag };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = { uri: _getDataUrl(client, "doc", ids.join(",")), json: true, tag: opts.tag };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  requireDocumentId("createIfNotExists", doc);
  return _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  requireDocumentId("createOrReplace", doc);
  return _create(client, httpRequest, doc, "createOrReplace", options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  if (mutations instanceof Patch || mutations instanceof ObservablePatch) {
    mut = { patch: mutations.serialize() };
  } else if (mutations instanceof Transaction || mutations instanceof ObservableTransaction) {
    mut = mutations.serialize();
  } else {
    mut = mutations;
  }
  const muts = Array.isArray(mut) ? mut : [mut];
  const transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate";
  const isQuery = endpoint === "query";
  const strQuery = isMutation ? "" : encodeQueryString(body);
  const useGet = !isMutation && strQuery.length < getQuerySizeLimit;
  const stringQuery = useGet ? strQuery : "";
  const returnFirst = options.returnFirst;
  const { timeout, token, tag, headers } = options;
  const uri = _getDataUrl(client, endpoint, stringQuery);
  const reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers,
    token,
    tag,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    canUseCdn: isQuery,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    filter(isResponse),
    map(getBody),
    map((res) => {
      if (!isMutation) {
        return res;
      }
      const results = res.results || [];
      if (options.returnDocuments) {
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      }
      const key = returnFirst ? "documentId" : "documentIds";
      const ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc };
  const opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
function _requestObservable(client, httpRequest, options) {
  var _a, _b;
  const uri = options.url || options.uri;
  const config2 = client.config();
  const canUseCdn = typeof options.canUseCdn === "undefined" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/") === 0 : options.canUseCdn;
  let useCdn = ((_a = options.useCdn) != null ? _a : config2.useCdn) && canUseCdn;
  const tag = options.tag && config2.requestTagPrefix ? [config2.requestTagPrefix, options.tag].join(".") : options.tag || config2.requestTagPrefix;
  if (tag && options.tag !== null) {
    options.query = { tag: requestTag(tag), ...options.query };
  }
  if (["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/query/") === 0) {
    const resultSourceMap = (_b = options.resultSourceMap) != null ? _b : config2.resultSourceMap;
    if (resultSourceMap !== void 0 && resultSourceMap !== false) {
      options.query = { resultSourceMap, ...options.query };
    }
    const perspective = options.perspective || config2.perspective;
    if (typeof perspective === "string" && perspective !== "raw") {
      validateApiPerspective(perspective);
      options.query = { perspective, ...options.query };
      if (perspective === "previewDrafts" && useCdn) {
        useCdn = false;
        printCdnPreviewDraftsWarning();
      }
    }
  }
  const reqOptions = requestOptions(
    config2,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  );
  const request = new Observable(
    (subscriber) => httpRequest(reqOptions, config2.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  const observable3 = _requestObservable(client, httpRequest, options).pipe(
    filter((event) => event.type === "response"),
    map((event) => event.body)
  );
  return observable3;
}
function _getDataUrl(client, operation, path) {
  const config2 = client.config();
  const catalog = hasDataset(config2);
  const baseUri = "/".concat(operation, "/").concat(catalog);
  const uri = path ? "".concat(baseUri, "/").concat(path) : baseUri;
  return "/data".concat(uri).replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  const base = canUseCdn ? cdnUrl : url;
  return "".concat(base, "/").concat(uri.replace(/^\//, ""));
}
function _withAbortSignal(signal) {
  return (input) => {
    return new Observable((observer) => {
      const abort = () => observer.error(_createAbortError(signal));
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const subscription = input.subscribe(observer);
      signal.addEventListener("abort", abort);
      return () => {
        signal.removeEventListener("abort", abort);
        subscription.unsubscribe();
      };
    });
  };
}
var isDomExceptionSupported = Boolean(globalThis.DOMException);
function _createAbortError(signal) {
  var _a, _b;
  if (isDomExceptionSupported) {
    return new DOMException((_a = signal == null ? void 0 : signal.reason) != null ? _a : "The operation was aborted.", "AbortError");
  }
  const error = new Error((_b = signal == null ? void 0 : signal.reason) != null ? _b : "The operation was aborted.");
  error.name = "AbortError";
  return error;
}
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$4 = (obj, member, getter) => {
  __accessCheck$4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$4 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$4 = (obj, member, value, setter) => {
  __accessCheck$4(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$3;
var _httpRequest$4;
var _client2$3;
var _httpRequest2$4;
var ObservableAssetsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$4(this, _client$3, void 0);
    __privateAdd$4(this, _httpRequest$4, void 0);
    __privateSet$4(this, _client$3, client);
    __privateSet$4(this, _httpRequest$4, httpRequest);
  }
  upload(assetType, body, options) {
    return _upload(__privateGet$4(this, _client$3), __privateGet$4(this, _httpRequest$4), assetType, body, options);
  }
};
_client$3 = /* @__PURE__ */ new WeakMap();
_httpRequest$4 = /* @__PURE__ */ new WeakMap();
var AssetsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$4(this, _client2$3, void 0);
    __privateAdd$4(this, _httpRequest2$4, void 0);
    __privateSet$4(this, _client2$3, client);
    __privateSet$4(this, _httpRequest2$4, httpRequest);
  }
  upload(assetType, body, options) {
    const observable3 = _upload(__privateGet$4(this, _client2$3), __privateGet$4(this, _httpRequest2$4), assetType, body, options);
    return lastValueFrom(
      observable3.pipe(
        filter((event) => event.type === "response"),
        map(
          (event) => event.body.document
        )
      )
    );
  }
};
_client2$3 = /* @__PURE__ */ new WeakMap();
_httpRequest2$4 = /* @__PURE__ */ new WeakMap();
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  if (meta && !meta.length) {
    meta = ["none"];
  }
  const dataset2 = hasDataset(client.config());
  const assetEndpoint = assetType === "image" ? "images" : "files";
  const options = optionsFromFile(opts, body);
  const { tag, label, title, description, creditLine, filename, source } = options;
  const query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  if (source) {
    query.sourceId = source.id;
    query.sourceName = source.name;
    query.sourceUrl = source.url;
  }
  return _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: "/assets/".concat(assetEndpoint, "/").concat(dataset2),
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function optionsFromFile(opts, file) {
  if (typeof File === "undefined" || !(file instanceof File)) {
    return opts;
  }
  return Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => {
  target[prop] = typeof obj[prop] === "undefined" ? defaults2[prop] : obj[prop];
  return target;
}, {});
var pick = (obj, props) => props.reduce((selection, prop) => {
  if (typeof obj[prop] === "undefined") {
    return selection;
  }
  selection[prop] = obj[prop];
  return selection;
}, {});
var MAX_URL_LENGTH = 16e3 - 1200;
var possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "visibility",
  "effectFormat",
  "tag"
];
var defaultOptions2 = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix } = this.config();
  const tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag;
  const options = { ...defaults(opts, defaultOptions2), tag };
  const listenOpts = pick(options, possibleOptions);
  const qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } });
  const uri = "".concat(url).concat(_getDataUrl(this, "listen", qs));
  if (uri.length > MAX_URL_LENGTH) {
    return new Observable((observer) => observer.error(new Error("Query too large for listener")));
  }
  const listenFor = options.events ? options.events : ["mutation"];
  const shouldEmitReconnect = listenFor.indexOf("reconnect") !== -1;
  const esOptions = {};
  if (token || withCredentials) {
    esOptions.withCredentials = true;
  }
  if (token) {
    esOptions.headers = {
      Authorization: "Bearer ".concat(token)
    };
  }
  return new Observable((observer) => {
    let es;
    getEventSource().then((eventSource) => {
      es = eventSource;
    }).catch((reason) => {
      observer.error(reason);
      stop();
    });
    let reconnectTimer;
    let stopped = false;
    function onError() {
      if (stopped) {
        return;
      }
      emitReconnect();
      if (stopped) {
        return;
      }
      if (es.readyState === es.CLOSED) {
        unsubscribe();
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(open, 100);
      }
    }
    function onChannelError(err) {
      observer.error(cooerceError(err));
    }
    function onMessage(evt) {
      const event = parseEvent(evt);
      return event instanceof Error ? observer.error(event) : observer.next(event);
    }
    function onDisconnect() {
      stopped = true;
      unsubscribe();
      observer.complete();
    }
    function unsubscribe() {
      if (!es)
        return;
      es.removeEventListener("error", onError);
      es.removeEventListener("channelError", onChannelError);
      es.removeEventListener("disconnect", onDisconnect);
      listenFor.forEach((type) => es.removeEventListener(type, onMessage));
      es.close();
    }
    function emitReconnect() {
      if (shouldEmitReconnect) {
        observer.next({ type: "reconnect" });
      }
    }
    async function getEventSource() {
      const { default: EventSource } = await import("/build/_shared/browser-ZC4XKKKZ.js");
      const evs = new EventSource(uri, esOptions);
      evs.addEventListener("error", onError);
      evs.addEventListener("channelError", onChannelError);
      evs.addEventListener("disconnect", onDisconnect);
      listenFor.forEach((type) => evs.addEventListener(type, onMessage));
      return evs;
    }
    function open() {
      getEventSource().then((eventSource) => {
        es = eventSource;
      }).catch((reason) => {
        observer.error(reason);
        stop();
      });
    }
    function stop() {
      stopped = true;
      unsubscribe();
    }
    return stop;
  });
}
function parseEvent(event) {
  try {
    const data = event.data && JSON.parse(event.data) || {};
    return Object.assign({ type: event.type }, data);
  } catch (err) {
    return err;
  }
}
function cooerceError(err) {
  if (err instanceof Error) {
    return err;
  }
  const evt = parseEvent(err);
  return evt instanceof Error ? evt : new Error(extractErrorMessage(evt));
}
function extractErrorMessage(err) {
  if (!err.error) {
    return err.message || "Unknown listener error";
  }
  if (err.error.description) {
    return err.error.description;
  }
  return typeof err.error === "string" ? err.error : JSON.stringify(err.error, null, 2);
}
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => {
  __accessCheck$3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$2;
var _httpRequest$3;
var _client2$2;
var _httpRequest2$3;
var ObservableDatasetsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$3(this, _client$2, void 0);
    __privateAdd$3(this, _httpRequest$3, void 0);
    __privateSet$3(this, _client$2, client);
    __privateSet$3(this, _httpRequest$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), {
      uri: "/datasets",
      tag: null
    });
  }
};
_client$2 = /* @__PURE__ */ new WeakMap();
_httpRequest$3 = /* @__PURE__ */ new WeakMap();
var DatasetsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$3(this, _client2$2, void 0);
    __privateAdd$3(this, _httpRequest2$3, void 0);
    __privateSet$3(this, _client2$2, client);
    __privateSet$3(this, _httpRequest2$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return lastValueFrom(
      _modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PUT", name, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return lastValueFrom(
      _modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PATCH", name, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return lastValueFrom(_modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return lastValueFrom(
      _request(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), { uri: "/datasets", tag: null })
    );
  }
};
_client2$2 = /* @__PURE__ */ new WeakMap();
_httpRequest2$3 = /* @__PURE__ */ new WeakMap();
function _modify(client, httpRequest, method, name, options) {
  dataset(name);
  return _request(client, httpRequest, {
    method,
    uri: "/datasets/".concat(name),
    body: options,
    tag: null
  });
}
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
  __accessCheck$2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$1;
var _httpRequest$2;
var _client2$1;
var _httpRequest2$2;
var ObservableProjectsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$2(this, _client$1, void 0);
    __privateAdd$2(this, _httpRequest$2, void 0);
    __privateSet$2(this, _client$1, client);
    __privateSet$2(this, _httpRequest$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), { uri: "/projects/".concat(projectId2) });
  }
};
_client$1 = /* @__PURE__ */ new WeakMap();
_httpRequest$2 = /* @__PURE__ */ new WeakMap();
var ProjectsClient = class {
  constructor(client, httpRequest) {
    __privateAdd$2(this, _client2$1, void 0);
    __privateAdd$2(this, _httpRequest2$2, void 0);
    __privateSet$2(this, _client2$1, client);
    __privateSet$2(this, _httpRequest2$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return lastValueFrom(_request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return lastValueFrom(
      _request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), { uri: "/projects/".concat(projectId2) })
    );
  }
};
_client2$1 = /* @__PURE__ */ new WeakMap();
_httpRequest2$2 = /* @__PURE__ */ new WeakMap();
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$1(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
  __accessCheck$1(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client;
var _httpRequest$1;
var _client2;
var _httpRequest2$1;
var ObservableUsersClient = class {
  constructor(client, httpRequest) {
    __privateAdd$1(this, _client, void 0);
    __privateAdd$1(this, _httpRequest$1, void 0);
    __privateSet$1(this, _client, client);
    __privateSet$1(this, _httpRequest$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      __privateGet$1(this, _client),
      __privateGet$1(this, _httpRequest$1),
      { uri: "/users/".concat(id) }
    );
  }
};
_client = /* @__PURE__ */ new WeakMap();
_httpRequest$1 = /* @__PURE__ */ new WeakMap();
var UsersClient = class {
  constructor(client, httpRequest) {
    __privateAdd$1(this, _client2, void 0);
    __privateAdd$1(this, _httpRequest2$1, void 0);
    __privateSet$1(this, _client2, client);
    __privateSet$1(this, _httpRequest2$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return lastValueFrom(
      _request(__privateGet$1(this, _client2), __privateGet$1(this, _httpRequest2$1), {
        uri: "/users/".concat(id)
      })
    );
  }
};
_client2 = /* @__PURE__ */ new WeakMap();
_httpRequest2$1 = /* @__PURE__ */ new WeakMap();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _clientConfig;
var _httpRequest;
var _clientConfig2;
var _httpRequest2;
var _ObservableSanityClient = class _ObservableSanityClient2 {
  constructor(httpRequest, config2 = defaultConfig) {
    __privateAdd2(this, _clientConfig, void 0);
    __privateAdd2(this, _httpRequest, void 0);
    this.listen = _listen;
    this.config(config2);
    __privateSet2(this, _httpRequest, httpRequest);
    this.assets = new ObservableAssetsClient(this, __privateGet2(this, _httpRequest));
    this.datasets = new ObservableDatasetsClient(this, __privateGet2(this, _httpRequest));
    this.projects = new ObservableProjectsClient(this, __privateGet2(this, _httpRequest));
    this.users = new ObservableUsersClient(this, __privateGet2(this, _httpRequest));
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _ObservableSanityClient2(__privateGet2(this, _httpRequest), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) {
      return { ...__privateGet2(this, _clientConfig) };
    }
    if (__privateGet2(this, _clientConfig) && __privateGet2(this, _clientConfig).allowReconfigure === false) {
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    }
    __privateSet2(this, _clientConfig, initConfig(newConfig, __privateGet2(this, _clientConfig) || {}));
    return this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    return new _ObservableSanityClient2(__privateGet2(this, _httpRequest), { ...this.config(), ...newConfig });
  }
  fetch(query, params, options = {}) {
    return _fetch(this, __privateGet2(this, _httpRequest), query, params, options);
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, __privateGet2(this, _httpRequest), id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, __privateGet2(this, _httpRequest), ids, options);
  }
  create(document2, options) {
    return _create(this, __privateGet2(this, _httpRequest), document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExists(this, __privateGet2(this, _httpRequest), document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplace(this, __privateGet2(this, _httpRequest), document2, options);
  }
  delete(selection, options) {
    return _delete(this, __privateGet2(this, _httpRequest), selection, options);
  }
  mutate(operations, options) {
    return _mutate(this, __privateGet2(this, _httpRequest), operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, __privateGet2(this, _httpRequest), options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig = /* @__PURE__ */ new WeakMap();
_httpRequest = /* @__PURE__ */ new WeakMap();
var ObservableSanityClient = _ObservableSanityClient;
var _SanityClient = class _SanityClient2 {
  constructor(httpRequest, config2 = defaultConfig) {
    __privateAdd2(this, _clientConfig2, void 0);
    __privateAdd2(this, _httpRequest2, void 0);
    this.listen = _listen;
    this.config(config2);
    __privateSet2(this, _httpRequest2, httpRequest);
    this.assets = new AssetsClient(this, __privateGet2(this, _httpRequest2));
    this.datasets = new DatasetsClient(this, __privateGet2(this, _httpRequest2));
    this.projects = new ProjectsClient(this, __privateGet2(this, _httpRequest2));
    this.users = new UsersClient(this, __privateGet2(this, _httpRequest2));
    this.observable = new ObservableSanityClient(httpRequest, config2);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _SanityClient2(__privateGet2(this, _httpRequest2), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) {
      return { ...__privateGet2(this, _clientConfig2) };
    }
    if (__privateGet2(this, _clientConfig2) && __privateGet2(this, _clientConfig2).allowReconfigure === false) {
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    }
    if (this.observable) {
      this.observable.config(newConfig);
    }
    __privateSet2(this, _clientConfig2, initConfig(newConfig, __privateGet2(this, _clientConfig2) || {}));
    return this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    return new _SanityClient2(__privateGet2(this, _httpRequest2), { ...this.config(), ...newConfig });
  }
  fetch(query, params, options = {}) {
    return lastValueFrom(_fetch(this, __privateGet2(this, _httpRequest2), query, params, options));
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return lastValueFrom(_getDocument(this, __privateGet2(this, _httpRequest2), id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return lastValueFrom(_getDocuments(this, __privateGet2(this, _httpRequest2), ids, options));
  }
  create(document2, options) {
    return lastValueFrom(
      _create(this, __privateGet2(this, _httpRequest2), document2, "create", options)
    );
  }
  createIfNotExists(document2, options) {
    return lastValueFrom(
      _createIfNotExists(this, __privateGet2(this, _httpRequest2), document2, options)
    );
  }
  createOrReplace(document2, options) {
    return lastValueFrom(
      _createOrReplace(this, __privateGet2(this, _httpRequest2), document2, options)
    );
  }
  delete(selection, options) {
    return lastValueFrom(_delete(this, __privateGet2(this, _httpRequest2), selection, options));
  }
  mutate(operations, options) {
    return lastValueFrom(_mutate(this, __privateGet2(this, _httpRequest2), operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return lastValueFrom(_request(this, __privateGet2(this, _httpRequest2), options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return lastValueFrom(_dataRequest(this, __privateGet2(this, _httpRequest2), endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig2 = /* @__PURE__ */ new WeakMap();
_httpRequest2 = /* @__PURE__ */ new WeakMap();
var SanityClient = _SanityClient;
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
  const httpRequest = defineHttpRequest(envMiddleware2, {});
  const requester2 = httpRequest.defaultRequester;
  const createClient2 = (config2) => new ClassConstructor(
    defineHttpRequest(envMiddleware2, {
      maxRetries: config2.maxRetries,
      retryDelay: config2.retryDelay
    }),
    config2
  );
  return { requester: requester2, createClient: createClient2 };
}
var envMiddleware = [];

// node_modules/@sanity/client/dist/index.browser.js
function defineDeprecatedCreateClient(createClient2) {
  return function deprecatedCreateClient2(config2) {
    printNoDefaultExport();
    return createClient2(config2);
  };
}
var exp = defineCreateClientExports(envMiddleware, SanityClient);
var requester = exp.requester;
var createClient = exp.createClient;
var deprecatedCreateClient = defineDeprecatedCreateClient(createClient);

// src/lib/sanityClient.js
var sanityClient_default = deprecatedCreateClient({
  projectId: "h0cg7oh0",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: true
});

// src/components/Beers/Beers.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Beers() {
  const [data, setData] = import_react.default.useState(null);
  import_react.default.useEffect(() => {
    sanityClient_default.fetch(`*[_type == "home"]{titulo, beer, experience}`).then((result) => setData(result)).catch((error) => console.error("Erro ao buscar dados do Sanity:", error));
  }, []);
  const sanitizeImage = (url) => {
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1];
    const filenameParts = filename.split("-");
    const extension = filenameParts[filenameParts.length - 1];
    const processedUrl = url.replace("image-", "").replace(`-${extension}`, `.${extension}`);
    return "https://cdn.sanity.io/images/h0cg7oh0/production/" + processedUrl;
  };
  if (data) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "beers container mr-auto ml-auto pt-10 pb-20", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "beers-header flex justify-center items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "block-text w-6/12", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-7xl font-bold text-yellow-500 mb-2", children: item.beer.name }, void 0, false, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 32,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-2xl text-black", children: item.beer.description }, void 0, false, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 33,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 31,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "block-image", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: sanitizeImage(item.beer.image.asset._ref), alt: "Imagem da cerveja" }, void 0, false, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 37,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 36,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 30,
        columnNumber: 25
      }, this),
      item.beer.beers && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "beers-content", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "beers-filter bg-black py-12 px-28", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-2xl mb-7 font-semibold text-yellow-500", children: "CONHE\xC7A NOSSAS BEBIDAS" }, void 0, false, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 44,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "beers", id: "beersSelect", className: "w-6/12 py-4 px-7 cursor-pointer", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "Mostrar todas" }, void 0, false, {
              fileName: "src/components/Beers/Beers.tsx",
              lineNumber: 46,
              columnNumber: 41
            }, this),
            item.beer.beers.map((i, index2) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i.title, children: i.title }, index2, false, {
              fileName: "src/components/Beers/Beers.tsx",
              lineNumber: 48,
              columnNumber: 45
            }, this))
          ] }, void 0, true, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 45,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 43,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "beers-items grid grid-cols-3", children: item.beer.beers.map((i, index2) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "bg-yellow-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "0", className: "flex flex-col justify-center items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: sanitizeImage(i.image.asset._ref), alt: "Imagem" }, void 0, false, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 57,
            columnNumber: 49
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-2xl font-bold text-white text-center", children: i.title }, void 0, false, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 58,
            columnNumber: 49
          }, this)
        ] }, void 0, true, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 56,
          columnNumber: 45
        }, this) }, index2, false, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 55,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 53,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 42,
        columnNumber: 29
      }, this)
    ] }, index, true, {
      fileName: "src/components/Beers/Beers.tsx",
      lineNumber: 29,
      columnNumber: 21
    }, this)) }, void 0, false, {
      fileName: "src/components/Beers/Beers.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, this);
  } else {
    return null;
  }
}

// app/routes/_index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1706309372282.264";
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("section", { className: "bg-black", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-8xl font-bold text-white text-center py-10", children: "DRINK BEER" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Beers, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
/*! Bundled license information:

is-plain-object/dist/is-plain-object.mjs:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=/build/routes/_index-LB57SOWL.js.map
