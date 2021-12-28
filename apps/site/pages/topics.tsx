import './topics.module.css';
import {TopicButton} from "@apdev/shared/ui";

/* eslint-disable-next-line */
export interface TopicsProps {}

export function Topics(props: TopicsProps) {
  return (
    <div>
        <h1>Welcome to Topics!</h1>
        <TopicButton name="Next.js"/>
    </div>
  );
}

export default Topics;
