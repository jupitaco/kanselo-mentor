import { ApiResponse } from "./auths";

export type TemplateType = {
  _id: string;
  userId: string;
  price: number;
  title: string;
  coverImage: string;
  fileUrl: string;
  totalSold: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTemplateType = {
  price: number;
  title: string;
  coverImage: string;
  fileUrl: string;
};

export type TemplateStatType = {
  thisWeek: number;
  lastWeek: number;
  percentageChange: number;
};

export type TemplateStatRsp = ApiResponse & {
  data: {
    totalTemplates: number;
    totalSales: number;
    totalIncome: number;
    weeklyComparison: {
      templates: TemplateStatType;
      sales: TemplateStatType;
      income: TemplateStatType;
    };
  };
};

export type TemplatesRsp = ApiResponse & {
  data: {
    page: 1;
    limit: 10;
    total: 3;
    totalPages: 1;
    templates: TemplateType[];
  };
};

export type TemplateRsp = ApiResponse & {
  data: TemplateType;
};
