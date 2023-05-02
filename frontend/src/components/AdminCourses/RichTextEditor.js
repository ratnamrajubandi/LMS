import React, { useRef, useMemo, useState } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ value, onBlur }) => {
  const editor = useRef(null);

  const config = useMemo(() => {
    return {
      buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
    };
  }, []);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={onBlur}
    />
  );
};

export default RichTextEditor;
