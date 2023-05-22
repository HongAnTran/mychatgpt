import "./App.css";
import axios from "axios";

import { useState } from "react";
import CodeBlock from "./components/CodeBlock";
function App() {
  const [listChat, setListChat] = useState([]);
  const [mess, setMess] = useState("");

  async function chat() {
    try {
      if (mess) {
        setMess("");
        const dataChat = [...listChat, { role: "user", content: mess }];
        setListChat(dataChat);

        const { data } = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: dataChat,
          },
          {
            headers: {
              Authorization:
                "Bearer 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",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);

        setListChat((pre) => [...pre, data.choices[0].message]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const code = `
  const sayHello = () => {
    console.log('Hello, world!');
  }`
  return (
    <>
      <main className="bg-slate-800 min-h-screen">
        <header className=" container  mx-auto px-4 py-4">
          <nav>
            <ul>
              <li className="logo text-white font-bold">Chat GPT</li>
            </ul>
          </nav>
        </header>
        <div className="body ">
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-3 bg-gray-200 ">
              {/* <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/341631168_162269289802043_1261243193408870700_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ZfAerIkyekkAX_PRfCU&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfCzNQQC-VAG-SCjuLpHmAEdbOSnHY7OzKZFUsuTjewD5Q&oe=644723E2'/> */}
            </div>
            <div className="col-span-9 bg-gray-200">
              <div>
                {listChat.map((item, index) => {
                  return (
                    <p
                      className="mb-5 bg-slate-500"
                      key={index}
                    >{`${item.role}:${item.content}`}</p>
                  );
                })}
              </div>
              <CodeBlock language="javascript" code={code} />
              <input
                value={mess}
                onChange={(e) => setMess(e.target.value)}
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button onClick={chat} className="bg-red-400 p-2">
                chat
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
