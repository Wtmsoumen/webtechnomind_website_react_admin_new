export interface SubPageConfig {
  title: string;
  entityLabel: string;
  parentName: string;
  posttype: string;
  basePath: string;
  addLabel: string;
}

export const subPageConfigs: Record<string, SubPageConfig> = {
  "ai-solutions": {
    title: "AI Solutions",
    entityLabel: "AI Solution",
    parentName: "AI Solutions",
    posttype: "service",
    basePath: "/ai-solutions",
    addLabel: "Add AI Solution",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    entityLabel: "Digital Marketing",
    parentName: "Digital Marketing",
    posttype: "service",
    basePath: "/digital-marketing",
    addLabel: "Add Service",
  },
  "web-software": {
    title: "Web & Software Development",
    entityLabel: "Web & Software",
    parentName: "Web & Software Development",
    posttype: "service",
    basePath: "/web-software",
    addLabel: "Add Service",
  },
  services: {
    title: "Services",
    entityLabel: "Service",
    parentName: "Services",
    posttype: "service",
    basePath: "/services",
    addLabel: "Add Service",
  },
  industries: {
    title: "Industries",
    entityLabel: "Industry",
    parentName: "Industries",
    posttype: "service",
    basePath: "/industries",
    addLabel: "Add Industry",
  },
  technologies: {
    title: "Technologies",
    entityLabel: "Technology",
    parentName: "Technologies",
    posttype: "technology",
    basePath: "/technologies",
    addLabel: "Add Technology",
  },
};
