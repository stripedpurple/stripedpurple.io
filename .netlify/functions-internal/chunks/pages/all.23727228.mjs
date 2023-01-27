/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, d as addAttribute, e as renderSlot, f as renderHead, s as spreadAttributes } from '../astro.2ec0da22.mjs';
import 'html-escaper';

const getClasses = (classes = {}) => {
  return Object.keys(classes).filter((key) => classes[key]).join(" ");
};

const $$Astro$h = createAstro();
const $$BlindsTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$BlindsTitle;
  const {
    fromColor = "violet",
    toColor = "pink",
    size = "2xl",
    as = "h1",
    ...props
  } = Astro2.props;
  const colorClasses = getClasses({
    // To Color
    "to-[#475569_50%]": toColor === "slate",
    "to-[#4b5563_50%]": toColor === "gray",
    "to-[#52525b_50%]": toColor === "zinc",
    "to-[#525252_50%]": toColor === "neutral",
    "to-[#57534e_50%]": toColor === "stone",
    "to-[#dc2626_50%]": toColor === "red",
    "to-[#ea580c_50%]": toColor === "orange",
    "to-[#d97706_50%]": toColor === "amber",
    "to-[#eab308_50%]": toColor === "yellow",
    "to-[#65a30d_50%]": toColor === "lime",
    "to-[#16a34a_50%]": toColor === "green",
    "to-[#059669_50%]": toColor === "emerald",
    "to-[#0d9488_50%]": toColor === "teal",
    "to-[#0891b2_50%]": toColor === "cyan",
    "to-[#0284c7_50%]": toColor === "sky",
    "to-[#2563eb_50%]": toColor === "blue",
    "to-[#4f46e5_50%]": toColor === "indigo",
    "to-[#7c3aed_50%]": toColor === "violet",
    "to-[#9333ea_50%]": toColor === "purple",
    "to-[#c026d3_50%]": toColor === "fuchsia",
    "to-[#db2777_50%]": toColor === "pink",
    "to-[#e11d48_50%]": toColor === "rose",
    "to-[white_50%]": toColor === "white",
    // From Color
    "from-[#475569_50%]": fromColor === "slate",
    "from-[#4b5563_50%]": fromColor === "gray",
    "from-[#52525b_50%]": fromColor === "zinc",
    "from-[#525252_50%]": fromColor === "neutral",
    "from-[#57534e_50%]": fromColor === "stone",
    "from-[#dc2626_50%]": fromColor === "red",
    "from-[#ea580c_50%]": fromColor === "orange",
    "from-[#d97706_50%]": fromColor === "amber",
    "from-[#eab308_50%]": fromColor === "yellow",
    "from-[#65a30d_50%]": fromColor === "lime",
    "from-[#16a34a_50%]": fromColor === "green",
    "from-[#059669_50%]": fromColor === "emerald",
    "from-[#0d9488_50%]": fromColor === "teal",
    "from-[#0891b2_50%]": fromColor === "cyan",
    "from-[#0284c7_50%]": fromColor === "sky",
    "from-[#2563eb_50%]": fromColor === "blue",
    "from-[#4f46e5_50%]": fromColor === "indigo",
    "from-[#7c3aed_50%]": fromColor === "violet",
    "from-[#9333ea_50%]": fromColor === "purple",
    "from-[#c026d3_50%]": fromColor === "fuchsia",
    "from-[#db2777_50%]": fromColor === "pink",
    "from-[#e11d48_50%]": fromColor === "rose",
    "from-[white_50%]": fromColor === "white"
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
    "text-9xl": size === "9xl"
  });
  const Tag = as;
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { ...props, "class": "astro-RXUGLELC" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(`${colorClasses} ${sizeClasses} title astro-RXUGLELC`, "class")}>${renderSlot($$result, $$slots["default"])}
  </span>` })}`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/blindsTitle.astro");

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$g = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="select-none py-4 px-6 flex items-center justify-center m-0 w-full z-20 absolute top-0 astro-DRSH6RTZ" id="navbar">\n  <nav class="border border-primary-600/50 flex justify-center rounded-full items-center gap-6 sm:gap-8 px-6 py-2 text-lg font-medium capitalize backdrop-blur-sm bg-primary-800/50 astro-DRSH6RTZ">\n  ', "\n  ", "\n  ", "\n  ", "\n  ", '\n</nav>\n</div>\n\n\n\n<script defer>\n  window.addEventListener("load", () => {\n    const obserables = document.getElementById("scrollTo");\n    const navbar = document.getElementById("navbar");\n    const io = new IntersectionObserver((entries) => {\n      entries.forEach(\n        (entry) => {\n          if (!entry.isIntersecting) {\n            navbar.classList.add(\n              "fixed",\n            );\n            navbar.classList.remove("top-0", "absolute");\n          } else {\n            navbar.classList.remove(\n              "fixed",\n            );\n            navbar.classList.add("top-0", "absolute");\n          }\n        },\n        { threshold: 0 }\n      );\n    });\n\n    io.observe(obserables);\n  });\n<\/script>'])), maybeRenderHead($$result), renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "class": "opacity-80 hover:opacity-100 transition-all astro-DRSH6RTZ", "toColor": "violet", "fromColor": "white", "href": "#", "as": "a", "size": "md" }, { "default": () => renderTemplate`home` }), renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "class": "opacity-80 hover:opacity-100 transition-all astro-DRSH6RTZ", "toColor": "pink", "fromColor": "white", "href": "#whatIDo", "as": "a", "size": "md" }, { "default": () => renderTemplate`What I do` }), renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "class": "opacity-80 hover:opacity-100 transition-all astro-DRSH6RTZ", "toColor": "purple", "fromColor": "white", "href": "#projectHighlight", "as": "a", "size": "md" }, { "default": () => renderTemplate`Projects` }), renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "class": "opacity-80 hover:opacity-100 transition-all astro-DRSH6RTZ", "toColor": "orange", "fromColor": "white", "href": "#career", "as": "a", "size": "md" }, { "default": () => renderTemplate`Career` }), renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "class": "opacity-80 hover:opacity-100 transition-all astro-DRSH6RTZ", "toColor": "yellow", "fromColor": "white", "href": "#footer", "as": "a", "size": "md" }, { "default": () => renderTemplate`contact` }));
}, "/Users/austin/git/stripedpurple.io/src/components/home/navbar.astro");

