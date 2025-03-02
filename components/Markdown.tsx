import { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import YouTubeEmbed from './YouTubeEmbed';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const MDViewer = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => (
  <div data-color-mode="light">
    <MDEditor {...rest} />
  </div>
);

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => {
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to create clean IDs from heading text
  const createHeadingId = (text: string) => {
    return String(text)
      .toLowerCase()
      .replace(/'/g, '')
      .replace(/[^a-z0-9]+/g, '-') // Replace all non-alphanumeric chars (including spaces, dots, commas) with hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .trim(); // Remove any remaining whitespace
  };

  return (
    <div data-color-mode="light">
      <MDViewer
        {...rest}
        components={{
          ...rest.components,
          h1: ({ children, ...props }) => (
            <h1 id={createHeadingId(children as string)} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 id={createHeadingId(children as string)} {...props}>
              {children}
            </h2>
          ),
          a: ({ href, children }) => {
            const videoId = href && getYouTubeId(href);
            if (videoId) {
              return <YouTubeEmbed videoId={videoId} />;
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                {children}
              </a>
            );
          },
        }}
      />
    </div>
  );
};
