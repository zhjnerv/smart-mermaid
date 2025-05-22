# AI 驱动的文本转 Mermaid 图表 Web 应用

一款基于 AI 技术的 Web 应用程序，可将文本内容智能转换为 Mermaid 格式的代码，并将其渲染成可视化图表。

## 功能特点

- **文本输入**：
  - 手动输入文本
  - 上传文件（支持 .txt, .md, .docx 格式）
  - 字符数限制（20,000字符）

- **AI 转换**：
  - 使用 AI 模型分析文本内容
  - 自动选择或指定图表类型
  - 生成符合 Mermaid 语法的代码

- **图表展示**：
  - 显示生成的 Mermaid 代码
  - 使用 Excalidraw 渲染可视化图表
  - 支持图表编辑和导出

## 技术栈

- **前端框架**：Next.js 15 (App Router)
- **UI 组件库**：shadcn/ui
- **CSS 框架**：Tailwind CSS
- **图表渲染**：
  - Excalidraw (@excalidraw/excalidraw)
  - mermaid-to-excalidraw (@excalidraw/mermaid-to-excalidraw)
- **文件处理**：mammoth (处理 .docx 文件)
- **API 集成**：OpenAI 兼容模式

## 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn

## 安装与设置

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/smart-mermaid.git
cd smart-mermaid
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

3. 配置环境变量：

创建 `.env.local` 文件并设置以下变量：

```
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_API_KEY=your_api_key_here
AI_MODEL_NAME=gpt-3.5-turbo
NEXT_PUBLIC_MAX_CHARS=20000
```

4. 启动开发服务器：

```bash
npm run dev
# 或
yarn dev
```

5. 在浏览器中访问 `http://localhost:3000`

## 使用说明

1. **输入文本**：
   - 在文本输入区域直接输入或粘贴文本
   - 或者上传支持的文件格式

2. **选择图表类型**：
   - 从下拉菜单中选择所需的图表类型
   - 或使用"自动选择"让 AI 根据内容决定

3. **生成图表**：
   - 点击"生成图表"按钮
   - 等待 AI 处理并生成 Mermaid 代码

4. **查看与编辑**：
   - 查看生成的 Mermaid 代码
   - 根据需要编辑代码
   - 在预览区域查看可视化图表

5. **导出图表**：
   - 点击"导出 PNG"按钮保存图表

## 许可证

MIT
