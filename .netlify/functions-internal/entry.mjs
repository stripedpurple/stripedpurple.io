import * as adapter from "@astrojs/netlify/netlify-functions.js";
import { escape } from "html-escaper";
/* empty css                        */ import "mime";
import "kleur/colors";
import "string-width";
import "path-browserify";
import { compile } from "path-to-regexp";

const ASTRO_VERSION = "1.0.6";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error(
      "Deprecated: Astro.fetchContent() has been replaced with Astro.glob()."
    );
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(
        `Astro.glob(${JSON.stringify(globValue())}) - no matches found.`
      );
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce(
        (u, segment) => new URL(segment, u),
        referenceURL
      ).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    },
  };
}

const escapeHTML = escape;
class HTMLString extends String {}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id,
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id,
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
};
function serializeArray(value) {
  return value.map((v) => convertToSerializedForm(v));
}
function serializeObject(value) {
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v)];
    })
  );
}
function convertToSerializedForm(value) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props) {
  return JSON.stringify(serializeObject(props));
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function") item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name]) push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(
  HydrationDirectivesRaw.map((n) => `client:${n}`)
);
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" },
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (
            extracted.hydration.directive === "media" &&
            typeof extracted.hydration.value !== "string"
          ) {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId,
    },
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(componentUrl);
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(
      renderer.clientEntrypoint
    );
    island.props["props"] = escapeHTML(serializeProps(props));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  island.props["before-hydration-url"] = await result.resolve(
    "astro:scripts/before-hydration.js"
  );
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || "",
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=a=>{const e=async()=>{await(await a())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()};`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}};`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=a=>{(async()=>await(await a())())()};`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(i,c,n)=>{const r=async()=>{await(await i())()};let s=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){s.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];s.observe(t)}};`;

var astro_island_prebuilt_default = `var a;{const l={0:t=>t,1:t=>JSON.parse(t,n),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,n)),5:t=>new Set(JSON.parse(t,n)),6:t=>BigInt(t),7:t=>new URL(t)},n=(t,r)=>{if(t===""||!Array.isArray(r))return r;const[s,i]=r;return s in l?l[s](i):void 0};customElements.get("astro-island")||customElements.define("astro-island",(a=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement?.closest("astro-island[ssr]"))return;const r=this.querySelectorAll("astro-slot"),s={},i=this.querySelectorAll("template[data-astro-template]");for(const e of i)!e.closest(this.tagName)?.isSameNode(this)||(s[e.getAttribute("data-astro-template")||"default"]=e.innerHTML,e.remove());for(const e of r)!e.closest(this.tagName)?.isSameNode(this)||(s[e.getAttribute("name")||"default"]=e.innerHTML);const o=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),n):{};this.hydrator(this)(this.Component,o,s,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((r,s)=>{s.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate),await import(this.getAttribute("before-hydration-url"));const r=JSON.parse(this.getAttribute("opts"));Astro[this.getAttribute("client")](async()=>{const s=this.getAttribute("renderer-url"),[i,{default:o}]=await Promise.all([import(this.getAttribute("component-url")),s?import(s):()=>()=>{}]),e=this.getAttribute("component-export")||"default";if(!e.includes("."))this.Component=i[e];else{this.Component=i;for(const c of e.split("."))this.Component=this.Component[c]}return this.hydrator=o,this.hydrate},r,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},a.observedAttributes=["props"],a))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return (result._metadata.hasHydrationScript = true);
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default,
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${
        getDirectiveScriptText(directive) + astro_island_prebuilt_default
      }<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript =
        hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript =
        hydration &&
        determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript
        ? "both"
        : needsDirectiveScript
        ? "directive"
        : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (
    ((_a = Object.assign(
      { BASE_URL: "/", MODE: "production", DEV: false, PROD: true },
      { _: process.env._ }
    )) == null
      ? void 0
      : _a.DEV) &&
    props != null
  ) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return (
    typeof obj === "object" &&
    Object.prototype.toString.call(obj) === "[object AstroComponent]"
  );
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let html = "";
  for await (const chunk of renderAstroComponent(Component)) {
    html += stringifyChunk(result, chunk);
  }
  return html;
}
async function renderToIterable(
  result,
  componentFactory,
  displayName,
  props,
  children
) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0);
  else if (
    child instanceof AstroComponent ||
    Object.prototype.toString.call(child) === "[object AstroComponent]"
  ) {
    yield* renderAstroComponent(child);
  } else if (typeof child === "object" && Symbol.asyncIterator in child) {
    yield* child;
  } else {
    yield child;
  }
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        content += stringifyChunk(result, chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(content);
  }
  return fallback;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames =
  /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes =
  /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes =
  /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) =>
  k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
    if (/[^\w]|\s/.test(match)) return "";
    return index === 0 ? match : match.toUpperCase();
  });
const toAttributeString = (value, shouldEscape = true) =>
  shouldEscape
    ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;")
    : value;
const kebab = (k) =>
  k.toLowerCase() === k
    ? k
    : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${kebab(k)}:${v}`)
    .join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (
    key === "style" &&
    !(value instanceof HTMLString) &&
    typeof value === "object"
  ) {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (
    value === true &&
    (key.startsWith("data-") || htmlBooleanAttributes.test(key))
  ) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(
      ` ${key}="${toAttributeString(value, shouldEscape)}"`
    );
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(
  name,
  { props: _props, children = "" },
  shouldEscape = true
) {
  const {
    lang: _,
    "data-astro-id": astroId,
    "define:vars": defineVars,
    ...props
  } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(
    props,
    shouldEscape
  )}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return (
    typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component)
  );
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(
      result,
      slots == null ? void 0 : slots.default
    )}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName) return definedName;
  const assignedName = constructor.name
    .replace(/^HTML|Element$/g, "")
    .replace(/[A-Z]/g, "-$&")
    .toLowerCase()
    .replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/vue",
        "@astrojs/svelte",
      ];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(
  result,
  displayName,
  Component,
  _props,
  slots = {}
) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(
        result,
        slots == null ? void 0 : slots.default
      );
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const children2 = {};
      if (slots) {
        await Promise.all(
          Object.entries(slots).map(([key, value]) =>
            renderSlot(result, value).then((output) => {
              children2[key] = output;
            })
          )
        );
      }
      const html2 = Component.render({ slots: children2 });
      return markHTMLString(html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(
          result,
          Component,
          displayName,
          _props,
          slots
        );
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (
    Array.isArray(renderers) &&
    renderers.length === 0 &&
    typeof Component !== "string" &&
    !componentIsHTMLElement(Component)
  ) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(
      probableRendererNames.map((r) => "`" + r + "`")
    )}?`;
    throw new Error(message);
  }
  const children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(([key, value]) =>
        renderSlot(result, value).then((output) => {
          children[key] = output;
        })
      )
    );
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (
      !renderer &&
      typeof HTMLElement === "function" &&
      componentIsHTMLElement(Component)
    ) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName)
        ? rendererAliases.get(passedName)
        : passedName;
      renderer = renderers.find(
        ({ name }) =>
          name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname =
        (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${
        metadata.displayName
      } client:only="${probableRendererNames
        .map((r) => r.replace("@astrojs/", ""))
        .join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) =>
        probableRendererNames.includes(r.name)
      );
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${
          plural ? "s" : ""
        } configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${
          metadata.displayName
        }.

Did you mean to enable ${formatList(
          probableRendererNames.map((r) => "`" + r + "`")
        )}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (
    renderer &&
    !renderer.clientEntrypoint &&
    renderer.name !== "@astrojs/lit" &&
    metadata.hydrate
  ) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(
        props
      )}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component)
          ? `/>`
          : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(props)}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (
          !html.includes(
            key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`
          )
        ) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template =
    unrenderedSlots.length > 0
      ? unrenderedSlots
          .map(
            (key) =>
              `<template data-astro-template${
                key !== "default" ? `="${key}"` : ""
              }>${children[key]}</template>`
          )
          .join("")
      : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return (
    index ===
    all.findIndex(
      (i) => JSON.stringify(i.props) === props && i.children == children
    )
  );
};
const alreadyHeadRenderedResults = /* @__PURE__ */ new WeakSet();
function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles)
    .filter(uniqueElements)
    .map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts)
    .filter(uniqueElements)
    .map((script, i) => {
      return renderElement$1("script", script, false);
    });
  const links = Array.from(result.links)
    .filter(uniqueElements)
    .map((link) => renderElement$1("link", link, false));
  return markHTMLString(
    links.join("\n") + styles.join("\n") + scripts.join("\n")
  );
}
async function* maybeRenderHead(result) {
  if (alreadyHeadRenderedResults.has(result)) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" &&
  Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) =>
  str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string") return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child)) return;
    if (!("slot" in child.props)) return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children
      .map((child) => {
        if (!isVNode(child)) return child;
        if (!("slot" in child.props)) return child;
        const name = toSlotName(child.props.slot);
        if (Array.isArray(slots[name])) {
          slots[name].push(child);
        } else {
          slots[name] = [child];
          slots[name]["$$slot"] = true;
        }
        delete child.props.slot;
        return Empty;
      })
      .filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string") return markHTMLString(child);
  if (Array.isArray(child)) return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props)) return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {},
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case !vnode && vnode !== 0:
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (
            key === "children" ||
            (value && typeof value === "object" && value["$$slot"])
          ) {
            slots[key === "children" ? "default" : key] = () =>
              renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(
          await renderToString(result, vnode.type, props, slots)
        );
      }
      case !vnode.type && vnode.type !== 0:
        return "";
      case typeof vnode.type === "string" &&
        vnode.type !== ClientOnlyPlaceholder:
        return markHTMLString(
          await renderElement(result, vnode.type, vnode.props ?? {})
        );
    }
    if (vnode.type) {
      let extractSlots2 = function (child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [
            ...(_slots[child.props.slot] ?? []),
            child,
          ];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (
        typeof vnode.type === "function" &&
        !skipAstroJSXCheck.has(vnode.type)
      ) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: [],
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0) return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let body = "";
        for await (const chunk of output) {
          let html = stringifyChunk(result, chunk);
          body += html;
        }
        return markHTMLString(body);
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag)
        ? `/>`
        : `>${
            children == null ? "" : await renderJSX(result, children)
          }</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {}
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError =
      msg.includes("Warning: Invalid hook call.") &&
      msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError) return;
  }
}

const slotName = (str) =>
  str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(
  Component,
  props,
  { default: children = null, ...slotted } = {}
) {
  if (typeof Component !== "function") return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {}
  return false;
}
async function renderToStaticMarkup(
  Component,
  props = {},
  { default: children = null, ...slotted } = {}
) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(
    result,
    createVNode(Component, { ...props, ...slots, children })
  );
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup,
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) =>
  __freeze(
    __defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) })
  );
var _a;
const $$metadata$8 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/navbar.astro",
  {
    modules: [],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$8 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/navbar.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Navbar;
  const STYLES = [];
  for (const STYLE of STYLES) $$result.styles.add(STYLE);
  return renderTemplate(
    _a ||
      (_a = __template([
        "",
        `<nav class="flex justify-center items-center gap-6 px-8 sm:px-16 py-8 text-lg font-medium m-0 w-full z-20 absolute top-0 astro-UGHSZ2GM" id="navbar">
    <a href="" class="link astro-UGHSZ2GM">Home</a>
    <a href="" class="link astro-UGHSZ2GM">What I do</a>
    <a href="" class="link astro-UGHSZ2GM">test</a>
    <a href="" class="link astro-UGHSZ2GM">test</a>
    <a href="#footer" class="link astro-UGHSZ2GM">contact</a>
