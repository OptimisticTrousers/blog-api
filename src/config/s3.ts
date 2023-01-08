import { S3 } from "aws-sdk";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";

export const s3Uploadv3 = async (file: any) => {
  try {
    const s3client = new S3Client({ region: "us-east-1" });

    const param = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${file.originalname}`,
      ContentType: file.mimetype,
      Body: fs.createReadStream(file.path),
    };

    const data = await s3client.send(new PutObjectCommand(param));
    console.log(`Success. Object uploaded. ${data}`);
    console.log(data)
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const s3Deletev3 = async (file: any) => {
  try {
    const param = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${file.originalname}`,
    };
    const s3client = new S3Client({ region: "us-east-1" });
    const data = await s3client.send(new DeleteObjectCommand(param));
    console.log(`Success. Object deleted`);
    console.log(data)
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

