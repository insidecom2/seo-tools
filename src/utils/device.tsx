export const isMobileDevice = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop|blackberry|webos/i.test(
    userAgent.toLowerCase()
  );
};
export const isDesktopDevice = (): boolean => {
  return !isMobileDevice();
};
