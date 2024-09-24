"use client";

import SectionContainer from "@/components/section-container";
import { useState, ReactNode } from "react";

interface ItemProps {
  title: string;
  children: ReactNode;
}

const Item = ({ title, children }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex w-full items-center justify-between p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 transform text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <SectionContainer>
      <div className="w-full sm:mx-auto">
        <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:w-full">
          <div>
            <p className="mb-4 inline-block rounded-full bg-highland-400 px-3 py-px text-xs font-semibold uppercase tracking-wider text-highland-900">
              Frequently Asked Question
            </p>
          </div>
          <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
              >
                <defs>
                  <pattern
                    id="232db96b-4aa2-422f-9086-5a77996d1df1"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)" width="52" height="24" />
              </svg>
              <span className="relative">The</span>
            </span>
            &nbsp;quick, brown fox jumps over a lazy dog
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </p>
        </div>
        <div className="space-y-4">
          <Item title="The quick, brown fox jumps over a lazy dog?">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </Item>
          <Item title="The first mate and his Skipper too will do?">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </Item>
          <Item title="Is the Space Pope reptilian!?">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </Item>
          <Item title="How much money you got on you?">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </Item>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Faq;
