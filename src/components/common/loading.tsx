import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoadingIcon = ({ text = "" }: { text?: string }) => {
  return (
    <div className="loading-overlay">
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" width={32} /> {text}
    </div>
  );
};