</nav>



<script defer>
    window.addEventListener('load',() => {
    const obserables = document.getElementById('scrollTo')
    const navbar = document.getElementById('navbar')
    const io = new IntersectionObserver((entries)=>{

        console.log(entries);
        entries.forEach(entry => {
          if(!entry.isIntersecting){
             navbar.classList.add('backdrop-blur-lg','fixed')
             navbar.classList.remove('top-0', 'absolute')
          } else {
            navbar.classList.remove('backdrop-blur-lg','fixed')
            navbar.classList.add('top-0', 'absolute')
          }
      }, {threshold: 0})
  });


  io.observe(obserables)
})
<\/script>`,
      ])),
    maybeRenderHead($$result)
  );
});

const $$file$8 =
  "/Users/austin/git/stripedpurple.io/src/components/home/navbar.astro";
const $$url$8 = undefined;

const $$module1$3 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$8,
      default: $$Navbar,
      file: $$file$8,
      url: $$url$8,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$7 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/layouts/main.astro",
  {
    modules: [
      {
        module: $$module1$3,
        specifier: "../components/home/navbar.astro",
        assert: {},
      },
    ],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$7 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/layouts/main.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Main;
  return renderTemplate`<html lang="en" class="motion-safe:scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
${renderHead($$result)}</head>
<body class="bg-slate-900 text-white">
    <div class="relative">
        <a href="#main" class="focus:outline-none focus:ring-2  focus:ring-white p-4 bg-pink-600 text-center text-2xl -translate-y-full fixed focus:translate-y-0 w-full motion-safe:transition-all duration-200 z-50">Skip to main content</a>
        ${renderComponent($$result, "Navbar", $$Navbar, {})}
        <main id="main" class="h-screen overflow-auto motion-safe:scroll-smooth relative">
            ${renderSlot($$result, $$slots["default"])}
        </main>
    </div>
