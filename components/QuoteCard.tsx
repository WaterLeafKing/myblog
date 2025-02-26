import { FC } from 'react';

type QuoteCardProps = {
  quote: string;
  speaker: string;
};

const QuoteCard: FC<QuoteCardProps> = ({ quote, speaker }) => {
  console.log(quote);
  return (
    <div className="mx-auto flex w-4/5 flex-col items-center justify-center break-keep text-center font-extralight text-slate-800">
      &ldquo;{quote}&rdquo;
      <div className="mt-2 text-center font-extralight text-slate-500">
        - {speaker} -
      </div>
    </div>
  );
};

export default QuoteCard;
