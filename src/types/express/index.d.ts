import { UserTokenType } from '../user';
import { ImageUploadType, ImageType } from '../images';

declare global {
  export namespace Express {
    interface Request {
      token: UserTokenType;
      compressedImages: ImageUploadType[];
      uploadedImageFiles: ImageType[];
    }
  }
}
