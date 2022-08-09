export interface UploadedBy {
  name: string;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      PostContent: {};
      Orsic: {};
      Image: {};
    }
  }
}
