import React from "react";
import TopicPicker from "../TopicPicker/TopicPicker";
import useAuth from "../../hooks/use-auth";

export const JournalItem = ({
    id,
    journalId,
    topicId,
    title,
    deleteItemHandler
}) => {
    const { user, loggedIn } = useAuth();
    return (
        <>
        { ( loggedIn && user && user.capabilities.indexOf('edit_posts') != -1 ) && 
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
        </li>}
        </>
    )
};
