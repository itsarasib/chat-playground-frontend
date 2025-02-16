import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeMarkDownProps {
  node: unknown;
  inline: boolean;
  className: string;
  children: any;
}

export const CodeMarkDown: React.FC<CodeMarkDownProps> = ({
  node,
  inline,
  className,
  children,
  ...rest
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const { toast } = useToast();
  return !inline && match ? (
    <div className="my-4">
      <div className="w-full rounded-t-2xl bg-slate-400 px-4 py-2 text-white font-bold flex flex-row justify-between items-center">
        Code
        <Copy
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(String(children));
            toast({
              title: "Copied",
              description: "Code copied to clipboard",
            });
          }}
        />
      </div>
      <SyntaxHighlighter
        style={dark}
        language={match[1]}
        PreTag="div"
        {...rest}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...rest}>
      {" "}
      {children}{" "}
    </code>
  );
};
