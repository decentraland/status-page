import React, { FC } from 'react';

interface SubtitleProps {
  subtitle: string;
  paragraph?: string
}

const Subtitle: FC<SubtitleProps> = ({ subtitle, paragraph }) => {
  return (
    <div className="subtitle">
      <h2>{subtitle}</h2>
      {paragraph ? <p>{paragraph}</p> : <></>}
    </div>
  );
};

export default Subtitle;