import { Context } from "../..";

interface setUpPipelineAssesmentArgs {
  input: {
    id: string;
    name: string;
    version: string;
  };
}

export const setUpPipelineAssesmentResolvers = {
  setUpPipelineAssesmentCreate: async (
    _: any,
    { input }: setUpPipelineAssesmentArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { id, name, version } = input;
    if (!id || !name || !version) {
      return false;
    }

    await prisma.setUpPipelineAssesment.create({ data: { id, name, version } });
    return true;
  },
  setUpPipelineAssesmentUpdate: async (
    _: any,
    { input }: setUpPipelineAssesmentArgs,
    { prisma }: Context
  ): Promise<Boolean> => {
    const { id, name, version } = input;
    if (!id) {
      return false;
    }

    const existingSetUpPipelineAssesment =
      await prisma.setUpPipelineAssesment.findUnique({
        where: { id },
      });
    if (!existingSetUpPipelineAssesment) {
      return false;
    }

    let setUpPipelineAssesmentToUpdate = { id, name, version };

    await prisma.setUpPipelineAssesment.update({
      data: {
        ...setUpPipelineAssesmentToUpdate,
      },
      where: { id },
    });

    return true;
  },
  setUpPipelineAssesmentDelete: async (
    _: any,
    { id }: { id: string },
    { prisma }: Context
  ): Promise<Boolean> => {
    const setUpPipelineAssesmentToDelete =
      await prisma.setUpPipelineAssesment.findUnique({
        where: { id },
      });

    if (!setUpPipelineAssesmentToDelete) {
      return false;
    }

    await prisma.setUpPipelineAssesment.update({
      data: {
        ...setUpPipelineAssesmentToDelete,
        isActive: false,
      },
      where: { id },
    });
    return true;
  },
};
