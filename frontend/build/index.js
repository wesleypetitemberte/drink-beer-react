var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-SU52BYR6.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});

// src/components/Beers/Beers.tsx
import React from "react";

// src/lib/sanityClient.js
import createClient from "@sanity/client";
var sanityClient_default = createClient({
  projectId: "h0cg7oh0",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: !0
});

// src/components/Beers/Beers.tsx
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function Beers() {
  let [data, setData] = React.useState(null);
  React.useEffect(() => {
    sanityClient_default.fetch('*[_type == "home"]{titulo, beer, experience}').then((result) => setData(result)).catch((error) => console.error("Erro ao buscar dados do Sanity:", error));
  }, []);
  let sanitizeImage = (url) => {
    let urlParts = url.split("/"), filenameParts = urlParts[urlParts.length - 1].split("-"), extension = filenameParts[filenameParts.length - 1];
    return "https://cdn.sanity.io/images/h0cg7oh0/production/" + url.replace("image-", "").replace(`-${extension}`, `.${extension}`);
  };
  return data ? /* @__PURE__ */ jsxDEV3(Fragment, { children: data.map((item, index) => /* @__PURE__ */ jsxDEV3("section", { className: "beers container mr-auto ml-auto pt-10 pb-20", children: [
    /* @__PURE__ */ jsxDEV3("div", { className: "beers-header flex justify-center items-center", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "block-text w-6/12", children: [
        /* @__PURE__ */ jsxDEV3("h2", { className: "text-7xl font-bold text-yellow-500 mb-2", children: item.beer.name }, void 0, !1, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 32,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV3("p", { className: "text-2xl text-black", children: item.beer.description }, void 0, !1, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 33,
          columnNumber: 33
        }, this)
      ] }, void 0, !0, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 31,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "block-image", children: /* @__PURE__ */ jsxDEV3("img", { src: sanitizeImage(item.beer.image.asset._ref), alt: "Imagem da cerveja" }, void 0, !1, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 37,
        columnNumber: 33
      }, this) }, void 0, !1, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 36,
        columnNumber: 29
      }, this)
    ] }, void 0, !0, {
      fileName: "src/components/Beers/Beers.tsx",
      lineNumber: 30,
      columnNumber: 25
    }, this),
    item.beer.beers && /* @__PURE__ */ jsxDEV3("div", { className: "beers-content", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "beers-filter bg-black py-12 px-28", children: [
        /* @__PURE__ */ jsxDEV3("h3", { className: "text-2xl mb-7 font-semibold text-yellow-500", children: "CONHE\xC7A NOSSAS BEBIDAS" }, void 0, !1, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 44,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ jsxDEV3("select", { name: "beers", id: "beersSelect", className: "w-6/12 py-4 px-7 cursor-pointer", children: [
          /* @__PURE__ */ jsxDEV3("option", { value: "all", children: "Mostrar todas" }, void 0, !1, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 46,
            columnNumber: 41
          }, this),
          item.beer.beers.map((i, index2) => /* @__PURE__ */ jsxDEV3("option", { value: i.title, children: i.title }, index2, !1, {
            fileName: "src/components/Beers/Beers.tsx",
            lineNumber: 48,
            columnNumber: 45
          }, this))
        ] }, void 0, !0, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 45,
          columnNumber: 37
        }, this)
      ] }, void 0, !0, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 43,
        columnNumber: 33
      }, this),
      /* @__PURE__ */ jsxDEV3("ul", { className: "beers-items grid grid-cols-3", children: item.beer.beers.map((i, index2) => /* @__PURE__ */ jsxDEV3("li", { className: "bg-yellow-500", children: /* @__PURE__ */ jsxDEV3("a", { href: "0", className: "flex flex-col justify-center items-center", children: [
        /* @__PURE__ */ jsxDEV3("img", { src: sanitizeImage(i.image.asset._ref), alt: "Imagem" }, void 0, !1, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 57,
          columnNumber: 49
        }, this),
        /* @__PURE__ */ jsxDEV3("h4", { className: "text-2xl font-bold text-white text-center", children: i.title }, void 0, !1, {
          fileName: "src/components/Beers/Beers.tsx",
          lineNumber: 58,
          columnNumber: 49
        }, this)
      ] }, void 0, !0, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 56,
        columnNumber: 45
      }, this) }, index2, !1, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 55,
        columnNumber: 41
      }, this)) }, void 0, !1, {
        fileName: "src/components/Beers/Beers.tsx",
        lineNumber: 53,
        columnNumber: 33
      }, this)
    ] }, void 0, !0, {
      fileName: "src/components/Beers/Beers.tsx",
      lineNumber: 42,
      columnNumber: 29
    }, this)
  ] }, index, !0, {
    fileName: "src/components/Beers/Beers.tsx",
    lineNumber: 29,
    columnNumber: 21
  }, this)) }, void 0, !1, {
    fileName: "src/components/Beers/Beers.tsx",
    lineNumber: 27,
    columnNumber: 13
  }, this) : null;
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV4("main", { children: [
    /* @__PURE__ */ jsxDEV4("section", { className: "bg-black", children: /* @__PURE__ */ jsxDEV4("h1", { className: "text-8xl font-bold text-white text-center py-10", children: "DRINK BEER" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Beers, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-4ZMM2Q4B.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-Q32ZPR6D.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-KRLOMQRZ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-HX3C2R6O.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-LB57SOWL.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "44cd68a2", hmr: { runtime: "/build/_shared/chunk-KRLOMQRZ.js", timestamp: 1706309624577 }, url: "/build/manifest-44CD68A2.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
