import { FaCircleNotch } from "react-icons/fa6";

export const LoadingIcon = ({ text = "" }: { text?: string }) => {
  return (
    <div className="loading-overlay">
      <FaCircleNotch size={24} className="spin" />
      {text}
    </div>
  );
};
