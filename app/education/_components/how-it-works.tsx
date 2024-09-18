import CardWorks from "./card-works";

const howItWorks = [
  {
    id: 0,
    steps: "01",
    title: "Trashcan",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
    imageUrl:
      "https://images.unsplash.com/photo-1643701322328-d671ab7814a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXNoY2FufGVufDB8fDB8fHww",
  },
  {
    id: 1,
    steps: "02",
    title: "Garbage Truck",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
    imageUrl:
      "https://images.unsplash.com/photo-1574974671999-24b7dfbb0d53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
  },

  {
    id: 2,
    steps: "03",
    title: "Landfill",
    desc: "Lorem ipsum dolor sit amet consectetur. Gravida id risus nibh sed. Blandit faucibus sed amet elementum at. Vehicula aliquet fermentum varius id purus ut adipiscing tellus. Gravida etiam morbi tristique faucibus pellentesque eleifend commodo curabitur.",
    imageUrl:
      "https://images.unsplash.com/photo-1717667745836-145a38948ebf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
  },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto mb-10 min-h-[600px]">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">How Exactly Is Waste Collected?</h2>
        <h3 className="font-regular text-2xl">
          It begin from your little trashcan at home then...
        </h3>
      </div>
      <div className="relative mb-auto mt-10">
        <div className="h-fit w-full border-b-5 border-dashed border-highland-300" />
        <div className="absolute -top-10 grid w-full grid-cols-3 items-center justify-between">
          {howItWorks.map(step => (
            <CardWorks
              key={step.id}
              steps={step.steps}
              title={step.title}
              desc={step.desc}
              imageUrl={step.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
