import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    analysisModules: [AnalysisModule]
    analysisModule(analysisModuleId: ID!): AnalysisModule
    parameters: [Parameter]
    setUpAnalisisModules: [SetUpAnalysisModule]
    setUpAnalysisModule(analysisModuleId: ID!): SetUpAnalysisModule
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
  }
  type SetUpParameter {
    name: String!
    value: String!
  }
  input SetUpParameterInput {
    name: String!
    value: String!
  }

  input CreateSetUpAnalysisModuleInput {
    analysisModuleId: ID!
    parameters: [SetUpParameterInput!]!
  }
  input UpdateSetUpAnalysisModuleInput {
    id: ID!
    parameters: [SetUpParameterInput!]!
  }

  type Mutation {
    analysisModuleCreate(input: CreateAnalysisModuleInput!): Boolean
    analysisModuleUpdate(input: UpdateAnalysisModuleInput!): Boolean
    analysisModuleDelete(id: ID!): Boolean
    setUpAnalysisModuleCreate(input: CreateSetUpAnalysisModuleInput!): Boolean
    setUpAnalysisModuleUpdate(input: UpdateSetUpAnalysisModuleInput!): Boolean
    setUpAnalysisModuleDelete(id: ID!): Boolean
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
