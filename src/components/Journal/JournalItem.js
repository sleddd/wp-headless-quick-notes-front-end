import React from "react";
import TopicPicker from "../TopicPicker/TopicPicker";

export const JournalItem = ({
    id,
    journalId,
    topicId,
    title,
    deleteItemHandler
}) => {
    return (
        <li className="journal__item">
            <div className="journal__item__topic">
                <TopicPicker
                    key={`item-${journalId}-${topicId}`}
                    currentTopic={topicId} />
            </div>
            <div className="journal__item__entry">
                <input id={`item-title-${journalId}`} type="text" autoComplete="off" data-lpignore="true" defaultValue={title} />
                <input id={`item-id-${journalId}`} type="hidden" value={id} />
            </div>
            <input 
                className="journal__item__remove" 
                type="checkbox" 
                value={id}
                id={`item-remove-${journalId}`}
                onChange={deleteItemHandler} />
        </li>
    )
};
