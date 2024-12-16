'use client';

import Link from 'next/link';

export const ExternalNavigation = () => {
  return (
    // position absolute
    <header
      className="container px-4 lg:px-6 h-14 flex items-center absolute top-0 left-0 right-0 z-50 bg-white
    "
    >
      <Link className="flex items-center justify-center" href="/">
        <span className="hidden lg:block ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          NomadFlow
        </span>
        <span className="block lg:hidden ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Nextbase
        </span>
      </Link>
      {/* <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm hidden lg:block font-medium hover:underline underline-offset-4"
          href="#"
        >
          log in
        </Link>

        <Link
          className="text-sm hidden lg:block font-medium hover:underline underline-offset-4"
          href="#"
        >
          try now
        </Link>
      </nav> */}
    </header>
  );
};
