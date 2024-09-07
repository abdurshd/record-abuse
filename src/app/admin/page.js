// 'use client'; 

// import { useEffect, useState } from 'react';
import { GetUserMessages, GetUsers } from '@/DB/user';  

export default async function Home() {
  // console.log(await GetUserMessages())
  const users = await GetUserMessages()
  console.log('this is console', users)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}
