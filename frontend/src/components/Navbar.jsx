import React from 'react';
import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl px-4 py-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-[#00FF9D] font-mono tracking-tight'>
            NoteAPP
          </h1>
          <div className='flex items-center gap-4'>
            <Link
              to="/create"
              className="btn bg-[#00FF9D] hover:bg-[#00e68c] text-black border-none"
            >
              <PlusIcon className='size-5' />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
