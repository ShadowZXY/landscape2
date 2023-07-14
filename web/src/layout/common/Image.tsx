import { useState } from 'react';

interface Props {
  name: string;
  logo: string;
  className?: string;
}

const Image = (props: Props) => {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <svg
          className={props.className}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M21.9 21.9l-6.1-6.1-2.69-2.69L5 5 3.59 3.59 2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 19V7.83l6.84 6.84-.84 1.05L9 13l-3 4h8.17l2 2H5zM7.83 5l-2-2H19c1.1 0 2 .9 2 2v13.17l-2-2V5H7.83z"></path>
        </svg>
      ) : (
        <img
          alt={`${props.name} logo`}
          className={props.className}
          src={import.meta.env.MODE === 'development' ? `../../static/${props.logo}` : `${props.logo}`}
          onError={() => setError(true)}
        />
      )}
    </>
  );
};

export default Image;