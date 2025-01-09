import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Opinion() {


  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className="my-8 flex-col w-full gap-2">
      <div className="mx-auto flex text-lg items-center justify-center text-center">소중한 의견을 보내주세요</div>
      <form className="my-10">
        <div className="flex flex-col gap-3">
          <textarea placeholder='당신의 의견은 블로그 운영에 소중한 힘이 됩니다.' className="w-full h-40 text-sm border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none" />
        </div>
        
      </form>
      <div className='my-10'>
        <div>건축 중...</div>
      </div>
      </div>
    </main>
  );
}
