"use client"
import Typewriter from 'typewriter-effect';


const ResponseMessage = ({ message}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="text-6xl text-gray-600">
      <Typewriter
          options={{
            strings: [message],
            autoStart: true,
            delay: 10,
            loop: false,
            deleteSpeed: 100000,
          }}
        />
      </div>
    </div>
  );
};

export default ResponseMessage;