import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  text: string;
  className?: string;
  block?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ text, className = '', block = false }) => {
  const renderedContent = useMemo(() => {
    if (!text) return '';

    // If block is specified directly, try to render entire text as KaTeX
    if (block) {
      try {
        return katex.renderToString(text, { displayMode: true, throwOnError: false });
      } catch {
        return text;
      }
    }

    // Split text by $$...$$ for block math and $...$ for inline math
    const parts: string[] = [];
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(escapeHtml(text.substring(lastIndex, match.index)));
      }

      const token = match[0];
      try {
        if (token.startsWith('$$') && token.endsWith('$$')) {
          const formula = token.slice(2, -2).trim();
          parts.push(katex.renderToString(formula, { displayMode: true, throwOnError: false }));
        } else if (token.startsWith('$') && token.endsWith('$')) {
          const formula = token.slice(1, -1).trim();
          parts.push(katex.renderToString(formula, { displayMode: false, throwOnError: false }));
        }
      } catch {
        parts.push(escapeHtml(token));
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(escapeHtml(text.substring(lastIndex)));
    }

    return parts.join('');
  }, [text, block]);

  return (
    <span
      className={`math-rendered-view inline-block align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>');
}

export default MathView;
