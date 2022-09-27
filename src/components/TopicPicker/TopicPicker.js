/*
* External Dependencies
*/
import React, { useState, useEffect } from "react";
import { graphql } from "@apollo/react-hoc";
import { compose } from 'recompose';


/*
* Internal Dependencies
*/
import { IconPickerItem } from "react-fa-icon-picker";
import { queries } from "../../graphql/queries/queries";
import { useToggleClass } from "../../hooks/use-toggle-class";


import "./topicPicker.scss";

const TopicPicker = (props) => {
    const [toggleClass, toggle] = useToggleClass('closed', {
        open: 'closed',
        closed: 'open'
    });

    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(props.currentTopic);

    useEffect(() => {
        // Sort topics so selected topic is on top.
        const queriedTopics = props.topicQuery.topics ? [...props.topicQuery.topics.nodes] : [];
        queriedTopics.sort((a, b) => (a.id === selectedTopic ? -1 : 0));
        setTopics(queriedTopics);
    }, [props.topicQuery]);


    const topicSelectedHandler = (e) => {
        const sortedTopics = [...topics];
        // Set selected topic and move topic to top of list.
        sortedTopics.sort((a, b) => {
            if (a.customFields.journalTopicFieldIcon === e) {
                setSelectedTopic(a.id);
                return -1;
            } else {
                return 0;
            }
        });
        setTopics(sortedTopics);
    };

    return (
        <div className="topicPicker" onClick={toggle} >
            <input className="topicPicker__selected-topic" type="hidden" value={selectedTopic} />
            <div className="topicPicker__topic">
                <div className={`topicPicker__topic__options ${toggleClass}`}>
                    {topics.map((topic, topicIndex ) => {
                        return (
                            <>
                                <IconPickerItem
                                    icon={topic.customFields.journalTopicFieldIcon}
                                    size={24}
                                    color={topic.customFields.journalTopicFieldColor}
                                    onClick={topicSelectedHandler}
                                />
                                <input type="hidden" value={topic.id} />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default compose(
    graphql( queries.getTopics, { name: 'topicQuery' })
)(TopicPicker);