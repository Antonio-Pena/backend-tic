import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    analysisModules: [AnalysisModule]
    analysisModule(analysisModuleId: ID!): AnalysisModule
    parameters: [Parameter]
    setUpAnalisisModules: [SetUpAnalysisModule]
    setUpAnalysisModule(analysisModuleId: ID!): SetUpAnalysisModule
    setUpPipelinesAssesment: [SetUpPipelineAssesment]
    setUpPipelineAssesment(pipelineAssesmentId: ID!): SetUpPipelineAssesment
  }
  type AnalysisModule {
    id: ID!
    name: String!
    version: String!
    isActive: Boolean!
    parameters: [Parameter]
  }
  type Parameter {
    id: ID!
    name: String!
  }

  input CreateAnalysisModuleInput {
    id: ID!
    name: String!
    version: String!
    parameters: [String]
  }
  input UpdateAnalysisModuleInput {
    id: ID!
    name: String
    version: String
    parameters: [String]
  }

  #setup
  type SetUpAnalysisModule {
    id: ID!
    name: String!
    version: String!
    isActive: Boolean!
    parameters: [SetUpParameter]
    pipelineId: String
  }
  type SetUpParameter {
    name: String!
    value: String!
  }
  input SetUpParameterInput {
    name: String!
    value: String!
  }
  type SetUpPipelineAssesment {
    id: ID!
    name: String!
    version: String!
    isActive: Boolean!
  }

  input CreateSetUpAnalysisModuleInput {
    analysisModuleId: ID!
    parameters: [SetUpParameterInput!]!
    pipelineId: String!
  }
  input UpdateSetUpAnalysisModuleInput {
    id: ID!
    parameters: [SetUpParameterInput!]!
  }

  input CreateSetUpPipelineAssesmentInput {
    id: ID!
    name: String!
    version: String!
  }
  input UpdateSetUpPipelineAssesmentInput {
    id: ID!
    name: String
    version: String
  }

  type Mutation {
    analysisModuleCreate(input: CreateAnalysisModuleInput!): Boolean
    analysisModuleUpdate(input: UpdateAnalysisModuleInput!): Boolean
    analysisModuleDelete(id: ID!): Boolean
    setUpAnalysisModuleCreate(input: CreateSetUpAnalysisModuleInput!): Boolean
    setUpAnalysisModuleUpdate(input: UpdateSetUpAnalysisModuleInput!): Boolean
    setUpAnalysisModuleDelete(id: ID!): Boolean
    setUpPipelineAssesmentCreate(
      input: CreateSetUpPipelineAssesmentInput!
    ): Boolean
    setUpPipelineAssesmentUpdate(
      input: UpdateSetUpPipelineAssesmentInput!
    ): Boolean
    setUpPipelineAssesmentDelete(id: ID!): Boolean
    runPipeline: Boolean
    stopPipeline: Boolean
  }

  # enum Operator {
  #   EQUAL
  #   CONTAINS
  #   NOT_EQUAL
  #   BETWEEN_TWO_VALUES
  # }

  # input FilterInput {
  #   field: String!
  #   operator: Operator!
  #   value: String!
  # }
`;
