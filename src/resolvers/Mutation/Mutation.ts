import { analysisModuleResolvers } from "./analysisModule";
import { runStopPipelineResolvers } from "./runStopPipeline";
import { setUpAnalysisModuleResolvers } from "./setUpAnalysisModule";
import { setUpPipelineAssesmentResolvers } from "./setUpPipelineAssesment";

export const Mutation = {
  ...analysisModuleResolvers,
  ...setUpAnalysisModuleResolvers,
  ...setUpPipelineAssesmentResolvers,
  ...runStopPipelineResolvers,
};
