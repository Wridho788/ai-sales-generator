export type SalesPage = {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    imageUrl?: string;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  pricing: {
    title: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    recommended?: boolean;
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
};

export type GeneratorInput = {
  productName: string;
  description: string;
  audience: string;
  tone: string;
};