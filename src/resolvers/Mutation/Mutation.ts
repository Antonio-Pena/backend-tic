import { analysisModuleResolvers } from "./analysisModule";
import { setUpAnalysisModuleResolvers } from "./setUpAnalysisModule";
import { setUpPipelineAssesmentResolvers } from "./setUpPipelineAssesment";

export const Mutation = {
  ...analysisModuleResolvers,
  ...setUpAnalysisModuleResolvers,
  ...setUpPipelineAssesmentResolvers,
};
