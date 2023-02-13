import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import SendMessageForm from "components/SendMessageForm/SendMessageForm";
import MessageEditForm from "components/MessageEditForm/MessageEditForm";
import UsualMessages from "components/UsualMessages/UsualMessages";

export default function Messages({ messageId = 1 }) {
  const [message, setMessage] = useState(null);
  const [channelId, setChannelId] = useState(messageId);
  const [editMessage, setEditMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [msgText, setMsgText] = useState("");

  const fetchMessage = async () => {
    try {
      // const response = await axios.get(`api/channels/${channelId}/messages`);
      const response = await axios.get(`api/channels/${channelId}/messages`);
      setMessage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessage();
  });

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditMessage(text);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`api/channels/${channelId}/messages/${id}`, {
        text: editMessage,
      });
      fetchMessage();
      setEditId(null);
      setEditMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/channels/${channelId}/messages/${id}`);
      fetchMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`api/channels/${channelId}/messages/`, {
        userName: "Henry",
        text: msgText,
      });
      fetchMessage();
      setMsgText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-[#36393f]">
        <div className="flex py-6 justify-center">
          <h1 className="text-xl font-bold text-white">Discord 2.0</h1>
        </div>
        <hr className="border-t-4 w-full border-[#2f3136]" />
        <div className="flex flex-col w-full px-8 mb-[80px]">
          {message ? (
            message.map((message, id) => {
              return (
                <div key={id} className="py-2">
                  {editId === message.id ? (
                    <MessageEditForm
                      handleChange={(e) => setEditMessage(e.target.value)}
                      handleClick={() => handleSave(message.id)}
                      handleValue={editMessage}
                      messageCreated={message.created.split("T")[1]}
                      messageUserName={message.userName}
                    />
                  ) : (
                    <UsualMessages
                      messageUserName={message.userName}
                      messageCreated={message.created.split("T")[1]}
                      messageText={message.text}
                      handleEditClick={() =>
                        handleEdit(message.id, message.text)
                      }
                      handleDeleteClick={() => handleDelete(message.id)}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p>No messages in this channel</p>
          )}
        </div>
        <hr className="border-t-4 w-full border-[#d4d4d4]" />
        <div className="w-full">
          <SendMessageForm
            handleSubmit={sendMessage}
            handleChange={(e) => setMsgText(e.target.value)}
            handleValue={msgText}
          />
        </div>
      </div>
    </>
  );
}
