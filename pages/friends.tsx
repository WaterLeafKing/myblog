import { useRouter } from 'next/router';

export default function Friends() {
  const router = useRouter();

  return (
    <main className="container mx-auto flex flex-col px-4 sm:px-6 md:px-7 lg:px-8">
      <div className="mt-4 w-full text-sm">
        <div className="grid gap-2">
          <div className="grid grid-cols-6">
            <div className="py-2 text-center">Paka</div>
            <div className="col-span-4 py-2 text-slate-600">
              크로아티아인의 한국 주부생활
            </div>
            <a
              className="rounded-md bg-green-400 py-2 text-center text-white hover:bg-orange-400"
              href="https://m.blog.naver.com/micamaca?tab=1"
              target="_blank"
            >
              Visit
            </a>
          </div>
          <div className="grid grid-cols-6">
            <div className="py-2 text-center">헤요미</div>
            <div className="col-span-4 py-2 text-slate-600">당신의 헤요미</div>
            <a
              className="rounded-md bg-green-400 py-2 text-center text-white hover:bg-orange-400"
              href="https://blog.naver.com/khy2106"
              target="_blank"
            >
              Visit
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
