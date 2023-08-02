import AWS, { S3 } from "aws-sdk";
import { Buffer } from "buffer";

const accessKeyId = "AKIAZB4HJ65BQNKF4VMK";
const secretAccessKey =  "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";

export const uploadProductImage = async(file : string, filePath : string, fileTypes: string)=>{

    AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region: "us-east-1"
    });
    
    const BUCKET_NAME = "katariya-product-image";
    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
    const bucket = new AWS.S3();

    const buf = Buffer.from(file.split(",")[1], "base64");

    const params: S3.PutObjectRequest = {
      Body: buf,
      ContentEncoding: "base64",
      ContentType: fileTypes,
      ACL: "public-read",
      Key: filePath,
      Bucket: BUCKET_NAME as string,
    };
    return new Promise((resolve, reject) => {
      bucket.upload(params, options, (s3Err: any, data: any) => {
        console.log("bucket upload");
        if (data) {
          console.log("s3 data >>>>>>>>>>>>", data);
          resolve(data.Location);
        }
        if (s3Err) {
          console.log("s3 eror >>>>>>>>>>>>", s3Err);
          reject(s3Err);
        }
      });
    });
};


export function uploadFileToS3(file : any, fileName : string) {
  const s3 = new AWS.S3();
  AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region: "us-east-1"
    });

    console.log("aws config>>>>>>>>>>>", AWS);
  const params = {
    Bucket: "katariya-product-image",
    Key: fileName,
    Body: file,
  };

  s3.putObject(params, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log("File uploaded successfully.", data);
    }
  });
}



