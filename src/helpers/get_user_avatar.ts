import driveService from '../services/drive.service';
import randomAvatarPicker from './random_avatar';
import { DriveEnums, UserAvatarType } from '../types/drive';
import { Gender, UserType } from '../types/user';

export default async function getUserDefaultAvatar(
  request: UserType
): Promise<UserAvatarType> {
  const { gender } = request;
  let avatar: UserAvatarType | undefined = undefined;

  try {
    const drive = new driveService();

    if (gender === Gender.MALE) {
      const { data: maleAvatars } = await drive.listFiles(
        DriveEnums.DEFAULT_MALE_ADDRESS_ID
      );

      avatar = randomAvatarPicker(maleAvatars);
    } else {
      const { data: femaleAvatars } = await drive.listFiles(
        DriveEnums.DEFAULT_FEMALE_ADDRESS_ID
      );

      avatar = randomAvatarPicker(femaleAvatars);
    }
  } catch (error) {
    throw new Error(error);
  }

  return avatar;
}
