import { Button } from "@nextui-org/button";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-lg">
          <h1 className="bg-gradient-to-r from-highland-700 via-highland-500 to-highland-300 bg-clip-text text-3xl font-semibold text-gray-800 text-transparent dark:text-white sm:text-5xl md:text-[80px] md:font-bold lg:text-4xl">
            Double Earnings and Growth Community From Your Waste
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero similique obcaecati
            illum mollitia.
          </p>
          <Button className="mt-6 rounded-lg bg-highland-600 px-5 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">
            Lets join us!
          </Button>
          <p className="mt-3 text-sm text-gray-400">Go Participated</p>
        </div>

        <div className="mt-10 flex justify-center">
          <img
            className="h-[400px] w-full rounded-xl object-cover lg:w-4/5"
            alt=""
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          />
        </div>
      </div>
    </section>
  );
}
