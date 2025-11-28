import { LoginForm } from "@/components/Login/login-form";

import Content from "@/components/Login/Content";
import { Background } from "@/components/Login/backgrounds/Background";
export default function LoginPage() {
  return (
    <div className="grid bg-[#010206] py-4 px-4  min-h-svh lg:grid-cols-2">
      <div className=" bg-[black] rounded-[100px]  text-white flex-col relative hidden lg:block">
        <Background />
        <Content />
      </div>
      <div className="flex bg-[white] rounded-r-[50px]  flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
