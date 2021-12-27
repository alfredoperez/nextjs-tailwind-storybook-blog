import { useEffect } from 'react';
import { useState } from 'react';
export interface TopicButtonProps {
    name: string;
    onClick?: (topicName: string) => void;
}

export function TopicButton({name, onClick}: TopicButtonProps) {
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const cleanedSvgName = name
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLocaleLowerCase();
            const topicSvgIcon = await import(`./${cleanedSvgName}.svg`);
            setIcon(topicSvgIcon.default);
        };
        fetchData();
    }, [name]);

    const onClickHandler = () => {
        if (onClick) {
            onClick(name);
        } else {
            console.warn(
                `no click handler defined on topic button with topic ${name}`
            );
        }
    };

    return (
        <div
            className="bg-white pl-4 rounded-lg shadow flex max-w-md min-w-max hover:shadow-md transition-shadow"
            onClick={onClickHandler}
        >
            <img src={icon} alt="" className="w-12" />
            <div className="p-5">
                <h2 className="font-bold text-4xl">{name}</h2>
            </div>
        </div>
    );
}

export default TopicButton;
