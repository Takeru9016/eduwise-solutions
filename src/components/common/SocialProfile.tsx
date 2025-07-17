import Image from "next/image";
import Link from "next/link";

// Types
interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// Reusable components
const SocialIcon = ({ link }: { link: SocialLink }) => (
  <Link
    key={link.label}
    href={link.href}
    className="w-12 h-12 flex items-center justify-center text-grey-35 hover:text-primary-75 transition-transform transform hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${link.label} page`}
  >
    <span className="sr-only">{link.label}</span>
    <Image src={link.icon} alt={link.label} width={40} height={40} />
  </Link>
);

export default function SocialProfile({
  title = "Social Profiles",
}: {
  title?: string;
}) {
  // Data
  const socialLinks: SocialLink[] = [
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

  return (
    <div>
      <h2 className="text-xl font-vietnam font-semibold text-grey-20 mb-6">
        {title}
      </h2>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <SocialIcon key={social.label} link={social} />
        ))}
      </div>
    </div>
  );
}
