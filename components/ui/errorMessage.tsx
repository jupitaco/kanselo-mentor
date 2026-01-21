import { PiWarningOctagon } from "react-icons/pi";

const ErrorMessage = ({ message }: { message: any }) => {
  return (
    <div className="error_message font-semi-bold animate__animated animate__bounceIn flex items-center gap-2">
      <div>
        <PiWarningOctagon />
      </div>
      <p className="error_message"> {message}</p>
    </div>
  );
};

export default ErrorMessage;