</body></html>`;
});

const $$file$7 = "/Users/austin/git/stripedpurple.io/src/layouts/main.astro";
const $$url$7 = undefined;

const $$module1$2 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$7,
      default: $$Main,
      file: $$file$7,
      url: $$url$7,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const getClasses = (classes = {}) => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");
};

const $$module1$1 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      getClasses,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$6 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/gradiantTitle.astro",
  {
    modules: [
      { module: $$module1$1, specifier: "../../untils/getClasses", assert: {} },
    ],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$6 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/gradiantTitle.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$GradiantTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$GradiantTitle;
  const {
    fromColor = "indigo",
    toColor = "pink",
    viaColor = "",
    size = "2xl",
    direction = "br",
    as = "h1",
  } = Astro2.props;
  const directionClass = getClasses({
    "bg-gradient-to-t": direction === "t",
    "bg-gradient-to-tr": direction === "tr",
    "bg-gradient-to-r": direction === "r",
    "bg-gradient-to-br": direction === "br",
    "bg-gradient-to-b": direction === "b",
    "bg-gradient-to-bl": direction === "bl",
    "bg-gradient-to-l": direction === "l",
    "bg-gradient-to-tl": direction === "tl",
  });
  const colorClasses = getClasses({
    "to-amber-500": toColor === "amber",
    "to-blue-500": toColor === "blue",
    "to-cyan-500": toColor === "cyan",
    "to-emerald-500": toColor === "emerald",
    "to-fuchsia-500": toColor === "fuchsia",
    "to-gray-500": toColor === "gray",
    "to-green-500": toColor === "green",
    "to-indigo-500": toColor === "indigo",
    "to-lime-500": toColor === "lime",
    "to-neutral-500": toColor === "neutral",
    "to-orange-500": toColor === "orange",
    "to-pink-500": toColor === "pink",
    "to-purple-500": toColor === "purple",
    "to-red-500": toColor === "red",
    "to-rose-500": toColor === "rose",
    "to-sky-500": toColor === "sky",
    "to-slate-500": toColor === "slate",
    "to-stone-500": toColor === "stone",
    "to-teal-500": toColor === "teal",
    "to-violet-500": toColor === "violet",
    "to-yellow-500": toColor === "yellow",
    "to-zinc-500": toColor === "zinc",
    "to-inherit": toColor === "inherit",
    "to-current": toColor === "current",
    "to-transparent": toColor === "transparent",
    "to-black": toColor === "black",
    "to-white": toColor === "white",
    "from-amber-500": fromColor === "amber",
    "from-blue-500": fromColor === "blue",
    "from-cyan-500": fromColor === "cyan",
    "from-emerald-500": fromColor === "emerald",
    "from-fuchsia-500": fromColor === "fuchsia",
    "from-gray-500": fromColor === "gray",
    "from-green-500": fromColor === "green",
    "from-indigo-500": fromColor === "indigo",
    "from-lime-500": fromColor === "lime",
    "from-neutral-500": fromColor === "neutral",
    "from-orange-500": fromColor === "orange",
    "from-pink-500": fromColor === "pink",
    "from-purple-500": fromColor === "purple",
    "from-red-500": fromColor === "red",
    "from-rose-500": fromColor === "rose",
    "from-sky-500": fromColor === "sky",
    "from-slate-500": fromColor === "slate",
    "from-stone-500": fromColor === "stone",
    "from-teal-500": fromColor === "teal",
    "from-violet-500": fromColor === "violet",
    "from-yellow-500": fromColor === "yellow",
    "from-zinc-500": fromColor === "zinc",
    "from-inherit": fromColor === "inherit",
    "from-current": fromColor === "current",
    "from-transparent": fromColor === "transparent",
    "from-black": fromColor === "black",
    "from-white": fromColor === "white",
    "via-amber-500": viaColor === "amber",
    "via-blue-500": viaColor === "blue",
    "via-cyan-500": viaColor === "cyan",
    "via-emerald-500": viaColor === "emerald",
    "via-fuchsia-500": viaColor === "fuchsia",
    "via-gray-500": viaColor === "gray",
    "via-green-500": viaColor === "green",
    "via-indigo-500": viaColor === "indigo",
    "via-lime-500": viaColor === "lime",
    "via-neutral-500": viaColor === "neutral",
    "via-orange-500": viaColor === "orange",
    "via-pink-500": viaColor === "pink",
    "via-purple-500": viaColor === "purple",
    "via-red-500": viaColor === "red",
    "via-rose-500": viaColor === "rose",
    "via-sky-500": viaColor === "sky",
    "via-slate-500": viaColor === "slate",
    "via-stone-500": viaColor === "stone",
    "via-teal-500": viaColor === "teal",
    "via-violet-500": viaColor === "violet",
    "via-yellow-500": viaColor === "yellow",
    "via-zinc-500": viaColor === "zinc",
    "via-inherit": viaColor === "inherit",
    "via-current": viaColor === "current",
    "via-transparent": viaColor === "transparent",
    "via-black": viaColor === "black",
    "via-white": viaColor === "white",
  });
  const sizeClasses = getClasses({
    "text-xs": size === "xs",
    "text-sm": size === "sm",
    "text-base": size === "md",
    "text-lg": size === "lg",
    "text-xl": size === "xl",
    "text-2xl": size === "2xl",
    "text-3xl": size === "3xl",
    "text-4xl": size === "4xl",
    "text-5xl": size === "5xl",
    "text-6xl": size === "6xl",
    "text-7xl": size === "7xl",
    "text-8xl": size === "8xl",
    "text-9xl": size === "9xl",
  });
  const Tag = as;
  return renderTemplate`${renderComponent(
    $$result,
    "Tag",
    Tag,
    { class: `${Astro2.props?.class}` },
    {
      default: () =>
        renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(
          `${colorClasses} ${directionClass} ${sizeClasses} bg-clip-text font-bold text-transparent inlin`,
          "class"
        )}>${renderSlot($$result, $$slots["default"])}</span>`,
    }
  )}`;
});

