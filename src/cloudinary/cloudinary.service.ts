import streamifier from 'streamifier';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './dtos/cloudinary-response';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ConfigService } from '@nestjs/config';
import { RESPONSE_MESSAGE } from 'src/common/constants/response.message';
@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${this.configService.get(
      'APP_URL',
    )}/images/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }

  async saveImage(image: {
    createReadStream: () => any;
    filename: string;
    mimetype: string;
  }) {
    const VALID_IMAGE_TYPE = ['image/jpeg', 'image/png', 'image/gif'];

    if (!VALID_IMAGE_TYPE.includes(image.mimetype)) {
      throw new BadRequestException({
        image: RESPONSE_MESSAGE.INVALID_FILE_TYPE,
      });
    }
    const imageName = `${Date.now()}-${image.filename}`;
    const imagePath = `${this.configService.get('IMAGE_PATH')}/${imageName}`;

    const stream = image.createReadStream();
    const outputPath = `public${imagePath}`;
    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return imagePath;
  }
}
