import { FC } from 'react';

const AboutMe: FC = () => {
  return (
    <div className="mb-20 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-4">
          <hr className="w-[60px] border-slate-300" />
          <a
            className="font-ight italic text-slate-600 hover:text-orange-400"
            href=""
          >
            W h o &apos; s &nbsp;&nbsp;&nbsp; N e r d ?
          </a>
          <hr className="w-[60px] border-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
