import { MarkdownEditor } from '@/components/Markdown';
import ReactSelect from 'react-select';

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col px-4 pt-4">
      <form>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <ReactSelect options={[]} placeholder="카테고리" isMulti={false} />
          <ReactSelect options={[]} placeholder="태그" isMulti />
          <MarkdownEditor height={500} />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
        >
          작성하기
        </button>
      </form>
    </main>
  );
}
