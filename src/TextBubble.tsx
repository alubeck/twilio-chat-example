import React from "react";

interface Props {
  memberPart?: "1" | "2";
  postTime?: string;
}

const TextBubble: React.FC<Props> = ({ memberPart, postTime, children }) => {
  return (
    <div
      style={{
        textAlign: memberPart === "2" ? "right" : "left",
      }}
    >
      <div
        style={{
          marginLeft: memberPart === "2" ? "0px" : "5px",
          marginRight: memberPart === "2" ? "5px" : "0px",
          color: "#AAA",
          fontSize: "1.2vh",
        }}
      >
        {postTime}
      </div>

      <div
        style={{
          display: "inline-block",
          margin: "5px",
          padding: "15px",
          borderRadius: "20px",
          borderTopLeftRadius: memberPart === "2" ? "20px" : "5px",
          borderTopRightRadius: memberPart === "2" ? "5px" : "20px",
          backgroundColor: memberPart === "2" ? "#DEDEDE" : "#BEBEBE",
          maxWidth: "60%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TextBubble;
