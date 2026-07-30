export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  type: "Service" | "Technology" | "Industry" | "Company";
  parentMenu: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "Active" | "Inactive";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface JobPost {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  image: string;
  status: "Active" | "Inactive";
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  client: string;
  status: "Active" | "Inactive";
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  image: string;
  status: "Active" | "Inactive";
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon: string;
  category: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface CompanyJourney {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface Service {
  id: string;
  parentService: string;
  title: string;
  description: string;
  status: "Active" | "Inactive";
  order: number;
}

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { label: string; href: string }[];
}
