'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uVG77qDcbLd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image';
import Link from 'next/link';

// ICONS
// https://heroicons.com/outline

function CTAButton({
  href,
  text,
  secundary = false,
}: {
  href: string;
  text: string;
  secundary?: boolean;
}) {
  const primaryStyle =
    'px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300';
  const secondaryStyle =
    'px-6 py-3 text-blue-500 bg-white border border-blue-500 rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300';
  const style = secundary ? secondaryStyle : primaryStyle;
  return (
    <Link href={href}>
      <button className={style}>{text}</button>
    </Link>
  );
}

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen1 relative  mt-40">
      <h1 className="text-5xl font-bold text-center text-gray-900">
        Seamless migration from WooCommerce to Shopify without losing your data
      </h1>
      <p className="mt-4 text-xl text-center text-gray-600 max-w-lg mt-8">
        Focus on your sales while we protect your products, clients, orders and
        SEO rankings.
      </p>
      <div className="mt-6 flex gap-4">
        <CTAButton href="/login" text="Try free demo migration" />
        <CTAButton href="/register" text="Migrate my data now" secundary />
      </div>
    </div>
  );
}

import { useState } from 'react';

const VideoSection = ({ videoUrl }: { videoUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center relative h-[489px]">
      {!isPlaying ? (
        <div
          className="mt-8 flex items-center justify-center w-full h-full max-w-[869px] max-h-[489px] bg-gray-300 rounded-lg shadow-md cursor-pointer relative"
          onClick={handlePlay}
        >
          {/* Placeholder Image */}
          <Image
            src="https://www.iom.int/sites/g/files/tmzbdl486/files/styles/social_media/public/banner/About%20Migration.jpg?h=fd2854b8&itok=ExrQcsyP"
            alt="Video Placeholder"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          {/* Play Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-28"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="mt-8 w-full h-full max-w-[869px] max-h-[489px]">
          {/* YouTube Video */}
          <iframe
            className="w-full h-full rounded-lg shadow-md"
            src={`${videoUrl}?autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

type BenefitItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link?: {
    text: string;
    href: string;
  };
};

const BenefitItem: React.FC<BenefitItemProps> = ({
  icon,
  title,
  subtitle,
  link,
}) => {
  return (
    <div className="flex items-start gap-4 flex-end p-0 md:p-4 w-[439px] md:w-[339px] lg:w-[539px]">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100- rounded-full- shrink-0 hidden md:block">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight text-wrap">
          {title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed truncate text-wrap">
          {subtitle}
        </p>
        {link && (
          <a href={link.href} className="mt-2">
            <p className="text-blue-500">{link.text}</p>
          </a>
        )}
      </div>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
          />
        </svg>
      ),
      title: 'Your SEO ranking intact',
      subtitle:
        'Quickly customize components to suit your needs.Optimized for fast loading and responsiveness.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
      title: 'Compatibility Guaranteed',
      subtitle:
        "All your migrated data is perfectly formatted to work seamlessly with Shopify's features and tools.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      ),
      title: 'Full data preservation',
      subtitle:
        'Products, orders, reviews, customer profiles, and more transfer without loss.',
      link: {
        text: 'See the full list of data we migrate',
        href: '#data-table',
      },
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
      ),
      title: 'Seamless migration to Shopify',
      subtitle:
        'Your information is safe and sound with our reliable migration process.',
      link: {
        text: 'Read our Data Security Policy',
        href: '#security',
      },
    },
    // Add more benefits as needed...
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 container mx-auto min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
        Why Choose Nomad?
      </h2>
      <p className="mt-4 text-base md:text-lg text-center text-gray-600 max-w-lg">
        Because your time, peace of mind, and business success matter
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full px-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 py-6 ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            <BenefitItem
              icon={benefit.icon}
              title={benefit.title}
              subtitle={benefit.subtitle}
              link={benefit.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const PricingSection = () => {
  return (
    <div className="flex flex-col items-center py-16 h-screen  md:mt-12 lg:mt-0">
      <h2 className="text-4xl font-bold text-gray-900 text-center">
        Choose Your Plan
      </h2>
      <p className="mt-4 text-lg text-gray-600 text-center">
        Start with a free trial or unlock the full potential with our Pro
        version.
      </p>
      <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
        {/* Free Trial Card */}
        <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Free Trial
          </h3>
          <p className="mt-4 text-gray-600 text-center">
            Experience all the basic features for 7 days at no cost.
          </p>
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Pro Version Card */}
        <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md p-6 relative">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Pro Version
          </h3>
          <p className="mt-4 text-gray-600 text-center">
            Unlock all premium features for just $50.
          </p>
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
              Get Pro Version
            </button>
          </div>
          <p className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-lg shadow">
            Provide feedback and get Pro for $10!
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProcessSection = () => {
  return (
    <div className="flex flex-col items-center h-auto md:h-screen justify-center px-4">
      <p className="text-lg font-medium text-gray-600 text-center">
        A process designed for you
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
        Quick, easy, and worry-free
      </h2>
      <div className="mt-8 flex flex-wrap items-start justify-center gap-8">
        {/* Step 1 */}
        <div className="flex flex-col w-80">
          <div className="w-full h-48 md:h-64 bg-gray-300 rounded-lg"></div>
          <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-900">
            Lorem ipsum
          </h3>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col w-80">
          <div className="w-full h-48 md:h-64 bg-gray-300 rounded-lg"></div>
          <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-900">
            Lorem ipsum
          </h3>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col w-80">
          <div className="w-full h-48 md:h-64 bg-gray-300 rounded-lg"></div>
          <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-900">
            Lorem ipsum
          </h3>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

// export const SideTextWithImage = () => {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center px-12 gp-12">
//       {/* Left Text Section */}
//       <div className="md:w-1/2 text-center md:text-left">
//         <h2 className="text-4xl font-bold text-gray-900">
//           Engaging Headline
//         </h2>
//         <p className="mt-4 text-lg text-gray-600">
//           This is a descriptive paragraph that explains the purpose of this
//           section. Use it to provide more information or context for the
//           image or content on the right.
//         </p>
//       </div>

//       {/* Right Image Section */}
//       <div className="md:w-1/2 flex items-center justify-center">
//         <div className="w-80 h-80 bg-gray-300 rounded-lg flex items-center justify-center">
//           <p className="text-gray-500">Image Placeholder</p>
//         </div>
//       </div>
//     </div>
//   );
// };

export const SideTextWithImage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-12 px-8 md:px-16 lg:px-24">
      {/* Left Text Section */}
      <div
        className="md:w-1/2  md:text-left flex flex-col 
        align-center
      justify-center px-6 md:px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Engaging Headline
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-600 ">
          This is a descriptive paragraph that explains the purpose of this
          section. Use it to provide more information or context for the image
          or content on the right.
        </p>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="w-64 md:w-80 h-64 md:h-80 bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Image Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export const TextWithImage = () => {
  return (
    <div className=" min-h-screen bg-base-200 px-8 md:px-16 lg:px-24">
      <div className="t flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Discover the Benefits
          </h1>
          <p className="py-6 text-gray-600 text-lg leading-relaxed">
            Explore how our platform can transform your experience. Whether
            you're looking for efficiency, reliability, or innovation, we’ve got
            you covered with the best tools and support available.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <Image
              src="https://via.placeholder.com/300"
              alt="Example"
              className="rounded-lg shadow-lg w-80 h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent rounded-lg opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-lg text-center text-gray-600">
        Have questions? We've got answers.
      </p>
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="space-y-4">
          {/* FAQ Item 1 */}
          <div className="collapse collapse-arrow border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              What is the pricing for the Pro version?
            </div>
            <div className="collapse-content">
              <p>
                The Pro version is $50. If you provide feedback, you can get it
                for only $10!
              </p>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="collapse collapse-arrow border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              How does the free trial work?
            </div>
            <div className="collapse-content">
              <p>
                The free trial gives you access to all basic features for 7
                days, no credit card required.
              </p>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="collapse collapse-arrow border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Can I cancel my subscription?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can cancel anytime. Your access will remain active
                until the end of the billing cycle.
              </p>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="collapse collapse-arrow border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              What payment methods are accepted?
            </div>
            <div className="collapse-content">
              <p>
                We accept all major credit cards, PayPal, and bank transfers for
                larger orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <section className="w-full">
        <HeroSection />
      </section>

      {/* <section className="w-full"> */}
      <VideoSection videoUrl="https://www.youtube.com/embed/zb47CstE7R4?si=2m32bymn8_8nAM50&autoplay=1" />
      {/* </section> */}

      <section className="w-full">
        <BenefitsSection />
      </section>

      <section className="w-full">
        <SideTextWithImage />
      </section>

      <section className="w-full">
        <ProcessSection />
      </section>

      <section className="w-full">
        <PricingSection />
      </section>

      <section className="w-full">
        <FAQSection />
      </section>
    </>
  );
};

export default LandingPage;