const $$Astro$f = createAstro();
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Main;
  return renderTemplate`<html lang="en" class="motion-safe:scroll-smooth">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Striped Purple</title>
  ${renderHead($$result)}</head>
  <body class="bg-primary-900 text-white relative">
    <!-- <div class="relative"> -->
    <a href="#main" class="focus:outline-none focus:ring-2 focus:ring-white p-4 bg-pink-600 text-center text-2xl -translate-y-full fixed focus:translate-y-0 w-full motion-safe:transition-all duration-200 z-50">Skip to main content</a>
    ${renderComponent($$result, "Navbar", $$Navbar, {})}
    <main id="main" class="h-screen motion-safe:scroll-smooth relative">
      ${renderSlot($$result, $$slots["default"])}
    </main>
    <output></output>
    <!-- </div> -->
  </body></html>`;
}, "/Users/austin/git/stripedpurple.io/src/layouts/main.astro");

const $$Astro$e = createAstro();
const $$GradiantTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$GradiantTitle;
  const {
    fromColor = "violet",
    toColor = "fuchsia",
    viaColor = "",
    size = "2xl",
    direction = "tr",
    as = "h1"
  } = Astro2.props;
  const directionClass = getClasses({
    "bg-gradient-to-t": direction === "t",
    "bg-gradient-to-tr": direction === "tr",
    "bg-gradient-to-r": direction === "r",
    "bg-gradient-to-br": direction === "br",
    "bg-gradient-to-b": direction === "b",
    "bg-gradient-to-bl": direction === "bl",
    "bg-gradient-to-l": direction === "l",
    "bg-gradient-to-tl": direction === "tl"
  });
  const colorClasses = getClasses({
    // To Color
    "to-amber-600": toColor === "amber",
    "to-blue-600": toColor === "blue",
    "to-cyan-600": toColor === "cyan",
    "to-emerald-600": toColor === "emerald",
    "to-fuchsia-600": toColor === "fuchsia",
    "to-gray-600": toColor === "gray",
    "to-green-600": toColor === "green",
    "to-indigo-600": toColor === "indigo",
    "to-lime-600": toColor === "lime",
    "to-neutral-600": toColor === "neutral",
    "to-orange-600": toColor === "orange",
    "to-pink-600": toColor === "pink",
    "to-purple-600": toColor === "purple",
    "to-red-600": toColor === "red",
    "to-rose-600": toColor === "rose",
    "to-sky-600": toColor === "sky",
    "to-primary-600": toColor === "slate",
    "to-stone-600": toColor === "stone",
    "to-teal-600": toColor === "teal",
    "to-violet-600": toColor === "violet",
    "to-yellow-600": toColor === "yellow",
    "to-zinc-600": toColor === "zinc",
    "to-inherit": toColor === "inherit",
    "to-current": toColor === "current",
    "to-transparent": toColor === "transparent",
    "to-black": toColor === "black",
    "to-white": toColor === "white",
    // From Color
    "from-amber-600": fromColor === "amber",
    "from-blue-600": fromColor === "blue",
    "from-cyan-600": fromColor === "cyan",
    "from-emerald-600": fromColor === "emerald",
    "from-fuchsia-600": fromColor === "fuchsia",
    "from-gray-600": fromColor === "gray",
    "from-green-600": fromColor === "green",
    "from-indigo-600": fromColor === "indigo",
    "from-lime-600": fromColor === "lime",
    "from-neutral-600": fromColor === "neutral",
    "from-orange-600": fromColor === "orange",
    "from-pink-600": fromColor === "pink",
    "from-purple-600": fromColor === "purple",
    "from-red-600": fromColor === "red",
    "from-rose-600": fromColor === "rose",
    "from-sky-600": fromColor === "sky",
    "from-primary-600": fromColor === "slate",
    "from-stone-600": fromColor === "stone",
    "from-teal-600": fromColor === "teal",
    "from-violet-600": fromColor === "violet",
    "from-yellow-600": fromColor === "yellow",
    "from-zinc-600": fromColor === "zinc",
    "from-inherit": fromColor === "inherit",
    "from-current": fromColor === "current",
    "from-transparent": fromColor === "transparent",
    "from-black": fromColor === "black",
    "from-white": fromColor === "white",
    // Via Color
    "via-amber-600": viaColor === "amber",
    "via-blue-600": viaColor === "blue",
    "via-cyan-600": viaColor === "cyan",
    "via-emerald-600": viaColor === "emerald",
    "via-fuchsia-600": viaColor === "fuchsia",
    "via-gray-600": viaColor === "gray",
    "via-green-600": viaColor === "green",
    "via-indigo-600": viaColor === "indigo",
    "via-lime-600": viaColor === "lime",
    "via-neutral-600": viaColor === "neutral",
    "via-orange-600": viaColor === "orange",
    "via-pink-600": viaColor === "pink",
    "via-purple-600": viaColor === "purple",
    "via-red-600": viaColor === "red",
    "via-rose-600": viaColor === "rose",
    "via-sky-600": viaColor === "sky",
    "via-primary-600": viaColor === "slate",
    "via-stone-600": viaColor === "stone",
    "via-teal-600": viaColor === "teal",
    "via-violet-600": viaColor === "violet",
    "via-yellow-600": viaColor === "yellow",
    "via-zinc-600": viaColor === "zinc",
    "via-inherit": viaColor === "inherit",
    "via-current": viaColor === "current",
    "via-transparent": viaColor === "transparent",
    "via-black": viaColor === "black",
    "via-white": viaColor === "white"
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
    "text-9xl": size === "9xl"
  });
  const Tag = as;
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": `${Astro2.props?.class} ${colorClasses} ${directionClass} ${sizeClasses} w-full inline-block -mx-4 px-4 bg-clip-text text-transparent uppercase title` }, { "default": () => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/gradiantTitle.astro");

