import React, { useState } from "react";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useParams } from "react-router-dom";
import { Send } from "@mui/icons-material";
import useIsLoadingMessage from "./useIsLoadingMessage";

const SubmitButton = () => {
  const { courseId, chatId } = useParams();
  const [question, setQuestion] = useState<string>("");
  const loading = useIsLoadingMessage({ courseId, chatId });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.api.message.sendMessage(courseId, chatId, question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <OutlinedInput
        disabled={loading}
        fullWidth={true}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton disabled={loading || question === ""} type="submit">
              <Send />
            </IconButton>
          </InputAdornment>
        }
      />
    </form>
  );
};

export default SubmitButton;