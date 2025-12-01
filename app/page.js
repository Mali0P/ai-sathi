import { redirect } from "next/navigation";

const Page = () => {
  return <div>
    {/* {redirect('/login')} */}
    {redirect('/login')}
  </div>;
};

export default Page;
