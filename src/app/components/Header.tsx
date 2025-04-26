import React, { use } from 'react';
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'; // Assuming you're using Clerk for auth
import Link from 'next/link';


function Header() {
  
  return (
    // Sticky Header
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 h-20 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-b-xl">
      <div className="logo font-bold text-2xl">
        <span className="text-blue-600 mr-1">Skills</span>
        <span className="text-gray-800 text-xl">Connect</span>
      </div>

      <div className="flex items-center gap-5">
        <SignedOut>
          <div className="flex items-center gap-4">
          <Link href="/sign-in">Signin</Link>
          <Link href="/sign-up">Signup</Link>
          </div>
        </SignedOut>
        <SignedIn>
        <button className="bg-blue-700 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out"
        >
         <Link href="/jobs/my-jobs">Get Started</Link>
        </button>

        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
