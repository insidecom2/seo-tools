import { Methods } from "@/src/utils/http";
export interface requestType {
  method: Methods;
  url: string;
  body?: BodyInit;
  content_type?: string;
}