const $$file$6 =
  "/Users/austin/git/stripedpurple.io/src/components/common/gradiantTitle.astro";
const $$url$6 = undefined;

const $$module1 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$6,
      default: $$GradiantTitle,
      file: $$file$6,
      url: $$url$6,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$5 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/hero.astro",
  {
    modules: [
      {
        module: $$module1,
        specifier: "../common/gradiantTitle.astro",
        assert: {},
      },
    ],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$5 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/hero.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Hero;
  const STYLES = [];
  for (const STYLE of STYLES) $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead(
    $$result
  )}<section class="max-h-xl h-screen flex flex-col justify-between items-center px-8 md:px-16 py-4 relative astro-5FE4WJMZ">
    <div class="bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 z-[-1] top-0 bottom-0 left-0 right-0 absolute astro-5FE4WJMZ"></div>
    <div class="overlay astro-5FE4WJMZ"></div>
    <div aria-hidden="true" class="astro-5FE4WJMZ"></div>
   <div class="flex justify-between items-center w-full z-0 astro-5FE4WJMZ">
       <div class="max-w-lg astro-5FE4WJMZ">
           ${renderComponent(
             $$result,
             "GradiantTitle",
             $$GradiantTitle,
             {
               size: "7xl",
               fromColor: "fuchsia",
               viaColor: "purple",
               toColor: "violet",
               class: "mb-4 astro-5FE4WJMZ",
             },
             { default: () => renderTemplate`Austin Barrett` }
           )}
           <p class="text-lg sm:text-xl md:text-2xl astro-5FE4WJMZ">Web UI/UX Developer, <wbr class="astro-5FE4WJMZ">Photographer/Digital Artist, <wbr class="astro-5FE4WJMZ">Magician Extraordinaire</p>
        </div>
        <!-- <img src="https://via.placeholder.com/350x720/FF23de/FFFFFF?Text=Profile" alt=""> -->
    </div>
    <div class="z-0 astro-5FE4WJMZ">
        <a href="#scrollTo" title="click or scroll for more" role="button" class="select-all astro-5FE4WJMZ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12 motion-safe:animate-bounce astro-5FE4WJMZ">
                <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" class="astro-5FE4WJMZ"></path>
            </svg>          
        </a>
    </div>
