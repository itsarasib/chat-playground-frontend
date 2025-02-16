// // import { ThumbsDownIcon, ThumbsUpIcon, RotateCcw } from "lucide-react";

// // interface ResponseActionProps {
// //   messageId: string;
// //   onRegenrate: () => void;
// // }

// // export const ResponseAction: React.FC<ResponseActionProps> = ({
// //   messageId,
// //   onRegenrate,
// // }) => {
// //   return (
// //     <div className="w-full flex flex-row justify-end items-center gap-4">
// //       <ThumbsUpIcon
// //         className="w-4 h-4 text-green-500 cursor-pointer"
// //         onClick={() => console.log("thumbs up", messageId)}
// //       />

// //       <ThumbsDownIcon
// //         className="w-4 h-4 text-red-500 cursor-pointer"
// //         onClick={() => console.log("thumbs down", messageId)}
// //       />
// //       <RotateCcw
// //         className="w-4 h-4 text-blue-500 cursor-pointer"
// //         onClick={onRegenrate}
// //       />
// //     </div>
// //   );
// // };

// import { useToken } from "@/hooks/useToken";
// import { ThumbsDownIcon, ThumbsUpIcon, RotateCcw } from "lucide-react";

// interface ResponseActionProps {
//   messageId: string;
//   onRegenrate: () => void;
// }

// export const ResponseAction: React.FC<ResponseActionProps> = ({
//   messageId,
//   onRegenrate,
// }) => {
//   const {
//     token: { access_token },
//   } = useToken();
//   const handleFeedback = async (feedback: "good" | "bad") => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify({
//           messageId,
//           feedback,
//         }),
//       });

//       const result = await response.json();
//       console.log(result.message);
//     } catch (error) {
//       console.error("Failed to send feedback", error);
//     }
//   };

//   return (
//     <div className="w-full flex flex-row justify-end items-center gap-4">
//       <ThumbsUpIcon
//         className="w-4 h-4 text-black cursor-pointer"
//         onClick={() => handleFeedback("good")}
//       />

//       <ThumbsDownIcon
//         className="w-4 h-4 text-black cursor-pointer"
//         onClick={() => handleFeedback("bad")}
//       />
//       <RotateCcw
//         className="w-4 h-4 text-blue-500 cursor-pointer"
//         onClick={onRegenrate}
//       />
//     </div>
//   );
// };

import { useToken } from "@/hooks/useToken";
import { ThumbsDownIcon, ThumbsUpIcon, RotateCcw } from "lucide-react";
import React, { useState } from "react";

interface ResponseActionProps {
  messageId: string;
  onRegenrate: () => void;
}

export const ResponseAction: React.FC<ResponseActionProps> = ({
  messageId,
  onRegenrate,
}) => {
  const {
    token: { access_token },
  } = useToken();

  const [selectedFeedback, setSelectedFeedback] = useState<
    "good" | "bad" | null
  >(null);

  const handleFeedback = async (feedback: "good" | "bad") => {
    setSelectedFeedback(feedback);
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          messageId,
          feedback,
        }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Failed to send feedback", error);
    }
  };

  return (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      {/* Thumbs Up Icon */}
      <ThumbsUpIcon
        className={`w-4 h-4 cursor-pointer ${
          selectedFeedback === "good" ? "text-green-500" : "text-black"
        }`}
        onClick={() => handleFeedback("good")}
      />

      {/* Thumbs Down Icon */}
      <ThumbsDownIcon
        className={`w-4 h-4 cursor-pointer ${
          selectedFeedback === "bad" ? "text-red-500" : "text-black"
        }`}
        onClick={() => handleFeedback("bad")}
      />

      {/* Regenerate Icon */}
      <RotateCcw
        className="w-4 h-4 text-blue-500 cursor-pointer"
        onClick={onRegenrate}
      />
    </div>
  );
};
