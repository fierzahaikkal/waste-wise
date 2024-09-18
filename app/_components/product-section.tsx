import SectionContainer from "@/components/section-container";

const Products = () => {
  return (
    <SectionContainer>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="grid place-content-center rounded-xl bg-highland-100 p-6 sm:p-8">
          <div className="mx-auto max-w-md text-center lg:text-left">
            <header>
              <h2 className="text-xl font-bold text-highland-900 sm:text-3xl">Recent Products</h2>

              <p className="mt-4 text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas rerum quam amet
                provident nulla error!
              </p>
            </header>

            <a
              href="/"
              className="mt-8 inline-block rounded border border-highland-900 bg-highland-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
            >
              Lets Buy
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 lg:py-8">
          <ul className="grid grid-cols-2 gap-4">
            <li>
              <a href="/" className="group block">
                <img
                  src="https://images.unsplash.com/photo-1696739696228-eee49592ff07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="aspect-square w-full rounded object-cover"
                />

                <div className="mt-3">
                  <h3 className="font-medium text-highland-900 group-hover:underline group-hover:underline-offset-4">
                    Recycle Bottles
                  </h3>

                  <p className="mt-1 text-sm text-gray-700">Rp. 5.000 per bottle</p>
                </div>
              </a>
            </li>

            <li>
              <a href="/" className="group block">
                <img
                  src="https://images.unsplash.com/photo-1677753727712-c79ce4c420c1?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="aspect-square w-full rounded object-cover"
                />

                <div className="mt-3">
                  <h3 className="font-medium text-highland-900 group-hover:underline group-hover:underline-offset-4">
                    Waste Free Bag
                  </h3>

                  <p className="mt-1 text-sm text-gray-700">Rp. 3.000 per bag</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Products;
