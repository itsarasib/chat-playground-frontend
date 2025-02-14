// "use client";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Textarea } from "@/components/ui/textarea";
// import React, { useState } from "react";

// const ChatBox: React.FC = () => {
//   const [systemPrompt, setSystemPrompt] = useState(
//     "You are a male AI assistant named Typhoon created by SCB 10X to be helpful, harmless, and honest. Typhoon is happy to help with analysis, question answering, math, coding, creative writing, teaching, role-play, general discussion, and all sorts of other tasks. Typhoon responds directly to all human messages without unnecessary affirmations or filler phrases like “Certainly!”, “Of course!”, “Absolutely!”, “Great!”, “Sure!”, etc. Specifically, Typhoon avoids starting responses with the word “Certainly” in any way. Typhoon follows this information in all languages, and always responds to the user in the language they use or request. Typhoon is now being connected with a human. Write in fluid, conversational prose, Show genuine interest in understanding requests, Express appropriate emotions and empathy. Also showing information in term that is easy to understand and visualized."
//   );
//   const [model, setModel] = useState("typhoon-v2-8b-instruct");
//   const [temperature, setTemperature] = useState(0.7);
//   const [topP, setTopP] = useState(0.95);
//   const [topK, setTopK] = useState(0);
//   const [repetitionPenalty, setRepetitionPenalty] = useState(1.05);
//   const [minP, setMinP] = useState(0);
//   return (
//     <div className="flex flex-row h-full py-4 px-4 rounded-3xl gap-4 bg-gray-300">
//       <div className=" flex flex-col flex-1 overflow-hidden gap-3 justify-between">
//         <div className="w-full h-full">hello</div>
//         <div className="flex items-center gap-4 ">
//           <input
//             type="text"
//             className="flex-1 p-2 text-black rounded-md"
//             placeholder="Type a message"
//           />
//           <Button className=" px-4 py-5 text-black font-bold rounded-full bg-transparent hover:bg-transparent hover:text-violet-700 hover:border-violet-700  border-2 border-black">
//             Send
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-col px-4">
//         {/* Model selection */}
//         <div className="mb-4">
//           <label className="block mb-2">Model</label>
//           <select
//             className="p-2 text-black rounded-md w-full"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//           >
//             <option value="typhoon-v2-8b-instruct">
//               typhoon-v2-8b-instruct
//             </option>
//             <option value="typhoon-v2-7b-instruct">
//               typhoon-v2-7b-instruct
//             </option>
//           </select>
//         </div>

//         {/* System Prompt */}
//         <div className="mb-4">
//           <label className="block mb-2">System Prompt</label>
//           <Textarea
//             className="p-2 text-black rounded-md w-full bg-white"
//             value={systemPrompt}
//             onChange={(e) => setSystemPrompt(e.target.value)}
//           />
//         </div>

//         {/* Parameters */}
//         <div className="mb-4">
//           <label className="block mb-2">Temperature</label>
//                   <Slider defaultValue={[0.7]} max={2} step={0.01}
//             onChange={(value) => setTemperature(value[0])}
//                   />

//           <label className="block mb-2">Top-P</label>
//           <Slider defaultValue={[0.95]} max={1} step={0.01} />

//           <label className="block mb-2">Top-K</label>
//           <Slider defaultValue={[0]} max={100} step={1} />

//           <label className="block mb-2">Repetition Penalty</label>
//           <Slider defaultValue={[1.05]} max={2} step={0.01} />

//           <label className="block mb-2">Min-P</label>
//           <Slider defaultValue={[0]} max={0.5} step={0.01} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

//yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios from "axios";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a male AI assistant named Typhoon created by SCB 10X to be helpful, harmless, and honest. Typhoon is happy to help with analysis, question answering, math, coding, creative writing, teaching, role-play, general discussion, and all sorts of other tasks. Typhoon responds directly to all human messages without unnecessary affirmations or filler phrases like “Certainly!”, “Of course!”, “Absolutely!”, “Great!”, “Sure!”, etc. Specifically, Typhoon avoids starting responses with the word “Certainly” in any way. Typhoon follows this information in all languages, and always responds to the user in the language they use or request. Typhoon is now being connected with a human. Write in fluid, conversational prose, Show genuine interest in understanding requests, Express appropriate emotions and empathy. Also showing information in term that is easy to understand and visualized."
  );
  const [model, setModel] = useState("typhoon-v2-8b-instruct");
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(1);
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.05);
  const [minP, setMinP] = useState(0);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const systemMessage: Message = { role: "system", content: systemPrompt };

    try {
      const response = await axios.post(
        "https://api.opentyphoon.ai/v1/chat/completions",
        {
          model,
          messages: [systemMessage, ...updatedMessages],
          max_tokens: 512,
          temperature,
          top_p: topP,
          top_k: topK,
          repetition_penalty: repetitionPenalty,
          min_p: minP,
          stream: false,
        },
        {
          headers: {
            Authorization:
              "Bearer sk-7rPYeT7qkoxvym07ebt9Kk8SVdz9rf5dv8jFM605Lqbf4aeh",
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.choices[0]?.message?.content || "No response",
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-row h-full py-4 px-4 rounded-3xl gap-4 bg-gray-300">
      {/* Chat display */}
      <div className="flex flex-col flex-1 overflow-hidden gap-3 justify-between">
        <div className="w-full h-full bg-white p-2 rounded-md overflow-y-auto text-black">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.role === "user" ? "text-blue-700" : "text-green-700"
              }`}
            >
              <strong>{msg.role}:</strong> {msg.content}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-4 ">
          <input
            type="text"
            className="flex-1 p-2 text-black rounded-md"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            className="px-4 py-5 text-black font-bold rounded-full bg-transparent hover:bg-transparent hover:text-violet-700 hover:border-violet-700 border-2 border-black"
          >
            Send
          </Button>
        </div>
      </div>

      {/* Settings panel */}
      <div className="flex flex-col px-4">
        {/* Model selection */}
        <div className="mb-4">
          <label className="block mb-2">Model</label>
          <select
            className="p-2 text-black rounded-md w-full"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="typhoon-v2-8b-instruct">
              typhoon-v2-8b-instruct
            </option>
            <option value="typhoon-v2-7b-instruct">
              typhoon-v2-7b-instruct
            </option>
          </select>
        </div>

        {/* System Prompt */}
        <div className="mb-4">
          <label className="block mb-2">System Prompt</label>
          <Textarea
            className="p-2 text-black rounded-md w-full bg-white"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>

        {/* Parameters */}
        <div className="mb-4">
          <label className="block mb-2">Temperature</label>
          <Slider
            defaultValue={[0.7]}
            max={2}
            step={0.01}
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
          />

          <label className="block mb-2">Top-P</label>
          <Slider
            defaultValue={[0.95]}
            max={1}
            step={0.01}
            value={[topP]}
            onValueChange={(val) => setTopP(val[0])}
          />

          <label className="block mb-2">Top-K</label>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            value={[topK]}
            onValueChange={(val) => setTopK(val[0])}
          />

          <label className="block mb-2">Repetition Penalty</label>
          <Slider
            defaultValue={[1.05]}
            max={2}
            step={0.01}
            value={[repetitionPenalty]}
            onValueChange={(val) => setRepetitionPenalty(val[0])}
          />

          <label className="block mb-2">Min-P</label>
          <Slider
            defaultValue={[0]}
            max={0.5}
            step={0.01}
            value={[minP]}
            onValueChange={(val) => setMinP(val[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
