export enum DriveEnums {
  // all driver base roots folder ids
  DRIVE_BASE_ROOT_ID = '1fKV0zjZa7sOAKV0Ts9iVelOSMdfW2480',
  DRIVE_IMAGES_BASE_ROOT_ID = '1w6jGtdHgHpDB2QBjYJm1t0q7oU0JVGbz',
  IMAGES_AVATAR_ROOT_ID = '1bpNfXZvvnLkPQKPPENo05q9mLHDe63HD',
  IMAGES_PRODUCT_ROOT_ID = '1tgopgqPLRck77BMTLRV0eXjsgPM1UhAT',

  // all images [AVATAR] folder for default user and user uploaded images
  DEFAULT_FEMALE_ADDRESS_ID = '1PwKbdgxu5aX-LIETn_zdVmpvCLjWkf9Y',
  DEFAULT_MALE_ADDRESS_ID = '1MhjjNmORUzVEPJqvuS5tTita5NFrlGcx',
  USER_UPLOADED_AVATER_ID = '14UQpvrISfeENufH8C5SrgnPRPx-_DUcj'
}

export type UserAvatarType = { avatar?: string; avatarThumbnail?: string };
