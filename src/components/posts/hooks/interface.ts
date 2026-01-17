export interface SocialPost {
  id: number;
  pageId: string;
  pageName: string;
  postId: string;
  permalinkUrl: string;
  mediaType: "photo" | "video" | "reel" | string;
  fullPicture: string;
  attachmentMedia: string;
  attachmentTargetId: string;
  attachmentUrl: string;
  description: string;
  createdTime: string; // ISO 8601 date string
  facebookStatus: "pending" | "completed" | "failed" | string;
  googleBusinessStatus: "pending" | "completed" | "failed" | string;
  tikTokStatus: "pending" | "completed" | "failed" | string;
  youtubeStatus: "pending" | "completed" | "failed" | string;
  webStatus: "pending" | "completed" | "failed" | string;
  imageLinkRaw: string;
  videoLinkRaw: string;
}
