import SectionContainer from "@/components/section-container";

const steps = [
  {
    id: 0,
    steps: "01",
    title: "Trashcan",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
  },
  {
    id: 1,
    steps: "02",
    title: "Garbage Truck",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
  },

  {
    id: 2,
    steps: "03",
    title: "Landfill",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
  },
];

const HowItWorks = () => {
  return (
    <SectionContainer>
      <div className="row-gap-10 grid gap-6 lg:grid-cols-2">
        <div className="lg:py-6 lg:pr-16">
          {steps.map(step => (
            <div className="flex" key={step.id}>
              <div className="mr-4 flex flex-col items-center">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                    <p>{step.steps}</p>
                  </div>
                </div>
                <div className="h-full w-px bg-gray-300" />
              </div>
              <div className="pb-8 pt-1">
                <p className="mb-2 text-lg font-bold">{step.title}</p>
                <p className="text-gray-700">{step.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                  <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      points="6,12 10,16 18,8"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-lg font-bold">Recycling</p>
              <p className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="inset-0 h-96 w-full rounded object-cover object-bottom shadow-lg lg:absolute lg:h-full"
            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default HowItWorks;
