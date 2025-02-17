import { FC } from 'react';

type QuoteCardProps = {
  quote: string;
  speaker: string;
};

const QuoteCard: FC<QuoteCardProps> = ({ quote, speaker }) => {
  console.log(quote);
  return (
    <div className="break-keep text-center font-extralight text-slate-800">
      &ldquo;{quote}&rdquo;
      <div className="text-center font-extralight text-slate-500">
        - {speaker} -
      </div>
    </div>
  );
};

export default QuoteCard;
