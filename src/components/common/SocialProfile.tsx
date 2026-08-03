import Image from "next/image";
import Link from "next/link";

// Types
interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

// Reusable components
const SocialIcon = ({ link }: { link: SocialLink }) => (
  <Link
    aria-label={`Visit our ${link.label} page`}
    className="flex h-12 w-12 transform items-center justify-center text-grey-35 transition-transform hover:scale-110 hover:text-primary-75"
    href={link.href}
    key={link.label}
    rel="noopener noreferrer"
    target="_blank"
  >
    <span className="sr-only">{link.label}</span>
    <Image alt={link.label} height={40} src={link.icon} width={40} />
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
      href: "https://www.facebook.com/share/1GfVBLdak6/",
      icon: "/socials/facebook.svg",
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/eduwise_insta/",
      icon: "/socials/instagram.svg",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/eduwisesolutions/",
      icon: "/socials/linkedin.svg",
      label: "LinkedIn",
    },
  ];

  return (
    <div>
      <h2 className="mb-6 font-semibold font-vietnam text-grey-20 text-xl">
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