</section>
<span id="scrollTo" class="astro-5FE4WJMZ"></span>`;
});

const $$file$5 =
  "/Users/austin/git/stripedpurple.io/src/components/home/hero.astro";
const $$url$5 = undefined;

const $$module2$1 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$5,
      default: $$Hero,
      file: $$file$5,
      url: $$url$5,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$4 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/card.astro",
  {
    modules: [],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$4 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/card.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Card;
  return renderTemplate`${maybeRenderHead(
    $$result
  )}<div class=" bg-spiral"${spreadAttributes(Astro2.props)}>
    <div${addAttribute(`${Astro2.props?.class} rounded-lg py-4 px-6`, "class")}>
        ${renderSlot($$result, $$slots["default"])}
    </div>
</div>`;
});

const $$file$4 =
  "/Users/austin/git/stripedpurple.io/src/components/common/card.astro";
const $$url$4 = undefined;

const $$module2 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$4,
      default: $$Card,
      file: $$file$4,
      url: $$url$4,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$3 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/section.astro",
  {
    modules: [],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$3 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/common/section.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Section;
  const { ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(
    `${Astro2.props?.class} p-8 sm:p-16`,
    "class"
  )}${spreadAttributes(rest)}>
    ${renderSlot($$result, $$slots["default"])}
</section>`;
});

const $$file$3 =
  "/Users/austin/git/stripedpurple.io/src/components/common/section.astro";
const $$url$3 = undefined;

const $$module3$1 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$3,
      default: $$Section,
      file: $$file$3,
      url: $$url$3,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const ReactLogo = "/assets/react.f2cadfd0.svg";

const $$module4$1 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: ReactLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const SvelteLogo = "/assets/svelte.c5baf9b8.svg";

const $$module5 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: SvelteLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const VueLogo = "/assets/vue.70723d20.svg";

const $$module6 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: VueLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const TailwindLogo = "/assets/tailwind.8d5f9853.svg";

const $$module7 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: TailwindLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const TypescriptLogo = "/assets/typescript.48df18d1.svg";

const $$module8 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: TypescriptLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const GoLogo = "/assets/golang.bbf54e00.svg";

