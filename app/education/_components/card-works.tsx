import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

type CardProps = {
  steps: string;
  title: string;
  desc: string;
  imageUrl: string;
};

const CardWorks = (props: CardProps) => {
  const { steps, title, desc, imageUrl } = props;
  return (
    <div className="mx-auto flex flex-col items-center gap-y-4">
      <h3 className="h-fit w-fit rounded-full bg-yellow-100 p-7 text-center text-2xl font-bold leading-none text-highland-800">
        {steps}
      </h3>
      <Card className="min-h-[400px] max-w-[450px] py-4">
        <CardHeader className="flex flex-col items-center px-4 pb-0 pt-2">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="mb-4 rounded-xl object-cover"
              src={imageUrl}
              width={370}
              height={370}
            />
          </CardBody>
          <h4 className="mb-2 rounded-lg bg-highland-300 p-2 text-xl">{title}</h4>
          <p className="text-center text-lg">{desc}</p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CardWorks;
