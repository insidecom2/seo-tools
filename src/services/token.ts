import { httpStatus } from "@/src/enums/http";
import { responseData } from "@/src/interface/response";
import { generateToken } from "@/src/lib/storage/storage";
import { NextApiResponse } from "next/types";

async function generateKey(res: NextApiResponse<responseData>) {
  const bucket = process.env.STORAGE_BUCKET_NAME;
  const storeKey = process.env.STORAGE_BUCKET_TOKEN;
  const url = process.env.STORAGE_BUCKET_URL;
  try {
    const token = generateToken(bucket, storeKey);

    return res.status(httpStatus.OK).json({
      status: true,
      message: "OK",
      data: {
        token,
        bucket,
        url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: error,
    });
  }
}

export { generateKey };
