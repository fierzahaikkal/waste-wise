import Navbar from "@/components/navbar";
import SectionContainer from "@/components/section-container";
import Image from "next/image";
import React from "react";
import { Earth, Recycle } from "lucide-react";
import Article from "./_components/article";

const Post = ({ params }: { params: { post: string } }) => {
  return (
    <div>
      <Navbar />
      <SectionContainer>
        <div className="flex items-center justify-between gap-x-10 pt-[80px]">
          <Image
            src={
              "https://images.unsplash.com/photo-1648590987381-21373e08d32c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={800}
            height={800}
            alt=""
            className="rounded-xl"
          />
          <div className="grid h-full grid-cols-1 items-center">
            <h2 className="text-2xl font-bold md:text-5xl">On Progress Page {params.post}</h2>
            <div className="grid grid-cols-1 justify-between gap-y-4">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reiciendis
                repudiandae omnis voluptas modi porro quos quisquam harum deleniti illo sit dicta
                veniam eum nobis ea mollitia, earum voluptatum aperiam.
              </p>
              <div className="mt-auto flex flex-wrap gap-4">
                <span className="flex w-fit items-center rounded-full bg-blue-200 px-4 py-2 text-base text-blue-600">
                  <Earth className="h-5 w-5" />
                  <p>Earth</p>
                </span>
                <span className="flex w-fit items-center rounded-full bg-highland-200 px-4 py-2 text-base text-highland-600">
                  <Recycle className="h-5 w-5" />
                  <p>Recycle</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Article />
      </SectionContainer>
    </div>
  );
};

export default Post;
