import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "M. Fierza Heikkal Firdaus",
    role: "Software Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQHfALP8yqQtmA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697986658258?e=1731542400&v=beta&t=OVs3haT3Uys_O_L-7m6K8fDgfcWBIsgUX_NJN2N6zYY",
    instagram: "https://www.instagram.com/fierzahaikkal/",
    linkedin: "https://www.linkedin.com/in/fierzahaikkal/",
  },
  {
    name: "Sasya Rheina Dwinova",
    role: "Product Manager",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEggHgtGFXY4A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718704799335?e=1731542400&v=beta&t=oBxL61QKC-CPO3tZgvGpkRvspjdoz_v13Zhd61wGufU",
    instagram: "https://www.instagram.com/sasyaarrdn/",
    linkedin: "https://www.linkedin.com/in/sasyaarrdn/",
  },
  {
    name: "Rafli Satya Dewanto",
    role: "Software Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEljt1TTN_XTA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1698132288654?e=1731542400&v=beta&t=6KdmLFFEM8ZZDHjQM2rZLP_8KCOktvUjHL31Q25lTQg",
    instagram: "https://www.instagram.com/rafli.dewanto/",
    linkedin: "https://www.linkedin.com/in/rd09/",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">
          <span className="font-light text-zinc-900">Our Team</span>
        </h2>
        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map(member => (
            <div
              key={member.linkedin}
              className="group/container relative w-[300px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
            >
              <div className="relative h-[300px] w-[300px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="absolute h-full w-full object-cover transition-all duration-300 ease-in-out group-hover/container:scale-110 group-hover/container:opacity-95"
                />
              </div>
              <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/90 via-black/75 to-transparent p-6 transition-all duration-300 ease-in-out group-hover/container:translate-y-0">
                <h3 className="mb-1 text-xl font-semibold text-white">{member.name}</h3>
                <p className="mb-4 text-gray-300">{member.role}</p>
                <div className="flex space-x-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover/container:opacity-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      <Linkedin size={20} aria-hidden="true" />
                      <span className="sr-only">LinkedIn profile of {member.name}</span>
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      <Instagram size={20} aria-hidden="true" />
                      <span className="sr-only">Instagram of {member.name}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
