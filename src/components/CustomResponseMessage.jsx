"use client"
import Typewriter from 'typewriter-effect';


const CustomResponseMessage = ({ message, txtSize, delay}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className={`${txtSize} text-blue-700`}>
      <Typewriter
          options={{
            strings: [message],
            autoStart: true,
            delay: delay,
            loop: false,
            deleteSpeed: Infinity,
            cursor: '.'
          }}
        />
      </div>
    </div>
  );
};

export default CustomResponseMessage;