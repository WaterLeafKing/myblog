import { FC } from 'react';

type QuoteCardProps = {
  quote: string;
  speaker: string;
};

const QuoteCard: FC<QuoteCardProps> = ({ quote, speaker }) => {
  console.log(quote);
  return (
    <div className="break-keep text-center font-semibold text-slate-500">
      &ldquo;{quote}&rdquo;
      <div className="text-center font-light text-slate-800">- {speaker} -</div>
    </div>
  );
};

export default QuoteCard;
