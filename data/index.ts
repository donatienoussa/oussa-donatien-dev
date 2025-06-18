export const navItems = [
  { name: "À Propos", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "Projets", link: "#projects" },
  { name: "Témoignages", link: "#testimonials" },
  { name: "Blog", link: "blog"},
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Je privilégie la collaboration avec les clients en favorisant une communication ouverte.",
    description: "",
    className: "bg-white  lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "text-white justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Je suis flexible sur les fuseaux horaires",
    description: "",
    className: "bg-white lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Mon tech stack",
    description: "Je cherche constamment à m'améliorer.",
    className: "bg-white lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: " text-sm justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Passionné de technologie avec un fort intérêt pour le développement mobile",
    description: "",
    className: "bg-white lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "J'écris un code de qualité et testable",
    description: "Coder, c'est un art",
    className: "bg-white md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Seriez-vous disposé(e) à initier une collaboration sur un projet ?",
    description: "",
    className: "bg-white lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "text-white justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const services = [
  {
    id: "dev-web-mobile",
    title: "Développement web & mobile sur mesure",
    shortDescription:
      "Applications web (Next.js) et mobiles (React Native) rapides, modernes et adaptées à vos besoins métier.",
    type: "fullstack",
  },
  {
    id: "dev-ia-fintech",
    title: "Applications intelligentes IA & FinTech",
    shortDescription:
      "Ajout de fonctionnalités IA (chatbots, OCR, analyse) et FinTech (paiement, scoring, crypto) à vos apps.",
    type: "mobile",
  },
  {
    id: "backend-api",
    title: "API & backends sécurisés et fluides",
    shortDescription:
      "Développement d’API REST/GraphQL et backends robustes avec NestJS, Supabase ou Appwrite.",
    type: "backend",
  },
  {
    id: "cms-portail",
    title: "CMS Headless & portails personnalisés",
    shortDescription:
      "Systèmes de gestion de contenu sur mesure avec Strapi, Next.js ou Appwrite, adaptés aux collectivités ou entreprises.",
    type: "web",
  },
  {
    id: "mvp-prototypage",
    title: "Prototypage rapide & MVP",
    shortDescription:
      "Conception rapide d’un MVP complet (web ou mobile) en 2 à 3 semaines pour valider votre idée ou pour l'améliorer",
    type: "fullstack",
  },
  {
    id: "maintenance-evolution",
    title: "Maintenance, audit & évolutions techniques",
    shortDescription:
      "Suivi technique, correctifs, évolutions IA/FinTech, migration vers une stack moderne, robuste et évolutif",
    type: "support",
  },
];


export const companies = [
  {
    id: 1,
    name: "React-Native",
    img: "/react-native.webp",
  },
  {
    id: 2,
    name: "Appwrite",
    img: "/app.svg",
  },
  {
    id: 3,
    name: "Vercel",
    img: "/vercel.svg",
  },
  {
    id: 4,
    name: "Next.js",
    img: "/next.svg",
  },
  {
    id: 5,
    name: "GitHub",
    img: "/git.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Mathématiques & Systèmes d’Information",
    desc: "J’ai obtenu une licence en Mathématiques à la FAST, puis une licence professionnelle en Systèmes d’Information à l’IFRI, où j’ai développé mes compétences en développement logiciel et architecture des systèmes.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Stage au Port Autonome de Cotonou – Projet informatique",
    desc: "Lors de ma formation à l’IFRI, j’ai effectué un stage au Port Autonome de Cotonou. J’y ai conçu une application web interne, structuré mes premières solutions réelles et découvert les exigences du développement en entreprise.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Spécialisation mobile & IA – React Native, Supabase, GPT",
    desc: "Je me suis spécialisé en développement mobile multiplateforme (React Native) avec backend (Supabase, NestJS). J’ai aussi été formé à l’IA appliquée (NLP, OCR, LLM) par Africa Tech Up Tour pour enrichir mes projets mobiles.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Développeur freelance : IA & FinTech au cœur du mobile",
    desc: "Aujourd’hui, je conçois des apps mobiles intelligentes, intégrant IA (GPT, génération) et FinTech (paiement, crypto). J’interviens sur tout le cycle produit : de l’idée au déploiement sur les stores, en freelance ou en mission.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];




export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: 'https://github.com/donatienoussa'
  },
  {
    id: 2,
    img: "/twit.svg",
    link: 'https://twitter.com/donatien_oussa1'
  },
  {
    id: 3,
    img: "/link.svg",
    link: 'https://linkedin.com/in/donatien-oussa-80269b268'
  },
];
