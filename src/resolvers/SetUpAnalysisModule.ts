import { moduleParameters } from "@prisma/client";
import { Context } from "..";

export const SetUpAnalysisModule = {
  pipelineId: async (
    { id: setUpAnalysisModuleId }: { id: string },
    __: any,
    { prisma }: Context
  ) => {
    console.log("setUpAnalysisModuleId", setUpAnalysisModuleId);
    const pipelineByAnalysisModuleId = await prisma.pipelineModules.findFirst({
      where: { setUpAnalysisModuleId },
    });
    console.log("pipelineByAnalysisModuleId", pipelineByAnalysisModuleId);
    return pipelineByAnalysisModuleId?.setUpPipelineAssesmentId;
  },
};
