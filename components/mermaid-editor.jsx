"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

// 新增的流式内容显示组件
function StreamingDisplay({ content, isStreaming }) {
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content]);
  
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center h-6">
        <h3 className="text-sm font-medium">实时生成</h3>
        {isStreaming && (
          <div className="flex items-center text-xs text-muted-foreground">
            <div className="animate-pulse mr-1 h-2 w-2 rounded-full bg-green-500"></div>
            正在生成...
          </div>
        )}
      </div>
      <div 
        ref={contentRef} 
        className="border rounded-md p-3 h-24 overflow-y-auto font-mono text-sm bg-muted/50"
      >
        {content || "等待生成..."}
      </div>
    </div>
  );
}

export function MermaidEditor({ code, onChange, streamingContent, isStreaming }) {
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    
    if (success) {
      setCopied(true);
      toast.success("已复制到剪贴板");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      toast.error("复制失败");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 流式内容显示区域 - 固定高度 */}
      <div className="mb-4">
        <StreamingDisplay 
          content={streamingContent}
          isStreaming={isStreaming}
        />
      </div>
      
      {/* 编辑器标题栏 - 固定高度 */}
      <div className="flex justify-between items-center h-8 mb-2">
        <h3 className="text-sm font-medium">Mermaid 代码</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!code}
            className="h-7 gap-1 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                复制代码
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 代码编辑器容器 - 占用剩余空间 */}
      <div className="flex-1 min-h-0">
        <Textarea
          value={code}
          onChange={handleChange}
          placeholder="生成的 Mermaid 代码将显示在这里..."
          className="w-full h-full font-mono text-sm mermaid-editor overflow-y-auto resize-none"
        />
      </div>
    </div>
  );
} 