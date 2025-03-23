import { TweeterResponse } from "./TweeterResponse";

export interface FollowCountReponse extends TweeterResponse {
  followeeCount?: number;
  followerCount?: number;
}
