'use client';

import Link from 'next/link';

const InternalNavigation = () => {
  return (
    <header className="container px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <span className="hidden lg:block ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Nomad Store
        </span>
        <span className="block lg:hidden ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Nextbase
        </span>
      </Link>
    </header>
  );
};

export default InternalNavigation;
