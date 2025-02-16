import { ThumbsDownIcon, ThumbsUpIcon, RotateCcw } from "lucide-react";

interface ResponseActionProps {
  messageId: string;
  onRegenrate: () => void;
}

export const ResponseAction: React.FC<ResponseActionProps> = ({
  messageId,
  onRegenrate,
}) => {
  return (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      <ThumbsUpIcon
        className="w-4 h-4 text-green-500 cursor-pointer"
        onClick={() => console.log("thumbs up", messageId)}
      />

      <ThumbsDownIcon
        className="w-4 h-4 text-red-500 cursor-pointer"
        onClick={() => console.log("thumbs down", messageId)}
      />
      <RotateCcw
        className="w-4 h-4 text-blue-500 cursor-pointer"
        onClick={onRegenrate}
      />
    </div>
  );
};
