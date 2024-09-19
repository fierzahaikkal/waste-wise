import { InstagramIcon, LinkedinIcon } from "lucide-react";

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

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  instagram: string;
};

function TeamMember(props: TeamMemberProps) {
  const { name, role, image, linkedin, instagram } = props;
  return (
    <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-3/12 lg:px-4">
      <div className="flex flex-col">
        {/* Avatar */}
        <a href="/" className="mx-auto">
          <img
            alt="d"
            className="rounded-2xl drop-shadow-md transition-all delay-100 duration-200 hover:drop-shadow-xl"
            src={image}
          />
        </a>
        {/* Details */}
        <div className="mt-6 text-center">
          {/* Name */}
          <h1 className="mb-1 text-xl font-bold text-gray-900">{name}</h1>
          {/* Title */}
          <div className="mb-2 font-light text-gray-700">{role}</div>
          {/* Social Icons */}
          <div className="flex items-center justify-center opacity-50 transition-opacity duration-300 hover:opacity-100">
            {/* Linkedin */}
            <a href={linkedin} className="flex h-10 w-10 rounded-full hover:bg-indigo-50">
              <LinkedinIcon className="mdi mdi-linkedin mx-auto mt-2 text-indigo-700" />
            </a>
            {/* Instagram */}
            <a href={instagram} className="flex h-10 w-10 rounded-full hover:bg-orange-50">
              <InstagramIcon className="mx-auto mt-2 text-orange-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col">
        <div className="mt-8 flex flex-col">
          {/* Meet the Team */}
          <div className="container max-w-7xl px-4">
            {/* Section Header */}
            <div className="mb-24 flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                {/* Header */}
                <h1 className="mb-8 text-4xl font-bold text-gray-900">Meet the Team</h1>
                {/* Description */}
                <p className="text-lg font-light text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eum accusantium
                  illo aliquam nesciunt dicta doloremque!
                </p>
              </div>
            </div>
            {/* Team Members */}
            <div className="flex flex-wrap items-center justify-center gap-x-6">
              {teamMembers.map(member => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  linkedin={member.linkedin}
                  instagram={member.instagram}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