const $$Astro$d = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead($$result)}<section class="max-h-xl h-screen flex flex-col justify-between items-center px-8 md:px-16 py-4 relative astro-AA5QONBU">
  <div class="bg-spiral w-8/12 ml-[33.33%] z-[-1] top-0 bottom-0 left-0 right-0 absolute astro-AA5QONBU">
  </div>
  <div class="overlay z-10 astro-AA5QONBU"></div>
  <div aria-hidden="true" class="astro-AA5QONBU"></div>
  <div class="flex justify-between items-center w-full z-10 astro-AA5QONBU">
    <div class="max-w-lg sm:mx-16 astro-AA5QONBU">
      ${renderComponent($$result, "GradiantTitle", $$GradiantTitle, { "size": "7xl", "class": "mb-4 astro-AA5QONBU" }, { "default": () => renderTemplate`Austin Barrett` })}
      <p class="text-lg sm:text-xl md:text-2xl astro-AA5QONBU">
        Web UI/UX Developer, <wbr class="astro-AA5QONBU">Photographer/Digital Artist, <wbr class="astro-AA5QONBU">Magician
        Extraordinaire
      </p>
    </div>

  </div>
  <div class="z-10 astro-AA5QONBU">
    <a href="#scrollTo" title="click or scroll for more" role="button" class="select-all astro-AA5QONBU">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12 motion-safe:animate-bounce astro-AA5QONBU">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" class="astro-AA5QONBU"></path>
      </svg>
    </a>
  </div>
