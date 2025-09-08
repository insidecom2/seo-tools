import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

export const DateTimeConvert = (
  timeStamp: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  const utcTime = dayjs.utc(timeStamp);
  return utcTime.tz("Asia/Bangkok").format(format);
};
