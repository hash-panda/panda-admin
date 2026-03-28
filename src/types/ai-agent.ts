/**
 * AI Agent Type Definitions
 */

export interface AIConfig {
  model: {
    provider: 'openai' | 'anthropic' | 'local';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  codeGeneration: {
    useTypeScript: boolean;
    styleGuide: string;
    includeComments: boolean;
    includeTests: boolean;
  };
  projectContext: {
    framework: string;
    uiLibrary: string;
    stateManagement: string;
    router: string;
  };
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
}

export interface ProjectContext {
  framework: string;
  uiLibrary: string;
  stateManagement: string;
  router: string;
  buildTool: string;
  language: string;
}

export interface GeneratedCode {
  files: GeneratedFile[];
  dependencies?: string[];
  devDependencies?: string[];
  imports?: string[];
}

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
  description?: string;
}

export interface PageRequirement {
  title: string;
  description: string;
  features: string[];
  components?: string[];
  apiEndpoints?: string[];
}

export interface ComponentRequirement {
  name: string;
  description: string;
  props?: PropDefinition[];
  events?: EventDefinition[];
  slots?: SlotDefinition[];
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description?: string;
}

export interface EventDefinition {
  name: string;
  payload?: any;
  description?: string;
}

export interface SlotDefinition {
  name: string;
  props?: Record<string, any>;
  description?: string;
}

export interface APISpec {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: any;
  response?: any;
}

export interface Parameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  type: string;
  required: boolean;
  description?: string;
}

export interface TestCase {
  name: string;
  description: string;
  code: string;
}

export interface E2ETestCase {
  name: string;
  description: string;
  steps: TestStep[];
}

export interface TestStep {
  action: string;
  selector?: string;
  value?: any;
}

export interface OptimizedPrompt {
  original: string;
  optimized: string;
  improvements: string[];
}

export interface RefactoringSuggestion {
  type: string;
  description: string;
  code?: string;
  impact: 'low' | 'medium' | 'high';
}

export interface StyleIssue {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  rule: string;
}

export interface OptimizationTip {
  type: string;
  description: string;
  code?: string;
  expectedImprovement?: string;
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  location?: string;
  recommendation: string;
}

export interface BestPracticeSuggestion {
  category: string;
  description: string;
  code?: string;
  reference?: string;
}

export interface DataSchema {
  name: string;
  fields: FieldDefinition[];
  relationships?: Relationship[];
}

export interface FieldDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description?: string;
}

export interface Relationship {
  name: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  target: string;
  foreignKey?: string;
}

export interface TestData {
  name: string;
  description?: string;
  value: any;
  schema?: string;
}
