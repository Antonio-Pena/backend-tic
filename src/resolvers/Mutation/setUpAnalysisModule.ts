import { Prisma } from "@prisma/client";
import { Context } from "../..";
import { uuid } from "uuidv4";

interface setAnalysisModuleCreateArgs {
  input: {
    analysisModuleId: string;
    parameters: [{ name: string; value: string }];
  };
}
interface setAnalysisModuleUpdateArgs {
  input: {
    id: string;
    parameters: [{ name: string; value: string }];
  };
}

export const setUpAnalysisModuleResolvers = {
  setUpAnalysisModuleCreate: async (
    _: any,
    { input }: setAnalysisModuleCreateArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { analysisModuleId, parameters } = input;
    const analysisModuleFound = await prisma.analysisModules.findFirst({
      where: { id: analysisModuleId },
    });
    if (!analysisModuleFound) {
      return false;
    }
    console.log(analysisModuleFound);

    await prisma.setUpAnalysisModules.create({
      data: {
        id: uuid(),
        name: analysisModuleFound!.name,
        version: analysisModuleFound!.version,
        parameters,
      },
    });

    return true;
  },
  setUpAnalysisModuleUpdate: async (
    _: any,
    { input }: setAnalysisModuleUpdateArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { id, parameters } = input;
    const existingSetUpAnalysisModule =
      await prisma.setUpAnalysisModules.findFirst({
        where: { id },
      });
    if (!existingSetUpAnalysisModule) {
      return false;
    }

    await prisma.setUpAnalysisModules.update({
      data: {
        parameters,
      },
      where: { id },
    });

    return true;
  },

  setUpAnalysisModuleDelete: async (
    _: any,
    { id }: { id: string },
    { prisma }: Context
  ): Promise<Boolean> => {
    const setUpAnalysisModuleToDelete =
      await prisma.setUpAnalysisModules.findUnique({
        where: { id },
      });

    if (!setUpAnalysisModuleToDelete) {
      return false;
    }

    await prisma.setUpAnalysisModules.update({
      data: {
        ...setUpAnalysisModuleToDelete,
        isActive: false,
      },
      where: { id },
    });
    return true;
  },
};
