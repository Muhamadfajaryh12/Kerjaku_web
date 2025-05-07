import React from "react";

const FailedNotification = ({ message }: { message: string }) => {
  return (
    <div className="p-2 border text-red-700 border-red-500 my-4 bg-red-300">
      {message}
    </div>
  );
};

export default FailedNotification;
