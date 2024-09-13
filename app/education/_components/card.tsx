type Props = {
  src: string;
  alt: string;
  desc: string;
};

export default function WasteTypeCard(props: Props) {
  const { src, alt, desc } = props;
  return (
    <section className="relative">
      <div className="flex items-center justify-between rounded-xl border-l-2 border-t-2 border-b-[#749567] bg-white px-12 py-5 shadow-[5px_5px_0_#749567]">
        <section>
          <img src={src} alt={alt} />
        </section>
        <section className="space-y-4 sm:w-3/4">
          <h3 className="text-3xl capitalize"># {alt}</h3>
          <p className="max-w-[40ch]">{desc}</p>
        </section>
      </div>
    </section>
  );
}
