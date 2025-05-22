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
  
  if (!isStreaming && !content) return null;
  
  return (
    <div className="mb-4 space-y-2">
      <div className="flex justify-between items-center">
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
        className="border rounded-md p-3 h-[120px] overflow-y-auto font-mono text-sm bg-muted/50"
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
    <div className="space-y-2">
      {/* 流式内容显示区域 */}
      <StreamingDisplay 
        content={streamingContent}
        isStreaming={isStreaming}
      />
      
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Mermaid 代码</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!code}
          className="h-8 gap-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              复制代码
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={code}
        onChange={handleChange}
        placeholder="生成的 Mermaid 代码将显示在这里..."
        className="h-[400px] font-mono text-sm mermaid-editor overflow-y-auto resize-none"
      />
    </div>
  );
} 