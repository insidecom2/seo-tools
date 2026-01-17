export const isCheckFileType = (file: File, allowType?: string): boolean => {
  if (!allowType) return true;
  const isValidType = allowType
    .split(",")
    .some((type) => file.type.split("/")[1].includes(type.trim()));
  return isValidType;
};