</section>
<span id="scrollTo" class="astro-AA5QONBU"></span>`;
}, "/Users/austin/git/stripedpurple.io/src/components/home/hero.astro");

const $$Astro$c = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Card;
  Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a class="card astro-GFQSXICE"${spreadAttributes(Astro2.props)}>
  <div${addAttribute(`${Astro2.props?.class} rounded-lg py-4 px-6 astro-GFQSXICE`, "class")}>
    ${renderSlot($$result, $$slots["default"])}
  </div>
</a>`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/card.astro");

const $$Astro$b = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Section;
  const { ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(`${Astro2.props?.class} p-8 sm:p-16`, "class")}${spreadAttributes(rest)}>
  ${renderSlot($$result, $$slots["default"])}
</section>`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/section.astro");

const ReactLogo = "/_astro/react.f2cadfd0.svg";

const SvelteLogo = "/_astro/svelte.c5baf9b8.svg";

const VueLogo = "/_astro/vue.70723d20.svg";

const TailwindLogo = "/_astro/tailwind.8d5f9853.svg";

const TypescriptLogo = "/_astro/typescript.48df18d1.svg";

const GoLogo = "/_astro/golang.bbf54e00.svg";

const PythonLogo = "/_astro/python.c1259fa0.svg";

const NodeJsLogo = "/_astro/node.99b49bb6.svg";

const PSLogo = "/_astro/photoshop.4e8a5535.svg";

const AILogo = "/_astro/illustrator.84132260.svg";

const XDLogo = "/_astro/xd.ec83c39d.svg";

const PRLogo = "/_astro/premiere.86a3c358.svg";

const SonyLogo = "/_astro/sony.56aac9e5.svg";

const CanonLogo = "/_astro/canon.3cd12703.svg";

const $$Astro$a = createAstro();
const $$Skills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Skills;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "m-auto max-w-7xl my-24", "id": "whatIDo" }, { "default": () => renderTemplate`${renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "size": "5xl", "class": "mb-8 text-center" }, { "default": () => renderTemplate`
    What I Do
    ` })}${maybeRenderHead($$result)}<div class="grid lg:grid-cols-3 gap-8">
    ${renderComponent($$result, "Card", $$Card, { "class": "text-center w-full grow flex flex-col justify-between items-center", "href": "/projects" }, { "default": () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">Frontend</p><p class="text-white text-center max-w-sm mb-4 h-full">
        Passionate about UI/UX. 7+ years of development experience in HTML, CSS,
        JS/TS, React, Vue, Svelte and NuxtJS frameworks.
      </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
        <img${addAttribute(TypescriptLogo, "src")} alt="Typescript" class="h-8">
        <img${addAttribute(TailwindLogo, "src")} alt="Tailwind" class="h-8">
        <img${addAttribute(ReactLogo, "src")} alt="React JS" class="h-8">
        <img${addAttribute(SvelteLogo, "src")} alt="Svelte" class="h-8">
        <img${addAttribute(VueLogo, "src")} alt="Vue Js" class="h-8">
      </div>` })}

    ${renderComponent($$result, "Card", $$Card, { "class": "text-center w-full grow flex flex-col justify-between items-center", "href": "/projects" }, { "default": () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">Software Development</p><p class="text-white text-center max-w-sm mb-4 h-full">
        Experienced in both functional and OOP: Go, Python, JavaScript,
        TypeScript.
      </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
        <img${addAttribute(GoLogo, "src")} alt="Go Lang" class="h-8">
        <img${addAttribute(PythonLogo, "src")} alt="Python" class="h-8">
        <img${addAttribute(NodeJsLogo, "src")} alt="NodeJs" class="h-8">
      </div>` })}

    ${renderComponent($$result, "Card", $$Card, { "class": "text-center w-full grow flex flex-col justify-between items-center", "href": "/photography" }, { "default": () => renderTemplate`<p class="text-3xl font-bold text-white mb-3">
        Photography/<wbr>Digital Art
      </p><p class="text-white text-center max-w-sm mb-4 h-full">
        Raised on film, forge in photoshop, inspired by life
      </p><div class="flex gap-4 justify-center mb-3 flex-wrap">
        <img${addAttribute(PSLogo, "src")} alt="Adobe Photoshop" class="h-8">
        <img${addAttribute(AILogo, "src")} alt="Adobe Illustrator" class="h-8">
        <img${addAttribute(XDLogo, "src")} alt="Adobe XD" class="h-8">
        <img${addAttribute(PRLogo, "src")} alt="Adobe Premiere Pro" class="h-8">
      </div><div class="flex gap-4 justify-center mb-3 flex-wrap">
        <img${addAttribute(SonyLogo, "src")} alt="Sony Cameras" class="w-16">
        <img${addAttribute(CanonLogo, "src")} alt="Canon Cameras" class="w-16">
      </div>` })}
  </div>` })}`;
}, "/Users/austin/git/stripedpurple.io/src/components/home/skills.astro");

