/**
 * Mock AI Agent Implementation
 * This is a placeholder implementation for demonstration purposes.
 */

import type {
  PromptEngineerAgent,
  CodeGeneratorAgent,
  TestGeneratorAgent,
  CodeReviewAgent,
  PromptTemplate,
  ProjectContext,
  OptimizedPrompt,
  PageRequirement,
  ComponentRequirement,
  APISpec,
  GeneratedCode,
  RefactoringSuggestion,
  TestCase,
  E2ETestCase,
  DataSchema,
  TestData,
  StyleIssue,
  OptimizationTip,
  SecurityIssue,
  BestPracticeSuggestion,
} from './base';

export class MockPromptEngineerAgent implements PromptEngineerAgent {
  name = 'Prompt Engineer Agent';
  description = 'Optimizes and generates high-quality prompts';
  version = '1.0.0';

  async analyzeRequirement(requirement: string): Promise<PromptTemplate> {
    return {
      id: '1',
      name: 'Page Generation Prompt',
      description: 'Prompt for generating Vue 3 pages',
      template: `Generate a Vue 3 page based on: ${requirement}`,
      variables: ['requirement'],
    };
  }

  async generateContextualPrompt(context: ProjectContext): Promise<string> {
    return `Generate code for ${context.framework} using ${context.uiLibrary}.`;
  }

  async optimizePrompt(prompt: string): Promise<OptimizedPrompt> {
    return {
      original: prompt,
      optimized: prompt + '\nUse TypeScript and best practices.',
      improvements: ['Added TypeScript requirement'],
    };
  }
}

export class MockCodeGeneratorAgent implements CodeGeneratorAgent {
  name = 'Code Generator Agent';
  description = 'Generates page and component code from requirements';
  version = '1.0.0';

  async generatePage(_requirement: PageRequirement): Promise<GeneratedCode> {
    return {
      files: [
        {
          path: `src/views/demo/index.vue`,
          language: 'vue',
          content: '<template><div>Demo Page</div></template>',
          description: 'Demo page',
        },
      ],
    };
  }

  async generateComponent(_requirement: ComponentRequirement): Promise<GeneratedCode> {
    return {
      files: [
        {
          path: `src/components/demo/index.vue`,
          language: 'vue',
          content: '<template><div>Demo Component</div></template>',
          description: 'Demo component',
        },
      ],
    };
  }

  async generateAPIIntegration(_apiSpec: APISpec): Promise<GeneratedCode> {
    return {
      files: [
        {
          path: `src/api/demo.ts`,
          language: 'typescript',
          content: 'export const demoAPI = {};',
          description: 'Demo API',
        },
      ],
    };
  }

  async suggestRefactoring(_code: string): Promise<RefactoringSuggestion[]> {
    return [
      {
        type: 'extract-component',
        description: 'Extract repeated UI into components',
        impact: 'medium',
      },
    ];
  }
}

export class MockTestGeneratorAgent implements TestGeneratorAgent {
  name = 'Test Generator Agent';
  description = 'Automatically generates test cases';
  version = '1.0.0';

  async generateUnitTest(_componentCode: string): Promise<TestCase[]> {
    return [
      {
        name: 'should render',
        description: 'Component should render correctly',
        code: 'it("should render", () => {});',
      },
    ];
  }

  async generateE2ETest(_pageCode: string): Promise<E2ETestCase[]> {
    return [
      {
        name: 'e2e test',
        description: 'End-to-end test',
        steps: [],
      },
    ];
  }

  async generateTestData(_schema: DataSchema): Promise<TestData[]> {
    return [
      {
        name: 'test data',
        value: {},
      },
    ];
  }
}

export class MockCodeReviewAgent implements CodeReviewAgent {
  name = 'Code Review Agent';
  description = 'Performs code quality reviews';
  version = '1.0.0';

  async checkStyle(_code: string): Promise<StyleIssue[]> {
    return [];
  }

  async suggestOptimization(_code: string): Promise<OptimizationTip[]> {
    return [
      {
        type: 'performance',
        description: 'Use computed for derived data',
      },
    ];
  }

  async checkSecurity(_code: string): Promise<SecurityIssue[]> {
    return [];
  }

  async suggestBestPractices(_code: string): Promise<BestPracticeSuggestion[]> {
    return [
      {
        category: 'Vue',
        description: 'Use composition API',
      },
    ];
  }
}
