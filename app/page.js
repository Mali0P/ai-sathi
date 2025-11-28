import { redirect } from "next/navigation";

const Page = () => {
  return <div>
    {/* {redirect('/login')} */}
    {redirect('/home')}
  </div>;
};

export default Page;
