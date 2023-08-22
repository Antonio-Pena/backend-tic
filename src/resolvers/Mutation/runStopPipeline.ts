import { exec } from "child_process";
import { Context } from "../..";
import { pipelineModules } from "@prisma/client";
import yaml from "write-yaml-file";

async function writeToFile(fileName: string, data: any) {
  yaml(fileName, data, function (error: any) {
    if (error) {
      console.log(`Got an error trying to write the file: ${error}`);
    }
  });
  console.log(`Wrote data to ${fileName}`);
}

export const runStopPipelineResolvers = {
  runPipeline: async (_: any, { id }: { id: string }, { prisma }: Context) => {
    const setUpPipelineAux = await prisma.setUpPipelineAssesment.findUnique({
      where: { id },
    });
    const setUpAnalysisModulesInPipeline =
      await prisma.pipelineModules.findMany({
        where: { setUpPipelineAssesmentId: id },
      });

    const modules = async (item: pipelineModules) => {
      return await prisma.setUpAnalysisModules.findFirst({
        where: { id: item.setUpAnalysisModuleId },
      });
    };

    const setUpAnalysisModules = await Promise.all(
      setUpAnalysisModulesInPipeline.map(modules)
    );

    const modulesAux = setUpAnalysisModules
      .map((item) => {
        const parametersAux = item?.parameters!;

        return {
          name: item?.name!,
          version: item?.version!,
          parameters: parametersAux!,
          isActive: item?.isActive,
        };
      })
      .filter((item) => item.isActive);

    const services: any = {};
    modulesAux?.forEach((mod) => {
      const parameters: any = {};
      mod.parameters?.forEach((param) => {
        const paramAuxJson = JSON.stringify(param);
        const paramAux = JSON.parse(paramAuxJson);
        const paramValue = paramAux.value as string;
        const value = paramValue.split(" ");
        switch (paramAux.name) {
          case "ports":
          case "volumes":
          case "devices":
          case "networks":
            parameters[paramAux.name] = [...value];
            break;

          case "network_mode":
            const valueAux = '"' + paramValue.toString() + '"';
            console.log(valueAux);
            parameters[paramAux.name] = valueAux;
            break;

          default:
            parameters[paramAux.name] = paramAux.value;
            break;
        }
      });

      services[mod.name!] = parameters;
    });

    const data = {
      version: setUpPipelineAux?.version || "1",
      services: services,
    };

    await writeToFile("docker-compose.yml", data);

    await exec("docker compose up", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    return true;
  },
  stopPipeline: () => {
    exec("docker compose stop", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    return true;
  },
};
