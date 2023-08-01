import { analysisModuleResolvers } from "./analysisModule";
import { setUpAnalysisModuleResolvers } from "./setUpAnalysisModule";
import { setUpPipelineAssesmentResolvers } from "./setUpPipelineAssesment";
import { exec } from "child_process";

export const Mutation = {
  ...analysisModuleResolvers,
  ...setUpAnalysisModuleResolvers,
  ...setUpPipelineAssesmentResolvers,
  runPipeline: () => {
    exec("docker compose up", (error, stdout, stderr) => {
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
