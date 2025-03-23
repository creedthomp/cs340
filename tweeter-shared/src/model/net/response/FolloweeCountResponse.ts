import { TweeterResponse } from "./TweeterResponse";

export interface FolloweeCountReponse extends TweeterResponse {
  followeeCount: number;
}
