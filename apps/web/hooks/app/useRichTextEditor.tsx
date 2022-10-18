import { useRef, useState } from "react";

export const useRichTextEditor = (onChange: any) => {
  const editorInstance: any = useRef(null);
  const [loading, setLoading] = useState(true);

  return { editorInstance, loading, setLoading };
};
