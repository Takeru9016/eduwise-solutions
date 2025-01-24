import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1GfVBLdak6/",
    icon: "/socials/facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/eduwise_insta/",
    icon: "/socials/instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eduwisesolutions/",
    icon: "/socials/linkedin.svg",
  },
];

export default function SocialProfile() {
  return (
    <div>
      <h2 className="text-xl font-vietnam font-semibold text-grey-20 mb-6">
        Social Profiles
      </h2>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            className="w-12 h-12 flex items-center justify-center text-grey-35 hover:text-primary-75 transition-transform transform hover:scale-110"
          >
            <span className="sr-only">{social.label}</span>
            <Image
              src={social.icon}
              alt={social.label}
              width={40}
              height={40}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
