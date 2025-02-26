import { useRouter } from 'next/router';

export default function Friends() {
  const router = useRouter();

  return (
    <main className="container mx-auto flex flex-col px-4 sm:px-6 md:px-7 lg:px-8">
      <div className="mt-4 w-full">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div className="bg-orange-200">a</div>
          <div>b</div>
          <div>d</div>
          <div>c</div>
          <div>j</div>
        </div>
      </div>
    </main>
  );
}
