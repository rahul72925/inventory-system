"use client";

import { changeRole } from "@/lib/slice/role";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const handleToggle = (e) => {
    dispatch(changeRole(e.target.checked ? "USER" : "ADMIN"));
  };

  return (
    <header className="flex justify-end item-center h-16 px-4 border-b-2 border-slate-700">
      <label className="inline-flex items-center cursor-pointer">
        <span className="ms-3 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          admin
        </span>
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          user
        </span>
      </label>
    </header>
  );
};
