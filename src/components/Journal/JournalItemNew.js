import React from "react";
import { mapProps } from "recompose";
import TopicPicker from "../TopicPicker/TopicPicker";

export const JournalItemNew = () => (
    <li key="new-entry-item" className="journal__item">
        <div className="journal__item__topic">
            <TopicPicker 
                key="new-entry-topic-picker"
               currentTopic="dGVybTo4" />
        </div>
        <div className="journal__item__entry">
            <input id="item-title-new-entry" type="text" defaultValue="" autoComplete="off" data-lpignore="true" placeholder="Enter title" />
            <input id="item-id-new-entry" type="hidden" value="" />
        </div>
    </li>
);