const isAPISupported = (api: string): boolean =>
  typeof window !== "undefined" ? api in window : false;

export default isAPISupported;
