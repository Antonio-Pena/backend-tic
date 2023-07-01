import { Prisma, moduleParameters, parameters } from "@prisma/client";
import { Context } from "../..";
import { uuid } from "uuidv4";

interface analysisModuleArgs {
  input: {
    id: string;
    name?: string;
    version?: string;
    parameters?: [string];
  };
}

export const analysisModuleResolvers = {
  analysisModuleCreate: async (
    _: any,
    { input }: analysisModuleArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { id, name, version, parameters } = input;
    if (!id || !name || !version) {
      return false;
    }

    await prisma.analysisModules.create({ data: { id, name, version } });
    parameters?.forEach(async (parameter) => {
      const parameterFound = await prisma.parameters.findFirst({
        where: {
          name: parameter,
        },
      });
      if (!parameterFound) {
        const newParameterId = uuid();
        await prisma.parameters.create({
          data: { id: newParameterId, name: parameter },
        });
        await prisma.moduleParameters.create({
          data: { analysisModuleId: id, parameterId: newParameterId },
        });
      } else {
        await prisma.moduleParameters.create({
          data: { analysisModuleId: id, parameterId: parameterFound.id },
        });
      }
    });
    return true;
  },
  analysisModuleUpdate: async (
    _: any,
    { input }: analysisModuleArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { id, name, version, parameters } = input;
    if (!id) {
      return false;
    }

    const existingAnalysisModule = await prisma.analysisModules.findUnique({
      where: { id },
    });
    if (!existingAnalysisModule) {
      return false;
    }

    let analysisModuleToUpdate = { id, name, version };

    await prisma.analysisModules.update({
      data: {
        ...analysisModuleToUpdate,
      },
      where: { id },
    });

    const parametersInModule = await prisma.moduleParameters.findMany({
      where: { analysisModuleId: id },
    });

    parameters?.forEach(async (parameter) => {
      const parameterFound = await prisma.parameters.findFirst({
        where: {
          name: parameter,
        },
      });
      if (!parameterFound) {
        const newParameterId = uuid();
        await prisma.parameters.create({
          data: { id: newParameterId, name: parameter },
        });
        await prisma.moduleParameters.create({
          data: { analysisModuleId: id, parameterId: newParameterId },
        });
      }
      if (
        parameterFound &&
        !parametersInModule.find(
          (item) => item.parameterId === parameterFound.id
        )
      ) {
        await prisma.moduleParameters.create({
          data: { analysisModuleId: id, parameterId: parameterFound.id },
        });
      }
    });

    parametersInModule.forEach(async (item) => {
      const parameter = await prisma.parameters.findFirst({
        where: {
          id: item.parameterId,
        },
      });
      if (!parameters?.find((p) => p === parameter?.name)) {
        await prisma.moduleParameters.delete({
          where: {
            analysisModuleId_parameterId: {
              analysisModuleId: id,
              parameterId: parameter!.id,
            },
          },
        });
      }
    });

    return true;
  },
  analysisModuleDelete: async (
    _: any,
    { id }: { id: string },
    { prisma }: Context
  ): Promise<Boolean> => {
    const analysisModuleToDelete = await prisma.analysisModules.findUnique({
      where: { id },
    });

    if (!analysisModuleToDelete) {
      return false;
    }

    await prisma.analysisModules.update({
      data: {
        ...analysisModuleToDelete,
        isActive: false,
      },
      where: { id },
    });
    return true;
  },
};
