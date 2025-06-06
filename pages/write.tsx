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

export default function Write() {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

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
  const categoryOptions = categoryList.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!title || !content || !thumbnail) {
      alert('Title, Thumbnail, Content is required');
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (selectedCategory == null) {
      alert('select Category');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Selected Category ID:', selectedCategory); // Debug log

      const { data: categoryExists, error: categoryError } = await supabase
        .from('Category')
        .select('id')
        .eq('id', selectedCategory)
        .single();

      console.log('Category Check Result:', { categoryExists, categoryError }); // Debug log

      if (!categoryExists) {
        alert('No Category exists');
        setIsSubmitting(false);
        return;
      }

      // 1. Insert post first to get the post_id
      const postData = {
        title,
        preview_image_url: thumbnail,
        content,
        category_id: selectedCategory,
      };

      const { data: insertedPost, error: postError } = await supabase
        .from('Post')
        .insert([postData])
        .select();

      if (postError) throw postError;

      const postId = insertedPost[0].id;

      // 2. Process each tag
      for (const tagName of tagList) {
        // Check if tag exists
        let { data: existingTag } = await supabase
          .from('Tag')
          .select('id')
          .eq('name', tagName)
          .single();

        let tagId;

        if (!existingTag) {
          // Insert new tag if it doesn't exist
          const { data: newTag, error: tagError } = await supabase
            .from('Tag')
            .insert([{ name: tagName }])
            .select()
            .single();

          if (tagError) throw tagError;
          tagId = newTag.id;
        } else {
          tagId = existingTag.id;
        }

        // Insert PostTag relation
        const { error: postTagError } = await supabase
          .from('PostTag')
          .insert([{ post_id: postId, tag_id: tagId }]);

        if (postTagError) throw postTagError;
      }

      // Reset form after successful submission
      setTitle('');
      setContent('');
      setThumbnail('');
      setSelectedCategory(null);
      setTagList([]);
      alert('success');
    } catch (error) {
      console.error('Error inserting post:', error);
      alert('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const tags = inputValue
      .split('#')
      .filter((tag) => tag.trim() !== '')
      .map((tag) => tag.trim())
      .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
    setTagList(tags);
  };

  return (
    <main className="container mx-auto flex flex-col px-4 pt-4 lg:ml-60 lg:max-w-[calc(100%-240px)]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
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
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(value) => setContent(value || '')}
          />
          <ReactSelect
            options={categoryOptions}
            placeholder="카테고리"
            isMulti={false}
            onChange={(option) => setSelectedCategory(option?.value || null)}
          />
          <input
            type="text"
            placeholder="태그"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            onChange={handleTagChange}
          />
          <div className="flex gap-2">
            {tagList.map((tag, index) => (
              <div
                key={index}
                className="rounded-lg bg-orange-200 px-2 py-1 text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? '작성 중...' : '작성하기'}
        </button>
      </form>
      <div className="my-10"></div>
    </main>
  );
}
