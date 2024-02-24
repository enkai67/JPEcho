import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import config from "config";

const { region } = config.get("data.aws");
const BUCKET = config.get("data.s3.bucket");
const s3Client = new S3Client({ 
    region,
    credentials: {
        accessKeyId: "AKIAUB37G6LNRQ26I7B6",
        secretAccessKey: "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",
    },
});

const streamToBuffer = async (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
};

const downloadS3Object = async (key) => {
    const command = new GetObjectCommand({ Bucket: "elasticbeanstalk-ap-northeast-1-278902797019", Key: key });
    const response = await s3Client.send(command);

    const content = await streamToBuffer(response.Body);

    return content.toString("utf-8");
};

export default {
    downloadS3Object
}