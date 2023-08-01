import { Context } from "..";

export const SetUpAnalysisModule = {
  pipelineId: async (
    { id: setUpAnalysisModuleId }: { id: string },
    __: any,
    { prisma }: Context
  ) => {
    const pipelineByAnalysisModuleId = await prisma.pipelineModules.findFirst({
      where: { setUpAnalysisModuleId },
    });
    return pipelineByAnalysisModuleId?.setUpPipelineAssesmentId;
  },
};
