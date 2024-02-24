import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import config from "config";

const { region } = config.get("data.aws");
const BUCKET = config.get("data.s3.bucket");
const s3Client = new S3Client({ region });

const downloadS3Object = async (key) => {
    console.log(key);
    const command = new GetObjectCommand({ Bucket: "elasticbeanstalk-ap-northeast-1-278902797019", Key: key });
    await s3Client.send(command);
};

export default {
    downloadS3Object
}