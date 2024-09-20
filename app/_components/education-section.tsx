import SectionContainer from "@/components/section-container";

const Education = () => {
  return (
    <SectionContainer>
      <div className="mb-6 flex flex-col md:mb-8 lg:flex-row lg:justify-between">
        <h2 className="group mb-5 max-w-lg font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6">
          <span className="mb-1 inline-block sm:mb-4">
            The quick, brown fox <br className="hidden md:inline-block" />
            jumps over a lazy dog
          </span>
          <div className="scale-x-30 ml-auto h-1 origin-left transform bg-highland-400 duration-300 group-hover:scale-x-100" />
        </h2>
        <p className="text-gray-700 lg:max-w-md lg:text-sm">
          Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem accusantium doloremque
          rem aperiam, ipsa eaque quae. Sed ut perspiciatis unde omnis iste.
        </p>
      </div>
      <div className="row-gap-5 sm:row-gap-6 mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <a href="/" aria-label="View Item">
          <div className="relative transform overflow-hidden rounded shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="h-56 w-full object-cover md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
              <p className="text-sm font-medium tracking-wide text-white">
                Sed ut perspiciatis unde omnis iste natus error
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative transform overflow-hidden rounded shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="h-56 w-full object-cover md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
              <p className="text-sm font-medium tracking-wide text-white">
                Leverage agile frameworks to provide a robust synopsis
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative transform overflow-hidden rounded shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="h-56 w-full object-cover md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
              <p className="text-sm font-medium tracking-wide text-white">
                Dingy Im telling you rhubaahb Bangah Jo-Jeezly
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative transform overflow-hidden rounded shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="h-56 w-full object-cover md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
              <p className="text-sm font-medium tracking-wide text-white">
                Rough pomfret lemon shark plownose chimaera
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="text-center">
        <a
          href="/"
          aria-label=""
          className="text-deep-purple-accent-400 hover:text-deep-purple-800 inline-flex items-center font-semibold transition-colors duration-200"
        >
          See more
          <svg className="ml-2 inline-block w-3" fill="currentColor" viewBox="0 0 12 12">
            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
          </svg>
        </a>
      </div>
    </SectionContainer>
  );
};

export default Education;
