import React from "react";
import TopicPicker from "../TopicPicker/TopicPicker";
import TextareaAutosize from 'react-textarea-autosize';

export const JournalItemNew = (props) => (
    <li key="new-entry-item" className="journal__item">
        <div className="journal__item__topic">
            <TopicPicker 
                key="new-entry-topic-picker"
               currentTopic="dGVybTo4" 
            />
        </div>
        <div className="journal__item__entry">
            <TextareaAutosize
                id="item-title-new-entry"
                rows="1"
                defaultValue=""
                placeholder="Enter title"
                onKeyUp={props.onEnterHandler}
            />
            <input id="item-id-new-entry" type="hidden" value="" />
        </div>
    </li>
);