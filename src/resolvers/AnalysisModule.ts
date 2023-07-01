import { moduleParameters } from "@prisma/client";
import { Context } from "..";

export const AnalysisModule = {
  parameters: async (
    { id: analysisModuleId }: { id: string },
    __: any,
    { prisma }: Context
  ) => {
    const paramatersByAnalysisModuleId = await prisma.moduleParameters.findMany(
      {
        where: { analysisModuleId },
      }
    );
    const params = async (item: moduleParameters) => {
      return await prisma.parameters.findFirst({
        where: { id: item.parameterId },
      });
    };
    return await Promise.all(paramatersByAnalysisModuleId.map(params));
  },
};
