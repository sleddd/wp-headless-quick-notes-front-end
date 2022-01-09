import React from "react";
import TopicPicker from "../TopicPicker/TopicPicker";

export const JournalItemNew = () => (
    <li key="new-entry-item" className="journal__item">
        <div className="journal__item__topic">
            <TopicPicker key="new-entry-topic-picker" />
        </div>
        <div className="journal__item__entry">
            <input id="entry-title" type="text" defaultValue="" autocomplete="off" data-lpignore="true" placeholder="Enter title" />
        </div>
    </li>
);