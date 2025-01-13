import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Search() {


  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className='my-10'>
        <div>건축 중...</div>
      </div>
    </main>
  );
}
