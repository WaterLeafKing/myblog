import { FC } from 'react';

type QuoteCardProps = {
  quote: string;
  speaker: string;
};

const QuoteCard: FC<QuoteCardProps> = ({ quote, speaker }) => {
  console.log(quote);
  return (
    <div className="text-center break-keep">
      &ldquo;{quote}&rdquo;
      <div className="">- {speaker} -</div>
    </div>
  );
};

export default QuoteCard;
