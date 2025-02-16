import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeMarkDown } from "./CodeMarkDown";
import { memo } from "react";

interface Props {
  content: string;
}

const component: Components = {
  // @ts-expect-error: inline
  code: CodeMarkDown,
  pre({ children }) {
    return <div>{children}</div>;
  },
  li({ children }) {
    return <li className="list-disc">{children}</li>;
  },
  ul({ children }) {
    return <ul className="list-disc">{children}</ul>;
  },
  p({ children }) {
    return <p className="text-gray-800">{children}</p>;
  },
  h1({ children }) {
    return <h1 className="text-2xl font-bold">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-lg font-bold">{children}</h3>;
  },
  h4({ children }) {
    return <h4 className="text-base font-bold">{children}</h4>;
  },
  h5({ children }) {
    return <h5 className="text-sm font-bold">{children}</h5>;
  },
  h6({ children }) {
    return <h6 className="text-xs font-bold">{children}</h6>;
  },
  strong({ children }) {
    return <strong className="font-bold">{children}</strong>;
  },
  a({ children, href }) {
    return (
      <a className="text-blue-500 hover:underline" href={href}>
        {children}
      </a>
    );
  },
};

const MarkdownComponent: React.FC<Props> = ({ content }) => {
  // console.log(content);
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={component}>
      {content}
    </ReactMarkdown>
  );
};

export const Markdown = memo(MarkdownComponent, (prev, next) => {
  return prev.content === next.content;
});
