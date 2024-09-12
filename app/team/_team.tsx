import { Instagram, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Mohammad Fierza Heikkal Firdaus",
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
    <section className="mt-16 py-12 md:h-[50rem]">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-4 h-48 w-48">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="items-cente flex justify-center gap-x-4 py-2">
                <Link href={member.instagram} target="_blank">
                  <Instagram />
                </Link>
                <Link href={member.linkedin} target="_blank">
                  <LinkedinIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
