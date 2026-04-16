import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div
    style={{
      fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      backgroundColor: "#ffffff",
      color: "#333333",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid #eeeeee",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: "#0B0B0F",
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          margin: 0,
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        New Portfolio Message
      </h1>
    </div>

    {/* Body */}
    <div style={{ padding: "40px 30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#888888", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "1px" }}>
          Sender Information
        </p>
        <p style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
          <strong>From:</strong> {name}
        </p>
        <p style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
          <strong>Subject:</strong> {subject}
        </p>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#888888", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "1px" }}>
          Message Content
        </p>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
            borderRadius: "6px",
            borderLeft: "4px solid #0B0B0F",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#444444",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: "#fafafa",
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #eeeeee",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#999999",
        }}
      >
        Sent from your portfolio contact form
      </p>
    </div>
  </div>
);
