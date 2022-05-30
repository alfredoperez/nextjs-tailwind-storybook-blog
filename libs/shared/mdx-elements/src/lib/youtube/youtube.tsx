// import './youtube.module.css';

/* eslint-disable-next-line */
export interface YoutubeProps {
    title:string;
    uid:string;
}

export function Youtube({uid,title}: YoutubeProps) {
  return (
    <div>
        <iframe src={`https://www.youtube.com/embed/${uid}`}
               width="100%"
                height="500px"
                title={title}>

        </iframe>
    </div>
  );
}

export default Youtube;
