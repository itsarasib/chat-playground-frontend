import React from "react";
import { Conversation } from "../[uuid]/layout";
import Link from "next/link";

interface HistoryListProps {
  conversations: Conversation[];
}

const HistoryList: React.FC<HistoryListProps> = ({ conversations }) => {
  return (
    <div>
      <ul className="p-4 space-y-2">
        {[...conversations].reverse().map((conv, index) => (
          <Link href={`/dashboard/${conv.conversationId}`} key={index}>
            <li className="hover:bg-gray-700 p-2 cursor-pointer rounded-xl">
              {conv.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
