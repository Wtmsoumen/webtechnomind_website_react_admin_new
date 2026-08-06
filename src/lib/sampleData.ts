import { MenuItem, Review, TeamMember, JobPost, Technology, Contact, CaseStudy, GalleryItem, CompanyJourney, Product, Service } from "@/types";

export const sampleMenus: MenuItem[] = [
  { id: "1", name: "About WTM", slug: "about-wtm", type: "Company", parentMenu: "Company", order: 19, status: "Active" },
  { id: "2", name: "AI & ML", slug: "ai-ml", type: "Technology", parentMenu: "Technologies", order: 39, status: "Active" },
  { id: "3", name: "AI by Industry", slug: "ai-by-industry", type: "Service", parentMenu: "Ai Solutions", order: 23, status: "Active" },
  { id: "4", name: "AI Development", slug: "ai-development", type: "Service", parentMenu: "Ai Solutions", order: 17, status: "Active" },
  { id: "5", name: "Ai Solutions", slug: "ai-solutions", type: "Service", parentMenu: "", order: 2, status: "Active" },
  { id: "6", name: "Backend", slug: "backend", type: "Technology", parentMenu: "Technologies", order: 35, status: "Active" },
  { id: "7", name: "Business & Tech", slug: "business-tech", type: "Industry", parentMenu: "Industry", order: 20, status: "Active" },
  { id: "8", name: "Cloud", slug: "cloud", type: "Technology", parentMenu: "Technologies", order: 38, status: "Active" },
  { id: "9", name: "Cloud & DevOps", slug: "cloud-devops", type: "Service", parentMenu: "Services", order: 32, status: "Active" },
  { id: "10", name: "CMS / eCommerce", slug: "cms-ecommerce", type: "Technology", parentMenu: "Technologies", order: 37, status: "Active" },
  { id: "11", name: "Web Development", slug: "web-development", type: "Service", parentMenu: "Services", order: 5, status: "Active" },
  { id: "12", name: "Mobile Development", slug: "mobile-development", type: "Service", parentMenu: "Services", order: 6, status: "Active" },
  { id: "13", name: "Digital Marketing", slug: "digital-marketing", type: "Service", parentMenu: "Services", order: 7, status: "Active" },
  { id: "14", name: "UI/UX Design", slug: "ui-ux-design", type: "Service", parentMenu: "Services", order: 8, status: "Active" },
  { id: "15", name: "SaaS Development", slug: "saas-development", type: "Service", parentMenu: "Services", order: 9, status: "Active" },
];

export const sampleServices: Service[] = [
  { id: "1", parentService: "", title: "Ai Product Development", description: "Transform your business with AI Product Development services from Web Technomind...", status: "Active", order: 4 },
  { id: "2", parentService: "", title: "ML Development", description: "Boost business growth with advanced ML Development services from Web Technomind....", status: "Active", order: 6 },
  { id: "3", parentService: "", title: "Machine Learning & Deep Learning", description: "ddd", status: "Active", order: 7 },
  { id: "4", parentService: "", title: "Social Media Marketing", description: "Boost your brand with professional Social Media Marketing in Kolkata. Webtechnom...", status: "Active", order: 8 },
  { id: "5", parentService: "", title: "Digital Marketing Strategy", description: "Looking for a trusted Digital Marketing Agency in Kolkata? WebTechnoMind offers...", status: "Active", order: 9 },
  { id: "6", parentService: "", title: "Trusted Influencer Marketing Agency", description: "sdsdda", status: "Active", order: 10 },
  { id: "7", parentService: "", title: "Search Engine Optimization", description: "sss", status: "Active", order: 11 },
  { id: "8", parentService: "", title: "Lead Generation", description: "sssss", status: "Active", order: 12 },
  { id: "9", parentService: "", title: "Brand Management", description: "sssssss", status: "Active", order: 13 },
  { id: "10", parentService: "", title: "Specialized eCommerce SEO Services", description: "sdsd", status: "Active", order: 14 },
];