const $$Astro$9 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<section id="footer" class="astro-TOB6ASKM">
  <footer class="sm:grid grid-cols-12 grid-rows-6 astro-TOB6ASKM">
    <div class="bg-primary-800 text-white col-span-5 row-span-6 px-8 sm:px-16 py-4 sm:py-8 flex flex-col gap-4 justify-between astro-TOB6ASKM">
      <div class="astro-TOB6ASKM">
        ${renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "size": "3xl", "fromColor": "white", "class": "astro-TOB6ASKM" }, { "default": () => renderTemplate`
          Available for select freelance opportunities
        ` })}

        <p class="sm:text-xl text-base astro-TOB6ASKM">
          Have an exciting project you need help with? Send me an email or
          contact me via instant message!
        </p>
      </div>

      <ul class="flex sm:flex-col gap-2  astro-TOB6ASKM">
        <li class="astro-TOB6ASKM">
          <a href="mailto:austin@stripedpurple.io" class="link astro-TOB6ASKM">
            <svg class="inline-block h-5 w-5 mr-1 astro-TOB6ASKM" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" class="astro-TOB6ASKM"></path>
            </svg>
            
            <span class="sr-only sm:not-sr-only astro-TOB6ASKM">austin@stripedpurple.io</span>
          </a>
        </li>
        <li class="astro-TOB6ASKM">
          <a href="https://github.com/stripedpurple" class="link astro-TOB6ASKM">
            <svg class="inline-block h-5 w-5 mr-1 astro-TOB6ASKM" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" class="astro-TOB6ASKM"></path>
            </svg>
            <span class="sr-only sm:not-sr-only astro-TOB6ASKM">GitHub</span> 
          </a>
        </li>
        <li class="astro-TOB6ASKM">
          <a href="https://www.instagram.com/stripedpurple/" class="link astro-TOB6ASKM">
            <svg class="inline-block h-5 w-5 mr-1 astro-TOB6ASKM" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" class="astro-TOB6ASKM"></path>
            </svg>
            <span class="sr-only sm:not-sr-only astro-TOB6ASKM">
              Instagram
            </span>
          </a>
        </li>
        <li class="astro-TOB6ASKM">
          <a href="https://www.linkedin.com/in/stripedpurple/" class="link astro-TOB6ASKM">
            <svg class="inline-block h-5 w-5 mr-1 astro-TOB6ASKM" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" class="astro-TOB6ASKM"></path></svg>
            <span class="sr-only sm:not-sr-only astro-TOB6ASKM">LinkedIn</span>
          </a>
        </li>
        <li class="astro-TOB6ASKM">
          <a href="https://twitter.com/_stripedpurple" class="link astro-TOB6ASKM">
            <svg class="inline-block h-5 w-5 mr-1 astro-TOB6ASKM" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" class="astro-TOB6ASKM"></path>
            </svg>
            <span class="sr-only sm:not-sr-only astro-TOB6ASKM">Twitter</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="testimonial bg-pink-600 text-white col-span-3 row-span-6 astro-TOB6ASKM">
      <blockquote class="astro-TOB6ASKM">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid
        cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab
        deleniti maiores eius itaque necessitatibus accusantium blanditiis
        facere ea?
      </blockquote>
    </div>

    <div class="testimonial bg-purple-600 text-white col-span-4 row-span-2 astro-TOB6ASKM">
      <blockquote class="astro-TOB6ASKM">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid
        cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab
        deleniti maiores eius itaque necessitatibus accusantium blanditiis
        facere ea?
      </blockquote>
    </div>

    <div class="testimonial bg-indigo-600 text-white col-span-4 row-span-4 astro-TOB6ASKM">
      <blockquote class="astro-TOB6ASKM">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi aliquid
        cum ullam quasi, laudantium ipsum distinctio eum quidem at quisquam ab
        deleniti maiores eius itaque necessitatibus accusantium blanditiis
        facere ea?
      </blockquote>
    </div>
  </footer>
