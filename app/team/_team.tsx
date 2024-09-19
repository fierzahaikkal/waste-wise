import { Instagram, LinkedinIcon } from "lucide-react";
import Image from "next/image";

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
    <section className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 sm:text-center lg:max-w-xl">
        <p className="mb-4 inline-block rounded-full bg-highland-400 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white">
          Know Our Team
        </p>
        <p className="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </p>
      </div>
      <div className="mx-auto grid gap-10 lg:max-w-screen-lg lg:grid-cols-2">
        {teamMembers.map(member => (
          <div className="grid sm:grid-cols-3">
            <div className="relative h-48 max-h-full w-full rounded shadow sm:h-auto">
              <Image
                className="absolute h-full w-full rounded object-cover"
                src={member.image}
                alt="Person"
                width={500}
                height={500}
              />
            </div>
            <div className="mt-5 flex flex-col justify-center sm:col-span-2 sm:mt-0 sm:p-5">
              <p className="text-lg font-bold">{member.name}</p>
              <p className="mb-4 text-xs text-gray-800">{member.role}</p>
              <p className="mb-4 text-sm tracking-wide text-gray-800">
                Vincent Van Gogh’s most popular painting, The Starry Night.
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href={member.instagram}
                  className="hover:text-deep-purple-accent-400 text-gray-600 transition-colors duration-300"
                >
                  <Instagram />
                </a>
                <a
                  href={member.linkedin}
                  className="hover:text-deep-purple-accent-400 text-gray-600 transition-colors duration-300"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
