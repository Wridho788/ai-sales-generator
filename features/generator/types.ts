export type SalesPage = {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  benefits: {
    title: string;
    description: string;
  }[];
};

export type GeneratorInput = {
  productName: string;
  description: string;
  audience: string;
  tone: string;
};
