import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface FollowerStatusRequest extends TweeterRequest {
  selectedUser: UserDto;
}
