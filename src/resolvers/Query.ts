import { Context } from "..";

export const Query = {
  analysisModules: (_: any, __: any, { prisma }: Context) => {
    return prisma.analysisModules.findMany({ orderBy: [{ name: "asc" }] });
  },
  setUpAnalisisModules: (_: any, __: any, { prisma }: Context) => {
    return prisma.setUpAnalysisModules.findMany({ orderBy: [{ name: "asc" }] });
  },
};
