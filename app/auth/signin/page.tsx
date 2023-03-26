import Image from "next/image";
import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

export const metadata = {
  title: "Sign In to Messenger",
};

const SignIn = async () => {
  const provider = await getProviders();
  return (
    <div className="grid justify-center">
      <div>
        <Image
          src="https://links.papareact.com/161"
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          alt="Messenger Logo"
        />
      </div>
      <SignInComponent providers={provider} />
    </div>
  );
};

export default SignIn;