</section>`;
}, "/Users/austin/git/stripedpurple.io/src/components/home/footer.astro");

const $$Astro$8 = createAstro();
const $$Accordion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Accordion;
  return renderTemplate`${maybeRenderHead($$result)}<div class="expanded accordion astro-MHZYTKDI">
  <button class="btn astro-MHZYTKDI">
    ${renderSlot($$result, $$slots["button"])}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon astro-MHZYTKDI" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" class="astro-MHZYTKDI"></path>
    </svg>
  </button>

  <div class="description astro-MHZYTKDI">
    ${renderSlot($$result, $$slots["content"])}
  </div>
</div>

`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/accordion.astro");

const $$Astro$7 = createAstro();
const $$WorkHistory = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$WorkHistory;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "max-w-5xl mx-auto sm:my-24", "id": "career" }, { "default": () => renderTemplate`${renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "size": "5xl", "fromColor": "yellow", "toColor": "orange", "class": "mb-8 text-center" }, { "default": () => renderTemplate`Work Experience` })}${renderComponent($$result, "Accordion", $$Accordion, {}, { "button": () => renderTemplate`${maybeRenderHead($$result)}<span class="flex items-center"><b>Director, IT / Multi-Media Operations</b><span class="mx-2">|</span>BioHiTech <small class="text-primary-200 ml-4">(2014 - 2021)</small>
    </span>`, "content": () => renderTemplate`<div>
      <p>
        The startup life style can be described as one with many hats. Over the
        years at BioHitech I dawned many hats, Full Stack Engineer, Designer,
        Marketing Specialist, and eventually Lead Developer. During this time I
        was able to work with plethora technologies including:
      </p>
      <ul class="list-disc pl-4 ml-4">
        <li>AWS (EC2, ECS, Aurora, Kinesis, S3, RDS, Lightsail)</li>
        <li>Node / Express / AngularJS</li>
        <li>PostgreSQL / MongoDB / LevelDB</li>
        <li>PLC Programming with Ladders, and Structured Text</li>
        <li>Java / Spring</li>
        <li>Adobe Creative Cloud (Ps, Ai, Pr, Xd, Lr, LrC, Id)</li>
      </ul>
    </div>` })}${renderComponent($$result, "Accordion", $$Accordion, {}, { "button": () => renderTemplate`<span class="flex items-center"><b>Lead UI / UX Developer</b><span class="mx-2">|</span>RolkaLoube <small class="text-primary-200 ml-4">(2021 - Present)</small>
    </span>`, "content": () => renderTemplate`<p>
      The approach will not be easy. You are required to maneuver straight down
      this trench and skim the surface to this point. The target area is only
      two meters wide. It’s a small thermal exhaust port, right below the main
      port. The shaft leads directly to the reactor system. A precise hit will
      start a chain reaction which should destroy the station. Only a precise
      hit will set up a chain reaction. The shaft is ray-shielded, so you’ll
      have to use proton torpedoes. That’s impossible, even for a computer. It’s
      not impossible. I used to bull’s-eye womp rats in my T-sixteen back home.
      They’re not much bigger than two meters. Man your ships! And may the Force
      be with you!
    </p>` })}` })}`;
}, "/Users/austin/git/stripedpurple.io/src/components/home/workHistory.astro");

