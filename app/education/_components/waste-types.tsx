import WasteTypeCard from "./card";

const wasteTypes = [
  {
    src: "/plastic.png",
    alt: "Plastic type",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    src: "/glass.png",
    alt: "glass waste",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    src: "/organic.png",
    alt: "organic waste",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
  {
    src: "/e-waste.png",
    alt: "e-waste",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis nobis fuga nostrum alias magni quaerat doloribus quidem atque inventore?",
  },
];

const WasteTypes = () => {
  return (
    <section className="container my-20 rounded-xl px-8 pb-8 pt-2 outline-dashed outline-highland-400">
      <div className="mb-6 mt-4">
        <h2 className="text-3xl font-bold">Waste Types</h2>
        <h2 className="font-regular text-2xl">Did you know every waste have their types?</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {wasteTypes.map((type, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <WasteTypeCard key={index} src={type.src} alt={type.alt} desc={type.desc} />
        ))}
      </div>
    </section>
  );
};

export default WasteTypes;
