import { analysisModuleResolvers } from "./analysisModule";
import { setUpAnalysisModuleResolvers } from "./setUpAnalysisModule";

export const Mutation = {
  ...analysisModuleResolvers,
  ...setUpAnalysisModuleResolvers,
};