const $$Astro$6 = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Button;
  const { color = "indigo", size = "md", fullWidth = false, ...rest } = Astro2.props;
  const classes = getClasses({
    // Classes that are always added
    "inline-flex justify-center items-center rounded-md select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-primary-900": true,
    // Colors
    // 'bg-transparent border-2 border-primary-600 text-primary-600': color === 'secoundary',
    "bg-blue-600 text-blue-100": color === "blue",
    "bg-indigo-600 text-indigo-100": color === "indigo",
    "bg-green-600 text-green-100": color === "green",
    "bg-red-600 text-red-100": color === "red",
    "bg-primary-800 text-primary-100": color === "primary" || color === "dark",
    // Size
    "px-2.5 py-2 text-sm": size === "sm",
    "px-3 py-2": size === "md",
    "px-3 py-2.5 text-lg": size === "lg",
    // Fullwidth
    "w-full": fullWidth
  });
  const Tag = !rest.href ? "button" : "a";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": `${classes}`, ...rest }, { "default": () => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/button.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$5 = createAstro();
const $$CenteredModal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CenteredModal;
  return renderTemplate(_a || (_a = __template(["<!-- A modal dialog containing a form -->", '<dialog id="favDialog" class="max-w-md w-full bg-primary-900 text-primary-200 rounded-lg backdrop:backdrop-blur-sm backdrop:bg-primary-900/50 px-4 py-3 sm:px-8 sm:py-6">\n    <form method="dialog">\n        ', "\n    </form>\n  </dialog>\n  <p>\n    ", `
  </p>


<script defer>
    const dialog = document.querySelector("dialog");
    const showButton = document.getElementById("showDialog");
    
    dialog.addEventListener("click",(e)=> {
    if (e.target === dialog) dialog.close();
    });
    showButton.addEventListener('click', () => {
        favDialog.showModal();
    });

<\/script>`])), maybeRenderHead($$result), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Button", $$Button, { "id": "showDialog" }, { "default": () => renderTemplate`Show the dialog` }));
}, "/Users/austin/git/stripedpurple.io/src/components/modals/centeredModal.astro");

const $$Astro$4 = createAstro();
const $$Input = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Input;
  const { label, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col mb-4 astro-GSWXAS4Q">
    <label class="label astro-GSWXAS4Q" for="">${label}</label>
    <input class="input astro-GSWXAS4Q">
</div>`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/input.astro");

const $$Astro$3 = createAstro();
const $$TextArea = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TextArea;
  const { label, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col mb-4 astro-BVBQQC7S">
    <label class="label astro-BVBQQC7S" for="">${label}</label>
    <textarea class="input astro-BVBQQC7S"></textarea>
</div>`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/textArea.astro");

const $$Astro$2 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { img, title, description, to, titleColor = "pink", ...props } = Astro2.props;
  let titleColorClass = getClasses({
    "before:bg-amber-600": titleColor === "amber",
    "before:bg-blue-600": titleColor === "blue",
    "before:bg-cyan-600": titleColor === "cyan",
    "before:bg-emerald-600": titleColor === "emerald",
    "before:bg-fuchsia-600": titleColor === "fuchsia",
    "before:bg-gray-600": titleColor === "gray",
    "before:bg-green-600": titleColor === "green",
    "before:bg-indigo-600": titleColor === "indigo",
    "before:bg-lime-600": titleColor === "lime",
    "before:bg-neutral-600": titleColor === "neutral",
    "before:bg-orange-600": titleColor === "orange",
    "before:bg-pink-600": titleColor === "pink",
    "before:bg-purple-600": titleColor === "purple",
    "before:bg-red-600": titleColor === "red",
    "before:bg-rose-600": titleColor === "rose",
    "before:bg-sky-600": titleColor === "sky",
    "before:bg-slate-600": titleColor === "slate",
    "before:bg-stone-600": titleColor === "stone",
    "before:bg-teal-600": titleColor === "teal",
    "before:bg-violet-600": titleColor === "violet",
    "before:bg-yellow-500": titleColor === "yellow",
    "before:bg-zinc-600": titleColor === "zinc",
    "before:bg-transparent-600": titleColor === "transparent",
    "before:bg-black-600": titleColor === "black",
    "before:bg-white-600": titleColor === "white",
    "before:bg-inherit-600": titleColor === "inherit",
    "before:bg-current-600": titleColor === "current"
  });
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(to, "href")}${addAttribute(`card group ${props.class} astro-6LCZBSLI`, "class")} target="_blank" rel="noopener">
    <span class="group-hover:scale-110 card-img astro-6LCZBSLI"${addAttribute(`background-image: url(${img})`, "style")}></span>
    <span class="card-info astro-6LCZBSLI">
        <dt${addAttribute(`card-title ${titleColorClass} astro-6LCZBSLI`, "class")}>${title}</dt>
        <dd class="card-description group-hover:truncate-none astro-6LCZBSLI">${description}</dd>
    </span>
