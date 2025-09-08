import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const DateTimeConvert = (
  timeStamp: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // Set default timezone to Asia/Bangkok (UTC+7)
  dayjs.tz.setDefault("Asia/Bangkok");

  return dayjs(timeStamp).format(format);
};
