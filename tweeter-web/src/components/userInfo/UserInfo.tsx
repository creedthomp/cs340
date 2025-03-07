import "./UserInfo.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "./userInfoHook";
import {
  UserInfoPresenter,
  UserInfoView,
} from "../../presenter/UserInfoPresenter";

const UserInfo = () => {
  const [isFollower, setIsFollower] = useState(false);
  const [followeeCount, setFolloweeCount] = useState(-1);
  const [followerCount, setFollowerCount] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { CurrentUser, userAuthToken, DisplayedUser, SetDisplayedUser } =
    useInfo();

  if (!DisplayedUser) {
    SetDisplayedUser(CurrentUser!);
  }

  useEffect(() => {
    presenter.setIsFollowerStatus(userAuthToken!, CurrentUser!, DisplayedUser!);
    presenter.setNumbFollowees(userAuthToken!, DisplayedUser!);
    presenter.setNumbFollowers(userAuthToken!, DisplayedUser!);
  }, [DisplayedUser]);

  const listener: UserInfoView = {
    setIsFollower: setIsFollower,
    setFolloweeCount: setFolloweeCount,
    setFollowerCount: setFollowerCount,
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    // do I need this??
    //SetDisplayedUser: SetDisplayedUser
  };

  // do I need it like this??
  //const [presenter] = useState(props.presenterGenerator(listener));
  const [presenter] = useState(new UserInfoPresenter(listener));

  //presenter
  // const setIsFollowerStatus = async (
  //   authToken: AuthToken,
  //   currentUser: User,
  //   displayedUser: User
  // ) => {
  //   try {
  //     if (currentUser === displayedUser) {
  //       setIsFollower(false);
  //     } else {
  //       setIsFollower(
  //         await getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
  //       );
  //     }
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to determine follower status because of exception: ${error}`
  //     );
  //   }
  // };

  //const listener: UserInfoView;

  // fake data in here
  // service
  // const getIsFollowerStatus = async (
  //   authToken: AuthToken,
  //   user: User,
  //   selectedUser: User
  // ): Promise<boolean> => {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.isFollower();
  // };

  // const setNumbFollowees = async (
  //   authToken: AuthToken,
  //   displayedUser: User
  // ) => {
  //   try {
  //     setFolloweeCount(await getFolloweeCount(authToken, displayedUser));
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to get followees count because of exception: ${error}`
  //     );
  //   }
  // };

  // fake data in here
  // service
  // const getFolloweeCount = async (
  //   authToken: AuthToken,
  //   user: User
  // ): Promise<number> => {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.getFolloweeCount(user.alias);
  // };

  // const setNumbFollowers = async (
  //   authToken: AuthToken,
  //   displayedUser: User
  // ) => {
  //   try {
  //     setFollowerCount(await getFollowerCount(authToken, displayedUser));
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to get followers count because of exception: ${error}`
  //     );
  //   }
  // };

  // fake data in here
  // service
  // const getFollowerCount = async (
  //   authToken: AuthToken,
  //   user: User
  // ): Promise<number> => {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.getFollowerCount(user.alias);
  // };

  const switchToLoggedInUser = (event: React.MouseEvent): void => {
    event.preventDefault();
    SetDisplayedUser(CurrentUser!);
  };

  //presenter
  // const followDisplayedUser= async (
  //   event: React.MouseEvent
  // ): Promise<void> => {
  //   event.preventDefault();

  //   try {
  //     setIsLoading(true);
  //     displayInfoMessage(`Following ${DisplayedUser!.name}...`, 0);

  //     const [followerCount, followeeCount] = await follow(
  //       userAuthToken!,
  //       DisplayedUser!
  //     );

  //     setIsFollower(true);
  //     setFollowerCount(followerCount);
  //     setFolloweeCount(followeeCount);
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to follow user because of exception: ${error}`
  //     );
  //   } finally {
  //     clearLastInfoMessage();
  //     setIsLoading(false);
  //   }
  // };

  // this says call the server --> service
  // service
  // const follow = async (
  //   authToken: AuthToken,
  //   userToFollow: User
  // ): Promise<[followerCount: number, followeeCount: number]> => {
  //   // Pause so we can see the follow message. Remove when connected to the server
  //   await new Promise((f) => setTimeout(f, 2000));

  //   // TODO: Call the server

  //   const followerCount = await getFollowerCount(authToken, userToFollow);
  //   const followeeCount = await getFolloweeCount(authToken, userToFollow);

  //   return [followerCount, followeeCount];
  // };

  // presenter
  // const unfollowDisplayedUser= async (
  //   event: React.MouseEvent
  // ): Promise<void> => {
  //   event.preventDefault();

  //   try {
  //     setIsLoading(true);
  //     displayInfoMessage(`Unfollowing ${DisplayedUser!.name}...`, 0);

  //     const [followerCount, followeeCount] = await unfollow(
  //       userAuthToken!,
  //       DisplayedUser!
  //     );

  //     setIsFollower(false);
  //     setFollowerCount(followerCount);
  //     setFolloweeCount(followeeCount);
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to unfollow user because of exception: ${error}`
  //     );
  //   } finally {
  //     clearLastInfoMessage();
  //     setIsLoading(false);
  //   }
  // };

  // calls the server
  // service
  // const unfollow = async (
  //   authToken: AuthToken,
  //   userToUnfollow: User
  // ): Promise<[followerCount: number, followeeCount: number]> => {
  //   // Pause so we can see the unfollow message. Remove when connected to the server
  //   await new Promise((f) => setTimeout(f, 2000));

  //   // TODO: Call the server

  //   const followerCount = await getFollowerCount(authToken, userToUnfollow);
  //   const followeeCount = await getFolloweeCount(authToken, userToUnfollow);

  //   return [followerCount, followeeCount];
  // };

  const followDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    presenter.followDisplayedUser(event, userAuthToken!, DisplayedUser!);
    setIsLoading(false);
  };

  const unfollowDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    presenter.unfollowDisplayedUser(event, userAuthToken!, DisplayedUser!);
    setIsLoading(false);
  };

  return (
    <div className={isLoading ? "loading" : ""}>
      {CurrentUser === null ||
      DisplayedUser === null ||
      userAuthToken === null ? (
        <></>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-auto p-3">
              <img
                src={DisplayedUser.imageUrl}
                className="img-fluid"
                width="100"
                alt="Posting user"
              />
            </div>
            <div className="col p-3">
              {DisplayedUser !== CurrentUser && (
                <p id="returnToLoggedInUser">
                  Return to{" "}
                  <Link
                    to={""}
                    onClick={(event) => switchToLoggedInUser(event)}
                  >
                    logged in user
                  </Link>
                </p>
              )}
              <h2>
                <b>{DisplayedUser!.name}</b>
              </h2>
              <h3>{DisplayedUser!.alias}</h3>
              <br />
              {followeeCount > -1 && followerCount > -1 && (
                <div>
                  Followees: {followeeCount} Followers: {followerCount}
                </div>
              )}
            </div>
            <form>
              {DisplayedUser !== CurrentUser && (
                <div className="form-group">
                  {isFollower ? (
                    <button
                      id="unFollowButton"
                      className="btn btn-md btn-secondary me-1"
                      type="submit"
                      style={{ width: "6em" }}
                      onClick={(event) => unfollowDisplayedUser(event)}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <div>Unfollow</div>
                      )}
                    </button>
                  ) : (
                    <button
                      id="followButton"
                      className="btn btn-md btn-primary me-1"
                      type="submit"
                      style={{ width: "6em" }}
                      onClick={(event) => followDisplayedUser(event)}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <div>Follow</div>
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
