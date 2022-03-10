import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Component = ({ theme, setTheme }) => {
  return <>
    <div className="sticky top-0 flex bg-white shadow-md dark:bg-slate-800">
      <div className="text-gray-900 text-lg font-bold p-2 px-6 dark:text-gray-200">
        ABCD Checker
      </div>
      <div className="grow flex flex-row-reverse p-2 px-6 dark:text-gray-200">
        <MdOutlineDarkMode className={theme === "dark" ? "hidden":"text-2xl"} onClick={() => setTheme('dark')}/>
        <MdOutlineLightMode className={theme === "light" ? "hidden":"text-2xl"} onClick={() => setTheme('light')}/>
      </div>
    </div>
  </>
};

export default Component;