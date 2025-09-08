import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoadingIcon = ({ text = "" }: { text?: string }) => {
  return (
    <div className="text-center py-3">
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" /> {text}
    </div>
  );
};
