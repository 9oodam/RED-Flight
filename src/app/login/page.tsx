"use client";

import { ConnectEmbed } from "thirdweb/react";

import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/server/auth/auth";
import chainList from "@/utils/chain";

const ThirdwebConnectButton: React.FC = () => {
  const appMetadata = {
    name: "RED Flight",
    url: "https://www.redflight.io",
    description: "AI Jailbreaking NFT Game",
    logoUrl: "/logo1.png",
  };

  return (
    <ConnectEmbed
      client={client}
      appMetadata={appMetadata}
      chains={chainList}
      auth={{
        isLoggedIn: async address => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async params => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};

export default ThirdwebConnectButton;