const $$module9 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: GoLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const PythonLogo = "/assets/python.c1259fa0.svg";

const $$module10 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: PythonLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const NodeJsLogo = "/assets/node.99b49bb6.svg";

const $$module11 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: NodeJsLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const PSLogo = "/assets/photoshop.4e8a5535.svg";

const $$module12 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: PSLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const AILogo = "/assets/illustrator.84132260.svg";

const $$module13 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: AILogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const XDLogo = "/assets/xd.ec83c39d.svg";

const $$module14 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: XDLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const PRLogo = "/assets/premiere.86a3c358.svg";

const $$module15 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: PRLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const SonyLogo = "/assets/sony.56aac9e5.svg";

const $$module16 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: SonyLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const CanonLogo = "/assets/canon.3cd12703.svg";

const $$module17 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: CanonLogo,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$2 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/skills.astro",
  {
    modules: [
      {
        module: $$module1,
        specifier: "../common/gradiantTitle.astro",
        assert: {},
      },
      { module: $$module2, specifier: "../common/card.astro", assert: {} },
      { module: $$module3$1, specifier: "../common/section.astro", assert: {} },
      {
        module: $$module4$1,
        specifier: "../../assets/logos/react.svg",
        assert: {},
      },
      {
        module: $$module5,
        specifier: "../../assets/logos/svelte.svg",
        assert: {},
      },
      {
        module: $$module6,
        specifier: "../../assets/logos/vue.svg",
        assert: {},
      },
      {
        module: $$module7,
        specifier: "../../assets/logos/tailwind.svg",
        assert: {},
      },
      {
        module: $$module8,
        specifier: "../../assets/logos/typescript.svg",
        assert: {},
      },
      {
        module: $$module9,
        specifier: "../../assets/logos/golang.svg",
        assert: {},
      },
      {
        module: $$module10,
        specifier: "../../assets/logos/python.svg",
        assert: {},
      },
      {
        module: $$module11,
        specifier: "../../assets/logos/node.svg",
        assert: {},
      },
      {
        module: $$module12,
        specifier: "../../assets/logos/photoshop.svg",
        assert: {},
      },
      {
        module: $$module13,
        specifier: "../../assets/logos/illustrator.svg",
        assert: {},
      },
      {
        module: $$module14,
        specifier: "../../assets/logos/xd.svg",
        assert: {},
      },
      {
        module: $$module15,
        specifier: "../../assets/logos/premiere.svg",
        assert: {},
      },
      {
        module: $$module16,
        specifier: "../../assets/logos/sony.svg",
        assert: {},
      },
      {
        module: $$module17,
        specifier: "../../assets/logos/canon.svg",
        assert: {},
      },
    ],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$2 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/skills.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Skills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Skills;
  return renderTemplate`${renderComponent(
    $$result,
    "Section",
    $$Section,
    { class: "m-auto max-w-7xl" },
    {
      default: () => renderTemplate`${renderComponent(
        $$result,
        "GradiantTitle",
        $$GradiantTitle,
        {
          size: "5xl",
          fromColor: "fuchsia",
          viaColor: "purple",
          toColor: "violet",
          class: "mb-8 text-center",
        },
        { default: () => renderTemplate`The Things I Do` }
      )}${maybeRenderHead($$result)}<div class="grid lg:grid-cols-3 gap-8">

        ${renderComponent(
          $$result,
          "Card",
          $$Card,
          {
            class:
              "text-center w-full grow flex flex-col justify-between items-center",
            tabindex: "0",
          },
          {
            default:
              () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">Frontend</p><p class="text-white text-center max-w-sm mb-4 h-full">
                    Passionate about UI/UX. 7+ years of development experience in HTML, CSS, JS/TS, React, Vue, Svelte and NuxtJS frameworks.
                </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
                    <img${addAttribute(
                      TypescriptLogo,
                      "src"
                    )} alt="Typescript" class="h-8">
                    <img${addAttribute(
                      TailwindLogo,
                      "src"
                    )} alt="Tailwind" class="h-8">
                    <img${addAttribute(
                      ReactLogo,
                      "src"
                    )} alt="React JS" class="h-8">
                    <img${addAttribute(
                      SvelteLogo,
                      "src"
                    )} alt="Svelte" class="h-8">
                    <img${addAttribute(
                      VueLogo,
                      "src"
                    )} alt="Vue Js" class="h-8">
                </div>`,
          }
        )}


        ${renderComponent(
          $$result,
          "Card",
          $$Card,
          {
            class:
              "text-center w-full grow flex flex-col justify-between items-center",
            tabindex: "0",
          },
          {
            default:
              () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">Software Development</p><p class="text-white text-center max-w-sm mb-4 h-full">
                    Experienced in both functional and OOP: Go, Python, JavaScript, TypeScript.
                </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
                    <img${addAttribute(
                      GoLogo,
                      "src"
                    )} alt="Go Lang" class="h-8">
                    <img${addAttribute(
                      PythonLogo,
                      "src"
                    )} alt="Python" class="h-8">
                    <img${addAttribute(
                      NodeJsLogo,
                      "src"
                    )} alt="NodeJs" class="h-8">
                </div>`,
          }
        )}


            ${renderComponent(
              $$result,
              "Card",
              $$Card,
              {
                class:
                  "text-center w-full grow flex flex-col justify-between items-center",
                tabindex: "0",
              },
              {
                default:
                  () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">Photography/<wbr>Digital Art</p><p class="text-white text-center max-w-sm mb-4 h-full">
                    Raised on film, forge in photoshop, inspired by life
                </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
                    <img${addAttribute(
                      PSLogo,
                      "src"
                    )} alt="Adobe Photoshop" class="h-8">
                    <img${addAttribute(
                      AILogo,
                      "src"
                    )} alt="Adobe Illustrator" class="h-8">
                    <img${addAttribute(
                      XDLogo,
                      "src"
                    )} alt="Adobe XD" class="h-8">
                    <img${addAttribute(
                      PRLogo,
                      "src"
                    )} alt="Adobe Premiere Pro" class="h-8">
                </div><div class="flex gap-4 justify-center mb-3 flex-wrap">
                    <img${addAttribute(
                      SonyLogo,
                      "src"
                    )} alt="Sony Cameras" class="w-16">
                    <img${addAttribute(
                      CanonLogo,
                      "src"
                    )} alt="Canon Cameras" class="w-16">
                </div>`,
              }
            )}

        </div>`,
    }
  )}`;
});

const $$file$2 =
  "/Users/austin/git/stripedpurple.io/src/components/home/skills.astro";
const $$url$2 = undefined;

const $$module3 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$2,
      default: $$Skills,
      file: $$file$2,
      url: $$url$2,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata$1 = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/footer.astro",
  {
    modules: [],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro$1 = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/components/home/footer.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const STYLES = [];
  for (const STYLE of STYLES) $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead(
    $$result
  )}<section id="footer" class="astro-TDZXFCHU">
<footer class="grid grid-cols-12 grid-rows-6 astro-TDZXFCHU">

    <div class="bg-slate-800 text-white col-span-5 row-span-6 px-8 sm:px-16 py-4 sm:py-8 flex flex-col gap-4 justify-between astro-TDZXFCHU">
        <div class="astro-TDZXFCHU">
            <h1 class="text-4xl font-bold mb-6 astro-TDZXFCHU">Available for select freelance opportunities</h1>
    
        <p class="text-xl astro-TDZXFCHU">Have an exciting project you need help with? Send me an email or contact me via instant message!</p>
        </div>
    
        <ul class="astro-TDZXFCHU">
            <li class="astro-TDZXFCHU"><a href="mailto:austin@stripedpurple.io" class="link astro-TDZXFCHU">austin@stripedpurple</a></li>
            <li class="astro-TDZXFCHU"><a href="mailto:austin@stripedpurple.io" class="link astro-TDZXFCHU">GitHub</a></li>
            <li class="astro-TDZXFCHU"><a href="mailto:austin@stripedpurple.io" class="link astro-TDZXFCHU">Instagram</a></li>
            <li class="astro-TDZXFCHU"><a href="mailto:austin@stripedpurple.io" class="link astro-TDZXFCHU">LinkedIn</a></li>
            <li class="astro-TDZXFCHU"><a href="mailto:austin@stripedpurple.io" class="link astro-TDZXFCHU">Twitter</a></li>
        </ul>
    </div>
    
    <div class="testimonial bg-pink-600 text-white col-span-3 row-span-6 astro-TDZXFCHU">
        <blockquote class="astro-TDZXFCHU">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab deleniti maiores eius itaque necessitatibus accusantium blanditiis facere ea?</blockquote>
    </div>
    
    <div class="testimonial bg-purple-600 text-white col-span-4 row-span-2 astro-TDZXFCHU">
        <blockquote class="astro-TDZXFCHU">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab deleniti maiores eius itaque necessitatibus accusantium blanditiis facere ea?</blockquote>
    </div>
    
    <div class="testimonial bg-indigo-600 text-white col-span-4 row-span-4 astro-TDZXFCHU">
        <blockquote class="astro-TDZXFCHU">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab deleniti maiores eius itaque necessitatibus accusantium blanditiis facere ea?</blockquote>
    </div>

</footer>
</section>`;
});

