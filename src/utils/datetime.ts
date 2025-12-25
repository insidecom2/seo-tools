import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

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
