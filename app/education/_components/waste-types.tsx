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
    <section className="container mx-auto my-20 rounded-xl bg-red-100 px-8 pb-8 pt-2 outline-dashed outline-highland-400">
      <h3>Waste Types</h3>
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
