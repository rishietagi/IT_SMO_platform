import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Consulting-doc markdown with GFM tables, styled for the artifact viewer. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-kpmg text-[13px] leading-relaxed text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => <h1 className="mb-3 text-lg font-extrabold text-kpmg-navy" {...p} />,
          h2: (p) => (
            <h2 className="mb-1.5 mt-4 border-b border-blue-100 pb-1 text-sm font-bold text-kpmg-navy" {...p} />
          ),
          h3: (p) => <h3 className="mb-1 mt-3 text-[13px] font-bold text-blue-800" {...p} />,
          p: (p) => <p className="my-2" {...p} />,
          ul: (p) => <ul className="my-2 list-disc space-y-1 pl-5" {...p} />,
          ol: (p) => <ol className="my-2 list-decimal space-y-1 pl-5" {...p} />,
          strong: (p) => <strong className="font-bold text-slate-900" {...p} />,
          table: (p) => (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-xs" {...p} />
            </div>
          ),
          th: (p) => (
            <th className="border-b border-slate-200 bg-blue-50 px-2.5 py-1.5 text-left font-bold text-kpmg-navy" {...p} />
          ),
          td: (p) => <td className="border-b border-slate-100 px-2.5 py-1.5 align-top" {...p} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
