import React, { useState, useEffect } from "react";
import { graphql } from "@apollo/react-hoc";
import { compose } from 'recompose';
import { IconPickerItem } from "react-fa-icon-picker";
import GET_TOPICS from "../../graphql/queries/getTopics";
import { useToggleClass } from "../../hooks/use-toggle-class";
import "./topicPicker.scss";

const TopicPicker = (props) => {
    const [toggleClass, toggle] = useToggleClass('closed', {
        open: 'closed',
        closed: 'open'
      });
    
    const [topics, setTopics ] = useState([]);   
    const [ selectedTopic, setSelectedTopic ] = useState(props.currentTopic);
    useEffect(()=>{
        const queriedTopics = props.topicQuery.topics ? props.topicQuery.topics.nodes : [];
        let filteredTopics  = [];
        // Filtered topics so current topic is on top of options.
        for( let i = 0; i < queriedTopics.length; i++ ) {
            if ( queriedTopics[i].id == selectedTopic ) {
                filteredTopics.unshift(queriedTopics[i]);
            } else {
                filteredTopics.push(queriedTopics[i]);
            }
        }    
        setTopics( filteredTopics ); 
    }, [props.topicQuery]);

    
    const topicSelectedHandler = (e) => {
        let filteredTopics = [];
        let selectedTopic = '';
        // Filter options so selected option is on top.
        for( let i = 0; i < topics.length; i++ ) {
           if ( topics[i].customFields.journalTopicFieldIcon === e ) {
               setSelectedTopic(topics[i].id);
               filteredTopics.unshift(topics[i]);
           } else {
               filteredTopics.push(topics[i]);
           }
        }
        setTopics(filteredTopics);
    };
    return (
        <div className="topicPicker" onClick={toggle} >
            <input className="selected-topic" type="hidden" value={selectedTopic} />
            <div className="topic">
                <div className={`topic__options ${toggleClass}`}>
               { topics.map( (topic) =>{ return(
                <>
                 <IconPickerItem
                 key={topic.topicId}
                 icon={topic.customFields.journalTopicFieldIcon}
                 size={24}
                 color={topic.customFields.journalTopicFieldColor}
                 onClick={topicSelectedHandler}
               />
               <input type="hidden" value={topic.id} />
               </>
              )})}
              </div>
           </div>
    </div>
)};

export default compose(
    graphql( GET_TOPICS, { name: 'topicQuery' } )
)(TopicPicker);