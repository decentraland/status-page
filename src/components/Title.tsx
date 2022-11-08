import { FC } from 'react';

interface TitleProps {
  title: string;
  paragraph?: string
}

const Title: FC<TitleProps> = ({ title, paragraph }) => {
  return (
    <div className="title">
      <h1>{title}</h1>
      {paragraph ? <p>{paragraph}</p> : <></>}
    </div>
  );
};

export default Title;