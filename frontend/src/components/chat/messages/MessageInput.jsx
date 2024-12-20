import { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import Button from "../../atoms/Button";
import { IoIosSend } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import SpinnerIcon from "../../atoms/SpinnerIcon";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  function handleChange(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="chatbox__message_container--form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Send a message"
        value={message}
        onChange={handleChange}
        disabled={loading}
      />
      <Button
        type="submit"
        className="filled_button send_button"
        icon={loading ? <SpinnerIcon /> : <IoIosSend />}
      />
      <ToastContainer />
    </form>
  );
};
export default MessageInput;