export const sampleIndustries = [
  { id: "1", name: "Agriculture", parent: "Business & Tech", status: "Active", order: 23 },
  { id: "2", name: "Automotive", parent: "Business & Tech", status: "Active", order: 9 },
  { id: "3", name: "Aviation", parent: "", status: "Active", order: 20 },
  { id: "4", name: "ECommerce", parent: "", status: "Active", order: 1 },
  { id: "5", name: "Education", parent: "", status: "Active", order: 3 },
  { id: "6", name: "Electric Vehicle", parent: "", status: "Active", order: 18 },
  { id: "7", name: "Entertainment", parent: "", status: "Active", order: 14 },
  { id: "8", name: "Events", parent: "", status: "Active", order: 11 },
  { id: "9", name: "Fintech", parent: "", status: "Active", order: 21 },
  { id: "10", name: "Fitness & Wellness", parent: "", status: "Active", order: 13 },
];

export const sampleTechMenus = [
  { id: "1", name: "Angular", parent: "Frontend", status: "Active", order: 4 },
  { id: "2", name: "AWS", parent: "Cloud", status: "Active", order: 22 },
  { id: "3", name: "Azure", parent: "Cloud", status: "Active", order: 24 },
  { id: "4", name: "ChromaDB", parent: "AI & ML", status: "Active", order: 30 },
  { id: "5", name: "Claude", parent: "AI & ML", status: "Active", order: 26 },
  { id: "6", name: "Codeignitor", parent: "Backend", status: "Active", order: 14 },
  { id: "7", name: "CSS3", parent: "Frontend", status: "Active", order: 7 },
  { id: "8", name: "Express.js", parent: "Backend", status: "Active", order: 11 },
  { id: "9", name: "Flutter", parent: "Mobile", status: "Active", order: 15 },
  { id: "10", name: "Gemini", parent: "AI & ML", status: "Active", order: 27 },
];

export const sampleCompanyMenus = [
  { id: "1", name: "About Us", slug: "about-us", parentCompany: "About WTM", status: "Active", order: 1 },
  { id: "2", name: "Careers", slug: "careers", parentCompany: "About WTM", status: "Active", order: 6 },
  { id: "3", name: "Case Studies", slug: "case-studies", parentCompany: "", status: "Active", order: 4 },
  { id: "4", name: "Contact Us", slug: "contact-us", parentCompany: "", status: "Active", order: 7 },
  { id: "5", name: "How We Work", slug: "how-we-work", parentCompany: "", status: "Active", order: 2 },
  { id: "6", name: "Life at Webtechnomind", slug: "life-at-webtechnomind", parentCompany: "", status: "Active", order: 8 },
  { id: "7", name: "Our Product", slug: "our-products", parentCompany: "", status: "Active", order: 9 },
  { id: "8", name: "Our Team", slug: "our-team", parentCompany: "", status: "Active", order: 5 },
  { id: "9", name: "Contact & Testimonials", slug: "Contact-testimonials", parentCompany: "", status: "Active", order: 3 },
];

export const sampleServiceMenus = [
  { id: "1", name: "Web Development", parent: "Services", status: "Active", order: 5 },
  { id: "2", name: "Mobile Development", parent: "Services", status: "Active", order: 6 },
  { id: "3", name: "Digital Marketing", parent: "Services", status: "Active", order: 7 },
  { id: "4", name: "UI/UX Design", parent: "Services", status: "Active", order: 8 },
  { id: "5", name: "SaaS Development", parent: "Services", status: "Active", order: 9 },
  { id: "6", name: "Cloud & DevOps", parent: "Services", status: "Active", order: 32 },
  { id: "7", name: "AI Development", parent: "Ai Solutions", status: "Active", order: 17 },
  { id: "8", name: "AI by Industry", parent: "Ai Solutions", status: "Active", order: 23 },
];

export const sampleProducts: Product[] = [
  { id: "1", name: "AI Chatbot", slug: "ai-chatbot", description: "AI-powered customer support chatbot", image: "/images/product1.jpg", status: "Active" },
  { id: "2", name: "CRM System", slug: "crm-system", description: "Custom CRM for businesses", image: "/images/product2.jpg", status: "Active" },
  { id: "3", name: "E-Commerce Platform", slug: "e-commerce-platform", description: "Full-featured e-commerce solution", image: "/images/product3.jpg", status: "Active" },
];

export const sampleReviews: Review[] = [
  { id: "1", name: "John Doe", company: "Tech Corp", rating: 5, review: "Excellent service and delivery!", image: "", status: "Active" },
  { id: "2", name: "Sarah Wilson", company: "StartUp Inc", rating: 4, review: "Great team, delivered on time.", image: "", status: "Active" },
  { id: "3", name: "Mike Johnson", company: "Global Solutions", rating: 5, review: "Outstanding quality of work.", image: "", status: "Active" },
];

export const sampleTeam: TeamMember[] = [
  { id: "1", name: "Amit Singh", role: "CEO & Founder", image: "", order: 1, status: "Active" },
  { id: "2", name: "Priya Sharma", role: "CTO", image: "", order: 2, status: "Active" },
  { id: "3", name: "Rahul Kumar", role: "Lead Developer", image: "", order: 3, status: "Active" },
];

export const sampleJobs: JobPost[] = [
  { id: "1", title: "Senior React Developer", location: "Remote", type: "Full-time", experience: "3-5 years", status: "Active", createdAt: "2026-07-15" },
  { id: "2", title: "UI/UX Designer", location: "Hybrid", type: "Full-time", experience: "2-4 years", status: "Active", createdAt: "2026-07-10" },
];

export const sampleTechnologies: Technology[] = [
  { id: "1", name: "React", slug: "react", icon: "⚛️", category: "Frontend", order: 1, status: "Active" },
  { id: "2", name: "Next.js", slug: "nextjs", icon: "▲", category: "Frontend", order: 2, status: "Active" },
  { id: "3", name: "Node.js", slug: "nodejs", icon: "🟢", category: "Backend", order: 3, status: "Active" },
  { id: "4", name: "Python", slug: "python", icon: "🐍", category: "Backend", order: 4, status: "Active" },
];

export const sampleContacts: Contact[] = [
  { id: "1", title: "E-Commerce Redesign", slug: "ecommerce-redesign", category: "Web", image: "", client: "RetailCo", status: "Active" },
  { id: "2", title: "Mobile Banking App", slug: "mobile-banking", category: "Mobile", image: "", client: "FinBank", status: "Active" },
];

export const sampleCaseStudies: CaseStudy[] = [
  { id: "1", title: "AI Integration for Healthcare", slug: "ai-healthcare", client: "MedTech", industry: "Healthcare", image: "", status: "Active" },
  { id: "2", title: "SaaS Platform Migration", slug: "saas-migration", client: "CloudCo", industry: "Technology", image: "", status: "Active" },
];

export const sampleGallery: GalleryItem[] = [
  { id: "1", title: "Office", image: "", category: "Team", order: 1, status: "Active" },
  { id: "2", title: "Team Event", image: "", category: "Events", order: 2, status: "Active" },
];

export const sampleJourney: CompanyJourney[] = [
  { id: "1", year: "2019", title: "Founded", description: "Company established", order: 1, status: "Active" },
  { id: "2", year: "2020", title: "First Client", description: "Secured first enterprise client", order: 2, status: "Active" },
  { id: "3", year: "2022", title: "50+ Clients", description: "Reached 50+ satisfied clients", order: 3, status: "Active" },
  { id: "4", year: "2024", title: "AI Solutions", description: "Launched AI product line", order: 4, status: "Active" },
];
