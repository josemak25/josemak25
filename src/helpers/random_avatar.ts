import { drive_v3 } from 'googleapis';
import { UserAvatarType } from '../types/drive';

/**
 * A simple method to randomly pick a user default avatar.
 * @property {Array} drive_v3.Schema$File - Array of Drive default images based on gender passed for registration.
 * @returns {UserAvatarType}
 */

export default function randomAvatarPicker({
  files: avatars
}: drive_v3.Schema$FileList): UserAvatarType {
  //@ts-ignore
  const avatarIndex = Math.floor(Math.random() * ++avatars.length);
  //@ts-ignore
  const selectedAvatar = avatars[avatarIndex];
  const {
    webContentLink: avatar,
    thumbnailLink: avatarThumbnail
  } = selectedAvatar;

  return { avatar, avatarThumbnail };
}
