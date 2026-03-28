import { agentRegistry } from '../agents';
import type { CodeGenerationRequest, CodeGenerationResponse, AIResponse } from '../types';

/**
 * 代码生成服务
 * 提供代码生成相关的业务逻辑
 */
export class CodeGenService {
  private agent = agentRegistry.getAgent('codeGen');

  /**
   * 生成代码
   */
  async generateCode(request: CodeGenerationRequest): Promise<AIResponse<CodeGenerationResponse>> {
    if (!this.agent) {
      throw new Error('CodeGen Agent 未初始化');
    }

    return this.agent.execute(request);
  }

  /**
   * 复制代码到剪贴板
   */
  async copyToClipboard(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('复制失败:', error);
      throw new Error('复制失败，请手动复制');
    }
  }

  /**
   * 下载代码文件
   */
  downloadCode(code: string, filename: string): void {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 预览代码（在新的浏览器标签页中打开）
   */
  previewCode(code: string, language: string = 'html'): void {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  /**
   * 格式化代码
   */
  formatCode(code: string): string {
    // 简单的代码格式化
    // 实际项目中可以使用 prettier 等工具
    return code
      .replace(/\s+/g, ' ')
      .replace(/> </g, '><')
      .replace(/ {2,}/g, ' ');
  }
}

// 导出单例
export const codeGenService = new CodeGenService();
