import dayjs from "dayjs";

export const DateTimeConvert = (
  timeStamp: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs(timeStamp).format(format);
};
