import { Link } from "react-router-dom";

const Header = () => {
    return (
       
            <div className='-translate-y-44 absolute'>
                <p className='md:text-6xl  text-4xl font-bold text-center relative  text-cyan-400 pt-10'>
                    Expense <Link to='/'>GQL</Link>
                </p>
                <div className='relative mb-10 w-1/2 mx-auto hidden md:block'>
                    {/* Gradients */}
                    <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
                    <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
                    <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
                    <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
                </div>
            </div>
      


    );
};
export default Header;