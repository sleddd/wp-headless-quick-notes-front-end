import React from "react";
import TopicPicker from "../TopicPicker/TopicPicker";
import useAuth from "../../hooks/use-auth";
import TextareaAutosize from 'react-textarea-autosize';

export const JournalItem = ({
    id,
    journalId,
    topicId,
    title,
    deleteItemHandler,
    onEnterHandler
}) => {
    const { user, loggedIn } = useAuth();
    return (
        <>
        { ( loggedIn && user && user.capabilities.indexOf('edit_posts') != -1 ) && 
        <li className="journal__item">
            <div className="journal__item__topic">
                <TopicPicker
                    pickerKey={`item-${journalId}-${topicId}`}
                    key={`item-${journalId}-${topicId}`}
                    currentTopic={topicId} />
            </div>
            <div className="journal__item__entry">
                <TextareaAutosize 
                    id={`item-title-${journalId}`} 
                    className="grow-wrap"
                    rows="1" 
                    defaultValue={title}
                    onKeyUp={onEnterHandler}
                />
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
