import { useRouter } from 'next/router';
import { GrLinkNext } from 'react-icons/gr';

export default function Friends() {
  const router = useRouter();

  return (
    <main className="container mx-auto flex flex-col px-4 lg:ml-60 lg:max-w-[calc(100%-240px)]">
      <div className="mt-4 w-full text-sm">
        <div className="grid gap-2">
          <div className="grid grid-cols-6">
            <div className="py-2 text-center">Paka</div>
            <div className="col-span-4 py-2 text-slate-600">
              크로아티아인의 한국 주부생활
            </div>
            <a
              className="mx-auto flex w-16 justify-center rounded-md border border-slate-400 bg-white py-2 text-center text-slate-600  hover:border-orange-400 hover:bg-orange-400 hover:text-white"
              href="https://m.blog.naver.com/micamaca?tab=1"
              target="_blank"
            >
              <GrLinkNext />
            </a>
          </div>
          <div className="grid grid-cols-6">
            <div className="py-2 text-center">헤요미</div>
            <div className="col-span-4 py-2 text-slate-600">당신의 헤요미</div>
            <a
              className="mx-auto flex w-16 justify-center rounded-md border border-slate-400 bg-white py-2 text-center text-slate-600  hover:border-orange-400 hover:bg-orange-400 hover:text-white"
              href="https://blog.naver.com/khy2106"
              target="_blank"
            >
              <GrLinkNext />
            </a>
          </div>
        </div>
        {/* <div className="grid grid-cols-4 gap-2">
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div>b</div>
          <div>d</div>
          <div>c</div>
          <div>j</div>
        </div> */}
      </div>
    </main>
  );
}