const $$file$1 =
  "/Users/austin/git/stripedpurple.io/src/components/home/footer.astro";
const $$url$1 = undefined;

const $$module4 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata: $$metadata$1,
      default: $$Footer,
      file: $$file$1,
      url: $$url$1,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const $$metadata = createMetadata(
  "/@fs/Users/austin/git/stripedpurple.io/src/pages/index.astro",
  {
    modules: [
      { module: $$module1$2, specifier: "../layouts/main.astro", assert: {} },
      {
        module: $$module2$1,
        specifier: "../components/home/hero.astro",
        assert: {},
      },
      {
        module: $$module3,
        specifier: "../components/home/skills.astro",
        assert: {},
      },
      {
        module: $$module4,
        specifier: "../components/home/footer.astro",
        assert: {},
      },
    ],
    hydratedComponents: [],
    clientOnlyComponents: [],
    hydrationDirectives: /* @__PURE__ */ new Set([]),
    hoisted: [],
  }
);
const $$Astro = createAstro(
  "/@fs/Users/austin/git/stripedpurple.io/src/pages/index.astro",
  "",
  "file:///Users/austin/git/stripedpurple.io/"
);
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent(
    $$result,
    "Main",
    $$Main,
    {},
    {
      default: () =>
        renderTemplate`${renderComponent(
          $$result,
          "Hero",
          $$Hero,
          {}
        )}${renderComponent($$result, "Skills", $$Skills, {})}${renderComponent(
          $$result,
          "Footer",
          $$Footer,
          {}
        )}`,
    }
  )}`;
});

const $$file = "/Users/austin/git/stripedpurple.io/src/pages/index.astro";
const $$url = "";

const _page0 = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      $$metadata,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);

const pageMap = new Map([["src/pages/index.astro", _page0]]);
const renderers = [
  Object.assign(
    {
      name: "astro:jsx",
      serverEntrypoint: "astro/jsx/server.js",
      jsxImportSource: "astro",
    },
    { ssr: server_default }
  ),
];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose"));
  else if (process.argv.includes("--silent"));
  else;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS)
    .map((s) => s.slice(1))
    .join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less",
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS)
    .map((s) => s.slice(1))
    .join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments
    .map((segment) => {
      return segment[0].spread
        ? `/:${segment[0].content.slice(3)}(.*)?`
        : "/" +
            segment
              .map((part) => {
                if (part)
                  return part.dynamic
                    ? `:${part.content}`
                    : part.content
                        .normalize()
                        .replace(/\?/g, "%3F")
                        .replace(/#/g, "%23")
                        .replace(/%5B/g, "[")
                        .replace(/%5D/g, "]")
                        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              })
              .join("");
    })
    .join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(
      rawRouteData.segments,
      rawRouteData._meta.trailingSlash
    ),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData),
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes,
  };
}

const _manifest = Object.assign(
  deserializeManifest({
    adapterName: "@astrojs/netlify/functions",
    routes: [
      {
        file: "",
        links: ["assets/index.4ca52e88.css"],
        scripts: [{ type: "external", value: "page.3aa82516.js" }],
        routeData: {
          route: "/",
          type: "page",
          pattern: "^\\/$",
          segments: [],
          params: [],
          component: "src/pages/index.astro",
          pathname: "/",
          _meta: { trailingSlash: "ignore" },
        },
      },
    ],
    base: "/",
    markdown: {
      drafts: false,
      syntaxHighlight: "shiki",
      shikiConfig: { langs: [], theme: "github-dark", wrap: false },
      remarkPlugins: [],
      rehypePlugins: [],
      isAstroFlavoredMd: false,
    },
    pageMap: null,
    renderers: [],
    entryModules: {
      "\u0000@astrojs-ssr-virtual-entry": "entry.mjs",
      "astro:scripts/page.js": "page.3aa82516.js",
      "astro:scripts/before-hydration.js":
        "data:text/javascript;charset=utf-8,//[no before-hydration script]",
    },
    assets: [
      "/assets/react.f2cadfd0.svg",
      "/assets/svelte.c5baf9b8.svg",
      "/assets/vue.70723d20.svg",
      "/assets/tailwind.8d5f9853.svg",
      "/assets/golang.bbf54e00.svg",
      "/assets/typescript.48df18d1.svg",
      "/assets/python.c1259fa0.svg",
      "/assets/node.99b49bb6.svg",
      "/assets/photoshop.4e8a5535.svg",
      "/assets/illustrator.84132260.svg",
      "/assets/xd.ec83c39d.svg",
      "/assets/premiere.86a3c358.svg",
      "/assets/sony.56aac9e5.svg",
      "/assets/canon.3cd12703.svg",
      "/assets/index.4ca52e88.css",
      "/bg-tile-dark.svg",
      "/favicon.ico",
      "/page.3aa82516.js",
      "/page.3aa82516.js",
    ],
  }),
  {
    pageMap: pageMap,
    renderers: renderers,
  }
);
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports["handler"];

const _start = "start";
if (_start in adapter) {
  adapter[_start](_manifest, _args);
}

export { handler };
