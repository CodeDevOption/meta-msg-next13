"use client";

import React from "react";
import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignInComponent = ({ providers }: Props) => {
  return (
    <div>
      {Object.values(providers!)?.map((provider) => (
        <div className="flex justify-center" key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${
                  process.env.VERCEL_URL || "http://localhost:3000/"
                }`,
              })
            }
          >
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInComponent;
