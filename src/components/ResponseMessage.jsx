"use client"

const ResponseMessage = ({ message}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="text-6xl text-gray-600">
        {message}
      </div>
    </div>
  );
};

export default ResponseMessage;