</a>`;
}, "/Users/austin/git/stripedpurple.io/src/components/common/projectCard.astro");

const $$Astro$1 = createAstro();
const $$ProjectHighlights = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectHighlights;
  return renderTemplate`${maybeRenderHead($$result)}<section id="projectHighlight" class="py-12 sm:py-24">
    ${renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "size": "5xl", "fromColor": "pink", "toColor": "purple", "class": "mb-8 text-center" }, { "default": () => renderTemplate`Projects Highlights` })}
    <div class="sm:h-[75vh] grid grid-rows-6 grid-cols-5 gap-4 sm:gap-0">
        ${renderComponent($$result, "ProjectCard", $$ProjectCard, { "class": "col-span-full sm:row-span-3 sm:col-span-2", "img": "/images/texttool.app.png", "to": "https://texttool.app", "title": "Text Tools", "description": "A collection of powerful string/text maniplulation tools living right in your browser" })}
        ${renderComponent($$result, "ProjectCard", $$ProjectCard, { "class": "col-span-full sm:row-span-6 sm:col-span-3", "img": "/images/biohitech.com.png", "to": "https://biohitech.stripedpurple.io/", "title": "BioHiTech Global", "titleColor": "yellow", "description": "With combined power of natural science and cutting-edge technologies BioHiTech Global is working to solve complex real-world challenges that threaten our environment, biodiversity, and energy resources." })}
        ${renderComponent($$result, "ProjectCard", $$ProjectCard, { "class": "col-span-full sm:row-span-3 sm:col-span-2", "img": "/images/scrubspodcast.cc.png", "to": "https://scrubspodcast.cc", "title": "Scrubs Podcast", "titleColor": "violet", "description": "The internet's favorite TV re-watch podcast's unofficial website. Listen as the gang riffs, rememinise, and gets you rolling on the floor." })}
    </div>
    <div class="flex justify-end py-4 relative">
        <a href="/projects" class="hover:-translate-x-2 transition-all duration-200 text-lg sm:text-xl flex items-center px-6">
            ${renderComponent($$result, "BlindsTitle", $$BlindsTitle, { "as": "div", "size": "lg", "fromColor": "white" }, { "default": () => renderTemplate`view all` })}
            <svg class="inline h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd"></path>
            </svg>              
    </a>
    </div>
</section>`;
}, "/Users/austin/git/stripedpurple.io/src/components/home/projectHighlights.astro");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Main", $$Main, {}, { "default": () => renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "Skills", $$Skills, {})}${renderComponent($$result, "ProjectHighlights", $$ProjectHighlights, {})}${renderComponent($$result, "WorkHistory", $$WorkHistory, {})}${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "CenteredModal", $$CenteredModal, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<svg class="bg-indigo-200 text-indigo-600 rounded-full p-4 h-24 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"></path>
    </svg>${renderComponent($$result, "Input", $$Input, { "label": "Name" })}${renderComponent($$result, "Input", $$Input, { "label": "Email Address" })}${renderComponent($$result, "TextArea", $$TextArea, { "label": "Message" })}${renderComponent($$result, "Button", $$Button, {}, { "default": () => renderTemplate`send` })}` })}` })}`;
}, "/Users/austin/git/stripedpurple.io/src/pages/index.astro");

const $$file = "/Users/austin/git/stripedpurple.io/src/pages/index.astro";
const $$url = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _ };
