export type Post = {
  id: string;
  title: string;
  supplier: string;
  amountZar: number;
  thumbnailUrl: string;
  imageUrl: string;
  dueAt?: string;
  description?: string; 
};

export const ALL_POSTS: Post[] = [
  {
    id: "1",
    title: "Cloud Services Retainer",
    supplier: "Thrive Business Solutions",
    amountZar: 12500.5,
    thumbnailUrl: "https://picsum.photos/id/1015/200/120",
    imageUrl: "https://picsum.photos/id/1015/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    description: "Monthly subscription for cloud hosting and maintenance services to ensure your infrastructure is always up and running."
  },
  {
    id: "2",
    title: "Recruitment Fees",
    supplier: "Connect HR",
    amountZar: 8900,
    thumbnailUrl: "https://picsum.photos/id/1025/200/120",
    imageUrl: "https://picsum.photos/id/1025/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    description: "Fees related to recruitment services for hiring qualified personnel to support your business growth."
  },
  {
    id: "3",
    title: "Engineering Bootcamp",
    supplier: "Dev Science",
    amountZar: 15200,
    thumbnailUrl: "https://picsum.photos/id/1035/200/120",
    imageUrl: "https://picsum.photos/id/1035/1200/720",
    description: "An intensive 6-week coding bootcamp designed to upskill your engineering team in modern technologies and best practices."
  },
  {
    id: "4",
    title: "Marketing Consultation",
    supplier: "BrandUp Agency",
    amountZar: 11000,
    thumbnailUrl: "https://picsum.photos/id/1040/200/120",
    imageUrl: "https://picsum.photos/id/1040/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
    description: "Expert marketing advice and strategy planning to improve brand awareness and customer engagement."
  },
  {
    id: "5",
    title: "Product Design Sprint",
    supplier: "Creative Labs",
    amountZar: 9500,
    thumbnailUrl: "https://picsum.photos/id/1050/200/120",
    imageUrl: "https://picsum.photos/id/1050/1200/720",
    description: "A fast-paced workshop to prototype and validate new product ideas, improving time to market."
  },
  {
    id: "6",
    title: "Social Media Campaign",
    supplier: "SocialBee",
    amountZar: 8300,
    thumbnailUrl: "https://picsum.photos/id/1060/200/120",
    imageUrl: "https://picsum.photos/id/1060/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
    description: "Comprehensive social media campaign to increase followers, engagement, and sales conversion."
  },
  {
    id: "7",
    title: "Financial Audit",
    supplier: "Numbers & Co.",
    amountZar: 13400,
    thumbnailUrl: "https://picsum.photos/id/1070/200/120",
    imageUrl: "https://picsum.photos/id/1070/1200/720",
    description: "Detailed financial audit ensuring compliance and identifying areas to optimize costs and improve reporting."
  },
  {
    id: "8",
    title: "Website Redesign",
    supplier: "Pixel Perfect",
    amountZar: 17500,
    thumbnailUrl: "https://picsum.photos/id/1080/200/120",
    imageUrl: "https://picsum.photos/id/1080/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
    description: "Full redesign of your corporate website for improved UX/UI, speed, and mobile responsiveness."
  },
  {
    id: "9",
    title: "Cybersecurity Assessment",
    supplier: "SecureNet",
    amountZar: 14200,
    thumbnailUrl: "https://picsum.photos/id/1011/200/120",
    imageUrl: "https://picsum.photos/id/1011/1200/720",
    description: "Comprehensive evaluation of your IT systems to identify vulnerabilities and recommend protections."
  },
  {
    id: "10",
    title: "Customer Support Outsourcing",
    supplier: "HelpDesk Pros",
    amountZar: 7800,
    thumbnailUrl: "https://picsum.photos/id/1018/200/120",
    imageUrl: "https://picsum.photos/id/1018/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 50).toISOString(),
    description: "Outsource your customer support operations for 24/7 service and improved customer satisfaction."
  },
  {
    id: "11",
    title: "Data Analytics Setup",
    supplier: "Insightify",
    amountZar: 12300,
    thumbnailUrl: "https://picsum.photos/id/1024/200/120",
    imageUrl: "https://picsum.photos/id/1024/1200/720",
    description: "Setup of data pipelines and dashboards to provide actionable business insights."
  },
  {
    id: "12",
    title: "Legal Advisory",
    supplier: "Law & Partners",
    amountZar: 15000,
    thumbnailUrl: "https://picsum.photos/id/1020/200/120",
    imageUrl: "https://picsum.photos/id/1020/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
    description: "Professional legal advice to ensure your contracts and business operations are compliant."
  },

  {
    id: "13",
    title: "SEO Optimization",
    supplier: "SearchLight",
    amountZar: 9800,
    thumbnailUrl: "https://picsum.photos/id/1084/200/120",
    imageUrl: "https://picsum.photos/id/1084/1200/720",
    description: "Improving website ranking with targeted SEO techniques."
  },
{
  id: "14",
  title: "Mobile App Development",
  supplier: "AppWorks",
  amountZar: 21000,
  thumbnailUrl: "https://picsum.photos/id/1027/200/120",
  imageUrl: "https://picsum.photos/id/1027/1200/720",
  dueAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
  description: "Full-stack mobile app development for Android and iOS platforms."
},
{
  id: "15",
  title: "Corporate Training",
  supplier: "SkillForge",
  amountZar: 8600,
  thumbnailUrl: "https://picsum.photos/id/1031/200/120",
  imageUrl: "https://picsum.photos/id/1031/1200/720",
  description: "Training sessions to improve employee productivity and skill set."
},
{
  id: "16",
  title: "Video Production",
  supplier: "VisualCraft",
  amountZar: 14200,
  thumbnailUrl: "https://picsum.photos/id/1033/200/120",
  imageUrl: "https://picsum.photos/id/1033/1200/720",
  description: "High-quality video creation for advertising and promotions."
},
{
  id: "17",
  title: "Cloud Migration",
  supplier: "Skyline IT",
  amountZar: 19500,
  thumbnailUrl: "https://picsum.photos/id/1036/200/120",
  imageUrl: "https://picsum.photos/id/1036/1200/720",
  dueAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
  description: "Migrating your infrastructure safely and efficiently to the cloud."
},
{
  id: "18",
  title: "Content Writing",
  supplier: "WriteRight",
  amountZar: 7200,
  thumbnailUrl: "https://picsum.photos/id/1039/200/120",
  imageUrl: "https://picsum.photos/id/1039/1200/720",
  description: "Professional content creation for blogs, websites, and marketing."
},
{
  id: "19",
  title: "IT Support",
  supplier: "TechCare",
  amountZar: 10200,
  thumbnailUrl: "https://picsum.photos/id/1042/200/120",
  imageUrl: "https://picsum.photos/id/1042/1200/720",
  description: "On-demand IT support for your business."
},
{
  id: "20",
  title: "Graphic Design",
  supplier: "DesignHub",
  amountZar: 8000,
  thumbnailUrl: "https://picsum.photos/id/1044/200/120",
  imageUrl: "https://picsum.photos/id/1044/1200/720",
  description: "Custom graphics and branding materials."
},
{
  id: "21",
  title: "Event Management",
  supplier: "Eventique",
  amountZar: 14000,
  thumbnailUrl: "https://picsum.photos/id/1047/200/120",
  imageUrl: "https://picsum.photos/id/1047/1200/720",
  dueAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
  description: "Organizing corporate events and conferences."
},
{
  id: "22",
  title: "Software Licensing",
  supplier: "SoftSolutions",
  amountZar: 17000,
  thumbnailUrl: "https://picsum.photos/id/1050/200/120",
  imageUrl: "https://picsum.photos/id/1050/1200/720",
  description: "Enterprise software licenses for your teams."
},
{
  id: "23",
  title: "Hardware Procurement",
  supplier: "TechSupply",
  amountZar: 20000,
  thumbnailUrl: "https://picsum.photos/id/1053/200/120",
  imageUrl: "https://picsum.photos/id/1053/1200/720",
  description: "Supplying latest hardware and peripherals."
},
{
  id: "24",
  title: "Office Renovation",
  supplier: "BuildIt",
  amountZar: 25000,
  thumbnailUrl: "https://picsum.photos/id/1056/200/120",
  imageUrl: "https://picsum.photos/id/1056/1200/720",
  description: "Modernizing your office space for a better working environment."
},
{
  id: "25",
  title: "Translation Services",
  supplier: "LinguaPros",
  amountZar: 6300,
  thumbnailUrl: "https://picsum.photos/id/1059/200/120",
  imageUrl: "https://picsum.photos/id/1059/1200/720",
  description: "Professional translation for multilingual communication."
},
{
  id: "26",
  title: "Training Materials",
  supplier: "EduCraft",
  amountZar: 5500,
  thumbnailUrl: "https://picsum.photos/id/1061/200/120",
  imageUrl: "https://picsum.photos/id/1061/1200/720",
  description: "Development of manuals and training documentation."
},
{
  id: "27",
  title: "Market Research",
  supplier: "Insight Partners",
  amountZar: 16000,
  thumbnailUrl: "https://picsum.photos/id/1063/200/120",
  imageUrl: "https://picsum.photos/id/1063/1200/720",
  description: "In-depth market analysis to support business decisions."
},
{
  id: "28",
  title: "Email Marketing",
  supplier: "MailGen",
  amountZar: 7800,
  thumbnailUrl: "https://picsum.photos/id/1065/200/120",
  imageUrl: "https://picsum.photos/id/1065/1200/720",
  description: "Effective email campaigns for customer retention."
},
{
  id: "29",
  title: "Customer Loyalty Program",
  supplier: "LoyaltyPlus",
  amountZar: 11200,
  thumbnailUrl: "https://picsum.photos/id/1067/200/120",
  imageUrl: "https://picsum.photos/id/1067/1200/720",
  description: "Building programs to increase repeat customers."
},
{
  id: "30",
  title: "Business Coaching",
  supplier: "CoachPro",
  amountZar: 13200,
  thumbnailUrl: "https://picsum.photos/id/1069/200/120",
  imageUrl: "https://picsum.photos/id/1069/1200/720",
  description: "Personalized coaching to improve leadership and strategy."
},

];
