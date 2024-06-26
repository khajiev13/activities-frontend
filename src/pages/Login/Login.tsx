import React from 'react';
import AnimationHockeyPlayer from '../../components/RegisterPage/AnimationHockeyPlayer';
import { LoginForm } from '@/components/LoginPage/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="App flex p-0 m-0 h-screen min-w-screen flex-row">
      <div className="w-full md:min-w-[500px] flex-grow flex flex-col lg:px-8 md:px-24  align-center justify-center">
        <LoginForm />
      </div>
      {/* Right side of the window */}
      <div className="w-56-percent min-w-fit px-4 light:bg-skin-color min-h-full lg:flex hidden justify-center items-center flex-col pt-20">
        <h2 className="font-murecho font-bold text-maincolor text-[32px] text-center tracking-[0] leading-[normal] mb-2">
          Eventopia - a place where different events take place!
        </h2>
        <p className="w-[563px] text-foreground font-murecho font-normal text-[18px] text-center tracking-[0] leading-[26px]">
          It was a platform for people to make friends and attend different
          kinds of activities. Let’s start our interesting experience!
        </p>
        <AnimationHockeyPlayer height={500} width={590} />
      </div>
    </div>
  );
};

export default Login;
