import { TweeterResponse } from "./TweeterResponse";

// do I even need this if it is just a boool?
export interface FollowerStatusReponse extends TweeterResponse {
  isFollowing: boolean;
}
