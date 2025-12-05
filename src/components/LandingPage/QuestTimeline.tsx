import React from 'react';
import { Quest } from '../types';
import QuestCard from './QuestCard';

interface QuestTimelineProps {
  quests: Quest[];
  startIndex?: number;
}

const QuestTimeline: React.FC<QuestTimelineProps> = ({ quests }) => {
  return (
    <div className="relative container mx-auto px-4 max-w-7xl">
      {/* Vertical Line - centered at 1/3 of container width on md+ screens */}
      <div
        className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[2px] bg-white/20"
        aria-hidden="true"
        role="presentation"
      ></div>

      <div className="flex flex-col">
        {quests.map((quest, index) => (
          <React.Fragment key={quest.id}>
            <QuestCard quest={quest} />
            {/* Horizontal divider between cards */}
            {index < quests.length - 1 && (
              <div
                className="border-t border-white/10 mx-auto w-full max-w-5xl"
                aria-hidden="true"
                role="presentation"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default QuestTimeline;
