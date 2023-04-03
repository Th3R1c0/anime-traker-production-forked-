"use client";
import "../../styles/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  return (
    <div className="w-screen  h-max p-8 bg-[#222831] text-[#EEEEEE]">
      {" "}
      anime tracker webiste{" "}
    </div>
  );
};

const NavBar = () => {
  const links = ["home", "search", "MyList", "settings", "log out"];
  const pathname = usePathname();
  return (
    <div className="w-max h-full flex flex-col p-24 space-y-8 bg-[#393E46] text-[#EEEEEE]">
      {links.map((link, index) => {
        return (
          <div
            key={index}
            className={
              pathname === `/${link}` || pathname === `/home/${link}`
                ? "text-[#00ADB5]"
                : ""
            }
          >
            <Link href={link === "home" ? `/home` : `/home/${link}`}>
              {link}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default function Homelayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-screen h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Header />
      <div className="flex w-screen h-full bg-[#222831] text-[#EEEEEE]">
        <NavBar />
        {children}
      </div>
    </main>
  );
}
