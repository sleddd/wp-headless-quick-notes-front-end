/*
* External Dependencies
*/
import React from "react";

/*
* Internal Dependencies
*/
import { JournalItem } from "./JournalItem";
import { JournalItemNew } from "./JournalItemNew";
import TopicPicker from "../TopicPicker/TopicPicker";

import "./journal.scss";

export const Journal = (props) => (
    <ul className="journal">
        {props.journal.map((journalItem) => (
            <JournalItem
                key={`journalItem-${journalItem.id}`}
                id={journalItem.id}
                journalId={journalItem.journalId}
                title={journalItem.customFields.journalEntryFieldTitle}
                topicId={journalItem.topics.nodes[0].id} />
        ))}
        <JournalItemNew />
    </ul>
);
