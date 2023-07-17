import { Context } from "..";

export const Query = {
  analysisModules: (_: any, __: any, { prisma }: Context) => {
    return prisma.analysisModules.findMany({ orderBy: [{ name: "asc" }] });
  },
  analysisModule: (
    _: any,
    { analysisModuleId }: { analysisModuleId: string },
    { prisma }: Context
  ) => {
    return prisma.analysisModules.findUnique({
      where: { id: analysisModuleId },
    });
  },
  parameters: (_: any, __: any, { prisma }: Context) => {
    return prisma.parameters.findMany({ orderBy: [{ name: "asc" }] });
  },
  setUpAnalisisModules: (_: any, __: any, { prisma }: Context) => {
    return prisma.setUpAnalysisModules.findMany({ orderBy: [{ name: "asc" }] });
  },
  setUpAnalysisModule: (
    _: any,
    { analysisModuleId }: { analysisModuleId: string },
    { prisma }: Context
  ) => {
    return prisma.setUpAnalysisModules.findUnique({
      where: { id: analysisModuleId },
    });
  },
  setUpPipelinesAssesment: (_: any, __: any, { prisma }: Context) => {
    return prisma.setUpPipelineAssesment.findMany({
      orderBy: [{ name: "asc" }],
    });
  },
  setUpPipelineAssesment: (
    _: any,
    { pipelineAssesmentId }: { pipelineAssesmentId: string },
    { prisma }: Context
  ) => {
    return prisma.setUpPipelineAssesment.findUnique({
      where: { id: pipelineAssesmentId },
    });
  },
};
