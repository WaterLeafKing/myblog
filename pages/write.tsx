import { MarkdownEditor } from '@/components/Markdown';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

interface Category {
  id: number;
  title: string;
  icon: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [CategoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategoryList = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('id, title, icon');

    if (error) {
      console.error('Supabase error:', error);
    } else {
      if (!data || data.length === 0) {
        console.log('No categories found in the database');
      }
      setCategoryList(data || []);
    }
  };

  // Add useEffect to fetch categories when component mounts
  useEffect(() => {
    fetchCategoryList();
  }, []);

  // Transform CategoryList into ReactSelect options format
  const categoryOptions = CategoryList.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!title || !content || !thumbnail) {
      alert('제목과 썸네일, 내용을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const postData = {
        title,
        preview_image_url:thumbnail,
        content,
        ...(selectedCategory && { categoryId: selectedCategory }), // Only include categoryId if selected
      };

      const { data, error } = await supabase
        .from('Post')
        .insert([postData])
        .select();

      console.log(error);

      if (error) throw error;

      // Reset form after successful submission
      setTitle('');
      setContent('');
      setSelectedCategory(null);
      alert('게시글이 성공적으로 작성되었습니다.');
    } catch (error) {
      console.error('Error inserting post:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex flex-col px-4 pt-12">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            onChange={(e) => setTitle(e.target.value || '')}
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            onChange={(e) => setThumbnail(e.target.value || '')}
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <ReactSelect
            options={categoryOptions}
            placeholder="카테고리"
            isMulti={false}
            onChange={(option) => setSelectedCategory(option?.value || null)}
          />
          <ReactSelect options={[]} placeholder="태그" isMulti />
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(value) => setContent(value || '')}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? '작성 중...' : '작성하기'}
        </button>
      </form>
      <div className='my-10'></div>
    </main>
  );
}
