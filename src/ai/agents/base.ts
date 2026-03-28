/**
 * Base AI Agent Interface
 */

import type {
  ProjectContext,
  GeneratedCode,
  PromptTemplate,
  PageRequirement,
  ComponentRequirement,
  APISpec,
  TestCase,
  E2ETestCase,
  OptimizedPrompt,
  RefactoringSuggestion,
  StyleIssue,
  OptimizationTip,
  SecurityIssue,
  BestPracticeSuggestion,
  DataSchema,
  TestData,
} from '@/types/ai-agent';

export interface BaseAgent {
  name: string;
  description: string;
  version: string;
}

export interface PromptEngineerAgent extends BaseAgent {
  analyzeRequirement(requirement: string): Promise<PromptTemplate>;
  generateContextualPrompt(context: ProjectContext): Promise<string>;
  optimizePrompt(prompt: string): Promise<OptimizedPrompt>;
}

export interface CodeGeneratorAgent extends BaseAgent {
  generatePage(requirement: PageRequirement): Promise<GeneratedCode>;
  generateComponent(requirement: ComponentRequirement): Promise<GeneratedCode>;
  generateAPIIntegration(apiSpec: APISpec): Promise<GeneratedCode>;
  suggestRefactoring(code: string): Promise<RefactoringSuggestion[]>;
}

export interface TestGeneratorAgent extends BaseAgent {
  generateUnitTest(componentCode: string): Promise<TestCase[]>;
  generateE2ETest(pageCode: string): Promise<E2ETestCase[]>;
  generateTestData(schema: DataSchema): Promise<TestData[]>;
}

export interface CodeReviewAgent extends BaseAgent {
  checkStyle(code: string): Promise<StyleIssue[]>;
  suggestOptimization(code: string): Promise<OptimizationTip[]>;
  checkSecurity(code: string): Promise<SecurityIssue[]>;
  suggestBestPractices(code: string): Promise<BestPracticeSuggestion[]>;
}

// Re-export types for convenience
export type {
  PromptTemplate,
  ProjectContext,
  GeneratedCode,
  GeneratedFile,
  PageRequirement,
  ComponentRequirement,
  APISpec,
  TestCase,
  E2ETestCase,
  OptimizedPrompt,
  RefactoringSuggestion,
  StyleIssue,
  OptimizationTip,
  SecurityIssue,
  BestPracticeSuggestion,
  DataSchema,
  TestData,
} from '@/types/ai-agent';
