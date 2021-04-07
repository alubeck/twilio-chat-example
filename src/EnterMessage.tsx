import React from "react";
import { Form, Input, Button } from "antd";

interface Props {
  onSendMessage: (text: string) => void;
}

const EnterMessage: React.FC<Props> = ({ onSendMessage }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "#EFEFEF",
      }}
    >
      <div
        style={{
          border: "2px solid #AAA",
          borderRadius: "20px",
          backgroundColor: "#F8F8F8",
          margin: "10px",
        }}
      >
        <Form onFinish={values => onSendMessage(values.enteredMessage)}>
          <Form.Item name="enteredMessage">
            <Input.TextArea
              style={{
                borderRadius: "20",
                borderColor: "#AAA",
                padding: "10px",
                margin: "10px",
                border: "none",
                fontSize: "0.9vw",
                fontFamily: "sans-serif",
                width: "calc(100% - 40px)",
                backgroundColor: "#F8F8F8",
                overflow: "visible",
                outline: "none",
                boxShadow: "none",
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EnterMessage;
