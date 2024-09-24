import SectionContainer from "@/components/section-container";

const wasteTypes = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1601507793214-77d2a926582a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBsYXN0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "Plastic type",
    title: "Plastic Type",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1516554724781-97f823109417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fGdsYXNzfGVufDB8fDB8fHww",
    alt: "glass waste",
    title: "Glass Type",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1533478583204-680d4ff74891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG9yZ2FuaWN8ZW58MHx8MHx8fDA%3D",
    alt: "organic waste",
    title: "Organic Type",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1717667745934-53091623e8ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "e-waste",
    title: "E-Waste Type",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
];

const WasteTypes = () => {
  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold" id="waste-types">
        There are many waste types
      </h2>
      <p className="mb-[80px] text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum
        alias magni quaerat doloribus quidem atque inventore?
      </p>
      {wasteTypes.map(type => (
        <div key={type.id} className="mb-[80px]">
          {type.id % 2 === 0 ? (
            <div className="flex flex-col overflow-hidden rounded-lg bg-highland-100 shadow-md lg:flex-row">
              <img src={type.src} alt={type.alt} className="aspect-video h-80 object-cover" />
              <div className="flex flex-1 flex-col justify-center p-6">
                <span className="text-xs uppercase">Types</span>
                <h3 className="text-xl font-bold md:text-2xl">{type.title}</h3>
                <p className="my-6">{type.desc}.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden rounded-lg bg-highland-100 shadow-md lg:flex-row-reverse">
              <img
                src={type.src}
                alt={type.alt}
                className="aspect-video h-80 object-cover dark:bg-gray-500"
              />
              <div className="flex flex-1 flex-col justify-center p-6 dark:bg-gray-50">
                <span className="text-xs uppercase">Types</span>
                <h3 className="text-xl font-bold md:text-2xl">{type.title}</h3>
                <p className="my-6">{type.desc}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </SectionContainer>
  );
};

export default WasteTypes;
