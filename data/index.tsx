import {
  FiBox,
  FiLayers,
  FiMessageCircle,
  FiFileText,
} from 'react-icons/fi'



export const navItems = [
  { name: "À Propos", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "Projets", link: "#projects" },
  { name: "Témoignages", link: "#testimonials" },
  { name: "Blog", link: "blog"},
  { name: "Contact", link: "#contact" },
];

export const dashbordMenuItems = [
  {
    title: 'Services',
    icon: <FiBox />,
    key: 'services',
    links: [
      { href: '/admin/services', label: 'Liste des services' },
      { href: '/admin/services/create', label: 'Ajouter un service' },
    ],
  },
  {
    title: 'Projets',
    icon: <FiLayers />,
    key: 'projects',
    links: [
      { href: '/admin/projects', label: 'Liste des projets' },
      { href: '/admin/projects/create', label: 'Ajouter un projet' },
    ],
  },
  {
    title: 'Blog',
    icon: <FiFileText />,
    key: 'blog',
    links: [
      { href: '/admin/blog', label: 'Articles' },
      { href: '/admin/blog/create', label: 'Ajouter un article' },
    ],
  },
  {
    title: 'Témoignages',
    icon: <FiMessageCircle />,
    key: 'testimonials',
    links: [
      { href: '/admin/testimonials', label: 'Liste des témoignages' },
      { href: '/admin/testimonials/create', label: 'Ajouter un témoignage' },
    ],
  },
  {
    title: 'Technologies',
    icon: <FiBox />,
    key: 'technologies',
    links: [
      { href: '/admin/technologies', label: 'Liste des technologies' },
      { href: '/admin/technologies/create', label: 'Ajouter une technologie' },
    ],
  },
]

export const gridItems = [
  {
    id: 1,
    title: "Je privilégie la collaboration avec les clients en favorisant une communication ouverte.",
    description: "",
    className: "bg-white lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "text-white justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Je suis flexible sur les fuseaux horaires",
    description: "",
    className: "bg-white border-2 lg:col-span-2 md:col-span-3 md:row-span-2",
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
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
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
    description:
      "Transformez vos idées en applications fluides, sécurisées et performantes. Nous concevons sur mesure des plateformes web et mobiles adaptées à votre activité, en mettant l’accent sur l’expérience utilisateur et les performances techniques.",
    type: "fullstack",
    listOfSubServices: [
      "Développement avec Next.js",
      "Développement mobile avec React Native",
      "Optimisation des performances",
      "Responsive design",
    ],
    show: true,
  },
  {
    id: "dev-ia-fintech",
    title: "Applications intelligentes IA & FinTech",
    shortDescription:
      "Ajout de fonctionnalités IA (chatbots, OCR, analyse) et FinTech (paiement, scoring, crypto) à vos apps.",
    description:
      "Offrez une expérience innovante à vos utilisateurs grâce à l’intelligence artificielle et à la FinTech. Chatbots, traitement automatique de documents ou encore intégration de paiements intelligents : votre app gagne en valeur, en efficacité et en attractivité.",
    type: "mobile",
    listOfSubServices: [
      "Intégration de chatbots",
      "Reconnaissance de texte (OCR)",
      "Systèmes de scoring IA",
      "Paiement en ligne",
      "Paiement crypto",
    ],
    show: true,
  },
  {
    id: "backend-api",
    title: "API & backends sécurisés et fluides",
    shortDescription:
      "Développement d’API REST/GraphQL et backends robustes avec NestJS, Supabase ou Appwrite.",
    description:
      "Vos applications reposent sur un moteur invisible : le backend. Je construis des fondations solides, extensibles et sécurisées pour vos projets, avec une gestion efficace des données, de l’authentification et des permissions.",
    type: "backend",
    listOfSubServices: [
      "API REST & GraphQL",
      "Backends avec NestJS",
      "Authentification sécurisée",
      "Stockage Supabase",
      "Stockage Appwrite",
    ],
    show: true,
  },
  {
    id: "cms-portail",
    title: "CMS Headless & portails personnalisés",
    shortDescription:
      "Systèmes de gestion de contenu sur mesure avec Strapi, Next.js ou Appwrite, adaptés aux collectivités ou entreprises.",
    description:
      "Offrez à vos équipes un outil de gestion de contenu simple et puissant. Idéal pour les blogs, intranets, portails ou sites éditoriaux, un CMS headless permet une liberté totale côté design et une gestion structurée du contenu côté administration.",
    type: "web",
    listOfSubServices: [
      "CMS Headless avec Strapi",
      "Portails personnalisés avec Next.js ou Appwrite",
      "Gestion multi-utilisateurs",
      "Rôles & permissions",
    ],
    show: true,
  },
  {
    id: "mvp-prototypage",
    title: "Prototypage rapide & MVP",
    shortDescription:
      "Conception rapide d’un MVP complet (web ou mobile) en 2 à 3 semaines pour valider votre idée ou pour l'améliorer.",
    description:
      "Vous avez une idée, un projet ou un besoin à valider ? Je conçois un prototype fonctionnel ou un MVP qui vous permet d’obtenir des retours concrets, tester votre marché ou convaincre des investisseurs.",
    type: "fullstack",
    listOfSubServices: [
      "Wireframes & maquettes",
      "Développement MVP (web ou mobile)",
      "Déploiement rapide",
      "Tests utilisateurs",
    ],
    show: true,
  },
  {
    id: "maintenance-evolution",
    title: "Maintenance, audit & évolutions techniques",
    shortDescription:
      "Suivi technique, correctifs, évolutions IA/FinTech, migration vers une stack moderne, robuste et évolutive.",
    description:
      "Je vous accompagne sur la durée pour maintenir, sécuriser et faire évoluer vos solutions. Cela inclut la correction de bugs, l’optimisation de performance, ou encore la migration vers une nouvelle technologie pour garantir longévité et scalabilité.",
    type: "support",
    listOfSubServices: [
      "Maintenance continue",
      "Audits de sécurité & performance",
      "Refactoring technique",
      "Migration vers une stack moderne",
    ],
    show: true,
  },
]


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
    img: "/git.png",
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
    img: "/git.png",
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
