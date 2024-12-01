import React from "react";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Hook to get the current path

  return (
    <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#F4F4F4] p-2 z-10">
      <ul>
        {/* Home */}
        <li>
          <div
            className={`flex items-center justify-between ${
              location.pathname === "/" ? "bg-[#F4EDAF]" : ""
            } hover:bg-[#F4EDAF] w-full mt-6 rounded-lg`}
          >
            <Link
              to="/"
              className="block flex items-center gap-4 py-2 px-4 w-full"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/572b/d84a/693d97155dcaaf3c78d15fac981c7b80?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WmoB~tCWC6e5naufhXmFSSPvM~YhAcBHzHe5j7~qT6OI1rceLuxEddpf05LE8cAibJkXcr91VC5ggZByn2~2DAdGJBxCs2nQPRxXbSnxOYfuu7k1cJ7Q2RpUw10f2ke5jviKDGkte94~YL7ajYULtsMRyD7rVaj7STNZA~LxIhdWTzPJ-RITkC1craDRR7BCrqCjvpbkztVfQPqeWB8x9RZDSMr8TbLxYVQt94KsIo5tfVpogHAWDZl6o4edKtO4lK5AdYXZgHYm7KsDv8R~Ythn7hP13TUk-hnHWTZW5523pXgfQ-0I16g68uf1cj7qr4LcIgVHSIimqBtXrq8w7Q__"
                alt="Home Icon"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">Home</span>
            </Link>
            <ChevronRight className="mr-4" />
          </div>
        </li>

        {/* Roles */}
        <li>
          <div
            className={`flex items-center justify-between ${
              location.pathname === "/roles" ? "bg-[#F4EDAF]" : ""
            } hover:bg-[#F4EDAF] w-full mt-6 rounded-lg`}
          >
            <Link
              to="/roles"
              className="block flex items-center gap-4 py-2 px-4 w-full"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/2588/b462/bf3f810f9d10a4876639928b0c9f536e?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8gtJ2p0uqU3IqNe7FYNYz-gxcXZTm45nXSek~5DSnsSd9TVSpZItGt9dkFwGr9g2qch4H~udWYarwcvNQ99~-9BbVBlV8Yoxiy8q7XM3VRs5ayLnrOKMPN5U8xjrcueNbCCNordPMU9HRTUMeU0QnhjEf6DC7ptmp-95En0IvRCbItxRsuKMwNr11-WJX~X1w-oXmJDYnVXC6D8Eoi-~pdyHBYAE4JlB6r8FBwVPPiv~j99EBPYii~yRCZe-izEQsvNpxtbplArhqtZArx0ovlWN37LQrIbOCZVH9q-EuRgUCn0p4EEeuPpUt7IdYL~4vGTZ-MwvbLDGMEPyBv0dg__"
                alt="Roles Icon"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">Roles</span>
            </Link>
            <ChevronRight className="mr-4" />
          </div>
        </li>

        <li>
          <div
            className={`flex items-center justify-between ${
              location.pathname === "/users" ? "bg-[#F4EDAF]" : ""
            } hover:bg-[#F4EDAF] w-full mt-6 rounded-lg`}
          >
            <Link
              to="/users"
              className="block flex items-center gap-4 py-2 px-4 w-full"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/57f4/07a5/b8185a6caa0131c6e7a9f7e943b1fb16?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VlbItAiAJ6jDOpdMMgq0zzZziRvoIKn2dV4O6IF5QIMNN~ezwAEg~JE5W1uu6fw0xNm9NcWe2UaFzGKuKlPD1A7E84Km-APo~PWK7AC0HHIooJdL8RJRKrth47liZpyIXQfImyHgSSGu83KNxb0I2Q4t2pSOKmCF0IjLTRfxADjnfXn0yOkXHtP3gE7m2Gi15mut9YGmJb2s0qJyzHS0ekGRh~tZu4W7-yPBZiOv3QwxZvaEIf8S2xrKcLKGSvL09NvYFijwXwL8AgeKOo95706-~1CZqSaOhhWxdVEexfc2nTtlFmLO300-7iCMgA7AcCmOefgLzte9Z-EmXgg6ig__"
                alt="Users Icon"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">Users</span>
            </Link>
            <ChevronRight className="mr-4" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
