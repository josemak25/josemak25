import fs from 'fs';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { ImageUploadType } from '../types/images';
import config from '../config';
const drive = google.drive('v3');

const SCOPES = ['https://www.googleapis.com/auth/drive'];

export default class driveService {
  private jwtToken: JWT | undefined = undefined;
  private queryReturnFields: string = `kind, id, name, mimeType, webContentLink, iconLink, hasThumbnail, thumbnailLink, createdTime, modifiedTime`;

  constructor() {
    this.initDrive();
  }

  async initDrive() {
    try {
      this.jwtToken = new google.auth.JWT(
        config.driveClientEmail,
        undefined,
        config.drivePrivateKey,
        SCOPES
      );

      await this.jwtToken.authorize();
    } catch (error) {
      console.warn(error);
    }
  }

  listFiles(queryAddress: string) {
    return drive.files.list({
      auth: this.jwtToken,
      q: `'${queryAddress}' in parents`,
      fields: `files(${this.queryReturnFields})`
    });
  }

  async getFile(queryAddress: string) {
    return drive.files.get({
      auth: this.jwtToken,
      fileId: queryAddress,
      fields: this.queryReturnFields
    });
  }

  async createFile(payload: ImageUploadType) {
    return drive.files.create({
      auth: this.jwtToken,
      requestBody: {
        name: payload.name,
        mimeType: payload.type,
        parents: [payload.folderId]
      },
      media: {
        mimeType: payload.type,
        body: fs.createReadStream(payload.path)
      },
      fields: this.queryReturnFields
    });
  }
}
