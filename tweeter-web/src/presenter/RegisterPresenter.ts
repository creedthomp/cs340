import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { NavigateFunction } from "react-router-dom";

export interface RegisterView {
  // maybe the import is wrong??
  UpdateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: NavigateFunction;
  displayErrorMessage: (message: string) => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  // setImageBytes: (
  //   value: React.SetStateAction<Uint8Array<ArrayBufferLike>>
  // ) => void;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}

export class RegisterPresenter {
  private _view: RegisterView;
  private userService: UserService;
  private setIsLoading: boolean = false;
  private imageBytes: Uint8Array = new Uint8Array();

  public constructor(view: RegisterView) {
    this._view = view;
    this.userService = new UserService();
  }

  public async doRegister(
    firstName: any,
    lastName: any,
    alias: any,
    password: any,
    imageBytes: any,
    imageFileExtension: any,
    rememberMe: any
  ) {
    try {
      this.setIsLoading = true;

      const [user, authToken] = await this.userService.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );

      this._view.UpdateUserInfo(user, user, authToken, rememberMe);
      this._view.navigate("/");
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    } finally {
      this.setIsLoading = false;
    }
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this._view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.imageBytes = bytes;
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this._view.setImageFileExtension(fileExtension);
      }
    } else {
      this._view.setImageUrl("");
      this.imageBytes = new Uint8Array();
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }
}
