import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="flex justify-between px-10 py-4 border-b">
      
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>

      <div className="flex items-center">
        <Link to={'/publish'}>
          <button
            type="button"
            className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>

        {/* My Blogs Button */}
        <Link to={'/my-blogs'}>
          <button
            type="button"
            className="mr-4 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
          >
            My Blogs
          </button>
        </Link>

        <Avatar name="Rishav" size="big" /> {/* user name from recoil */}
      </div>
    </div>
  );
};
