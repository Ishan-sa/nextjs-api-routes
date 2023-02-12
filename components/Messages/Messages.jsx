import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { faker } from "@faker-js/faker";

export default function Messages({ messageId = 1 }) {
  const [message, setMessage] = useState(null);
  const [channelId, setChannelId] = useState(messageId);

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

  const images = {
    image: (id) => faker.image.abstract(30 + id, 30 + id, true),
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex py-6 justify-center">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
        <hr className="border-t-4 w-full border-[#2f3136]" />
        <div className="flex flex-col w-full px-8">
          {message ? (
            message.map((message, id) => {
              return (
                <div key={id} className="py-2">
                  <div className="flex items-center gap-3">
                    {/* <Image
                      src={"https://placekitten.com/30/30"}
                      width={30}
                      height={30}
                    /> */}
                    <h3 className="text-md font-bold text-blue-900">
                      {message.userName}
                    </h3>
                    <p className="text-gray-500 text-sm">{message.created}</p>
                  </div>
                  <p>{message.text}</p>
                </div>
              );
            })
          ) : (
            <p>No messages in this channel</p>
          )}
        </div>
      </div>
    </>
  );
}
