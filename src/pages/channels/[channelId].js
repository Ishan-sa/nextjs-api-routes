import { getAllMessages, getAllChannels } from "../../database";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";

export default function Channel({
  channelId,
  messages: initialMessages,
  channels: initialChannels,
}) {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState(channelId);
  const [newChannelPopup, setNewChannelPopup] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("submit", userName, text);

      const result = await axios.post(`/api/channels/${channelId}/messages`, {
        userName,
        text,
      });
      const newMessage = result.data;
      setMessages([...messages, newMessage]);
      setText("");
      setUserName("");
      //   make the scroll smooth
      window.scrollTo({
        top: document.body.scrollHeight - 100,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get(`/api/channels/${channelId}/messages`);
      setMessages(result.data);
    };
    fetchMessages();
  }, [channelId]);

  const createNewChannel = async () => {
    try {
      setNewChannelPopup(!newChannelPopup);
      const { data } = await axios.post("/api/channels", {
        name: newChannelName,
      });
      setChannels([...channels, data]);
      setNewChannelName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // set the bg to the selected channel and text to white when the page loads according to the selected channel id

  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col bg-[#2B2D31] min-w-[20%] h-screen overflow-scroll px-4 hide-scroll">
          <button
            className="bg-[#5965F2] px-4 py-2 m-2 rounded-lg text-white hover:bg-[#4752C4]"
            onClick={() => {
              createNewChannel();
              //   setNewChannelPopup(!newChannelPopup);
            }}
          >
            New Channel +
          </button>

          {newChannelPopup && (
            <div className="flex flex-col bg-[#3c3f45] text-white max-w-[350px] max-h-[250px] rounded-lg absolute top-0 left-0 bottom-0 right-0 m-auto">
              <div className="flex p-2 justify-center mt-4">
                <p className="text-lg font-bold">Create a new channel</p>
              </div>
              <div className="flex justify-center mt-10">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex gap-4 items-center "
                >
                  <div className="flex">
                    <input
                      type="text"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      placeholder="Enter # channel name"
                      className="bg-[#383a40] px-4 py-2 text-[#f5f5f5]"
                    />
                  </div>

                  <button
                    className="flex bg-[#5965F2] text-white p-1 rounded-full"
                    onClick={createNewChannel}
                  >
                    <AiFillCheckCircle className="text-2xl" />
                  </button>
                </form>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  className="flex bg-[#5965F2] text-white px-4 py-2 rounded-lg hover:bg-[#4752C4]"
                  onClick={() => setNewChannelPopup(!newChannelPopup)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {channels.map((channel) => (
              <div key={channel.id}>
                <Link href={`/channels/${channel.id}`}>
                  <h1
                    className={`text-md text-[#989AA2] py-1 px-2 rounded-md flex items-center gap-2 justify-between hover:bg-[#3f4248] ${
                      channel.id === selectedChannelId
                        ? "bg-[#3f4248] text-[#f5f5f5]"
                        : "text-[#989AA2]"
                    }`}
                    onClick={() => setSelectedChannelId(channel.id)}
                  >
                    {`${
                      channel.name.length > 20
                        ? "# " + channel.name.substr(0, 25) + "..."
                        : "# " + channel.name
                    }`}
                    {
                      // if the channel is selected, show the settings icon
                      channel.id === selectedChannelId && (
                        <div className="flex items-center gap-2">
                          <BiEdit
                            className={`hover:text-[#848eff] transition-all duration-100`}
                            // onClick={() => setEditMode(!editMode)}
                          />
                          <AiFillDelete
                            className={`hover:text-[#848eff] transition-all duration-100`}
                            // onClick={() => deleteChannel(channel.id)}
                          />
                        </div>
                      )
                    }
                  </h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#313338] w-full h-screen overflow-scroll hide-scroll">
          <div className="flex justify-start bg-[#313338] py-2 px-6 shadow-xl fixed w-full top-0">
            <h1 className="text-white font-bold text-lg"># {channelId}</h1>
          </div>
          <ul className="mb-[4rem] mt-[2.5rem] py-4 flex flex-col gap-2">
            {messages.map((message) => {
              const createdDate = new Date(message.created);
              const today = new Date();
              let formattedDate;
              if (createdDate.toDateString() === today.toDateString()) {
                const hours = createdDate.getHours() % 12 || 12;
                const minutes = createdDate.getMinutes();
                const amPm = createdDate.getHours() < 12 ? "AM" : "PM";
                formattedDate = `Today at ${hours}:${minutes
                  .toString()
                  .padStart(2, "0")} ${amPm}`;
              } else {
                formattedDate = createdDate.toLocaleDateString(
                  "en-US",
                  { timeZone: "America/Los_Angeles", hour12: true },
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                );
              }
              return (
                <>
                  <div
                    className="flex items-center gap-3 px-6 py-2 hover:bg-[#2B2D31]"
                    key={message.id}
                  >
                    <div>
                      <Image
                        src="https://placekitten.com/200"
                        width={35}
                        height={35}
                        className="rounded-full"
                        alt="user"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#b2b2b2]">
                        {message.userName}{" "}
                        <span className="font-normal text-xs ml-2">
                          {formattedDate}
                        </span>
                      </p>
                      <li className="text-white">{message.text}</li>
                    </div>
                  </div>
                </>
              );
            })}
          </ul>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-center px-2 py-4 bg-[#3b3e44] fixed bottom-0 w-full"
          >
            <div className="flex">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name"
                className="bg-[#383a40] px-4 py-2 text-[#f5f5f5]"
              />
            </div>

            <div className="flex">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Message #${channelId}`}
                className="bg-[#383a40] px-4 py-2 text-[#f5f5f5]"
              />
            </div>

            <div className="flex">
              <button
                type="submit"
                className="flex bg-[#5965F2] text-white p-2 rounded-full"
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              >
                <AiOutlineSend />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {newChannelPopup && (
        <div className="w-full h-full z-[300]">
          <NewChannelPopup
            handleSubmit={createNewChannel}
            handleChange={(e) => setNewChannelName(e.target.value)}
            value={newChannelName}
          />
        </div>
      )} */}
      {/* <div className="bg-[#222327] w-full h-full z-[99] fixed top-0 opacity-80"></div> */}
    </>
  );
}

export async function getServerSideProps(context) {
  // This is always server side
  // From the server, we can connect to the database
  const channelId = context.query.channelId;
  const channels = await getAllChannels();
  const messages = await getAllMessages(channelId);
  return {
    props: {
      channelId,
      messages: JSON.parse(JSON.stringify(messages)),
      channels: JSON.parse(JSON.stringify(channels)),
    },
  };
}
