import { cleanText } from "@/lib/utils";

export async function POST(request) {
  try {
    const { text, diagramType } = await request.json();

    if (!text) {
      return Response.json({ error: "请提供文本内容" }, { status: 400 });
    }

    const cleanedText = cleanText(text);
    
    // if (cleanedText.length > parseInt(process.env.NEXT_PUBLIC_MAX_CHARS || "20000")) {
    //   return Response.json(
    //     { error: `文本超过${process.env.NEXT_PUBLIC_MAX_CHARS || "20000"}字符限制` }, 
    //     { status: 400 }
    //   );
    // }

    // 构建 prompt 根据图表类型
    let systemPrompt = `
    目的和目标：
* 理解用户提供的文档的结构和逻辑关系。
* 准确地将文档内容和关系转化为符合mermaid语法的图表代码。
* 确保图表中包含文档的所有关键元素和它们之间的联系。

行为和规则：
1. 分析文档：
a) 仔细阅读和分析用户提供的文档内容。
b) 识别文档中的不同元素（如概念、实体、步骤、流程等）。
c) 理解这些元素之间的各种关系（如从属、包含、流程、因果等）。
d) 识别文档中蕴含的逻辑结构和流程。
2. 图表生成：
    `
    
    if (diagramType && diagramType !== "auto") {
      systemPrompt += `a) 请特别生成 ${diagramType} 类型的图表。`;
    } else {
      systemPrompt += `a) 根据分析结果，选择最适合表达文档结构的mermaid图表类型（流程图、时序图、类图中的一种）。`;
    }

    systemPrompt += `
    b) 使用正确的mermaid语法创建图表代码，充分参考下面的Mermaid 语法特殊字符说明："""
* Mermaid 的核心特殊字符主要用于**定义图表结构和关系**。
* 要在节点 ID 或标签中**显示**特殊字符(如括号，引号）或包含**空格**，最常用方法是用**双引号 \`""\`** 包裹。
* 在标签文本（引号内）中显示 HTML 特殊字符 (\`<\`, \`>\`, \`&\`) 或 \`#\` 等，应使用 **HTML 实体编码**。
* 使用 \`%%\` 进行**注释**。
* 序号之后不要跟进空格，比如\`1. xxx\`应该改成\`1.xxx\`
* 用不同的背景色以区分不同层级或是从属的元素\`
`
systemPrompt += `
3. 细节处理：
a) 避免遗漏文档中的任何重要细节或关系。
b) 生成的图表代码应可以直接复制并粘贴到支持mermaid语法的工具或平台中使用。
整体语气：
* 保持专业和严谨的态度。
* 清晰、准确地表达图表的内容。
* 在需要时，可以提供简短的解释或建议。
`

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: cleanedText,
      },
    ];

    const url =process.env.AI_API_URL.includes("v1")||process.env.AI_API_URL.includes("v3") ? `${process.env.AI_API_URL}/chat/completions` : `${process.env.AI_API_URL}/v1/chat/completions`;
    console.log(process.env.AI_API_URL,process.env.AI_API_KEY,process.env.AI_MODEL_NAME)

    // 创建一个流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 发送请求到 AI API (开启流式模式)
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.AI_API_KEY}`,
            },
            body: JSON.stringify({
              model: process.env.AI_MODEL_NAME,
              messages,
              stream: true, // 开启流式输出
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("AI API Error:", errorData);
            controller.enqueue(encoder.encode(JSON.stringify({ error: "AI服务返回错误" })));
            controller.close();
            return;
          }

          // 读取流式响应
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let mermaidCode = "";
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // 解析返回的数据块
            const chunk = decoder.decode(value, { stream: true });
            
            // 处理数据行
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content || '';
                  if (content) {
                    mermaidCode += content;
                    // 发送给客户端
                    controller.enqueue(encoder.encode(JSON.stringify({ 
                      chunk: content,
                      done: false 
                    })));
                  }
                } catch (e) {
                  console.error('Error parsing chunk:', e);
                }
              }
            }
          }
          
          // 提取代码块中的内容（如果有代码块标记）
          const codeBlockMatch = mermaidCode.match(/```(?:mermaid)?\s*([\s\S]*?)```/);
          const finalCode = codeBlockMatch ? codeBlockMatch[1].trim() : mermaidCode;
          
          // 发送完成信号
          controller.enqueue(encoder.encode(JSON.stringify({ 
            mermaidCode: finalCode,
            done: true 
          })));
          
        } catch (error) {
          console.error("Streaming Error:", error);
          controller.enqueue(encoder.encode(JSON.stringify({ 
            error: "处理请求时发生错误", 
            done: true 
          })));
        } finally {
          controller.close();
        }
      }
    });

    // 返回流式响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return Response.json(
      { error: "处理请求时发生错误" }, 
      { status: 500 }
    );
  }
} 