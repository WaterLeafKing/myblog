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
  // Function to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div data-color-mode="light">
      <MDViewer
        {...rest}
        components={{
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
