import React, { Fragment, useEffect } from "react";
import { graphql } from "@apollo/react-hoc";
import { compose } from 'recompose';
import GET_JOURNAL from "../../graphql/queries/getJournalByDate";
import UPDATE_JOURNAL from "../../graphql/mutations/updateJournal";
import CREATE_JOURNAL from "../../graphql/mutations/createJournal";
import DELETE_JOURNAL from "../../graphql/mutations/deleteJournal";
import FullWidthBackground from "../../components/Background/FullWidthBackground";
import Navbar from "../Navbar/navbar";
import TopicPicker from "../../components/TopicPicker/TopicPicker";
import { months } from "../../lib/dates";
import useAuth from "../../hooks/use-auth";
import "./day.scss";

const Day = ({ journalQuery, updateJournal, createJournal, deleteJournal, match: { params: { day, month, year } } }) => {
  const journal = journalQuery.journals ? journalQuery.journals.nodes : [];
  const { user, loggedIn, loading } = useAuth();
  console.log('user', user);
  console.log('logged',loggedIn);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if ( e.target.getAttribute('data-id') ) {

    }
    const listItems = document.querySelectorAll('li');
    const entries = [];
    // Loop through inputs.. 
    listItems.forEach(listItem => {
      // Grab inputs for each item 
      const inputs = listItem.querySelectorAll('input');

      // Set up your input variables 
      let id = ''
      let title = '';
      let topicId = '';

      inputs.forEach(input => {
        if (input.id.indexOf('entry-title') != -1) {
          title = input.value;
        }
        if (input.id.indexOf('entry-id') != -1) {
          id = input.value;
        }
        if (input.classList.contains('selected-topic')) {
          console.log(input.value);
          topicId = input.value;
        }
      });
      entries.push({
        id: id,
        title: title,
        topicId: topicId
      });
    });

    // Post entries 
    entries.forEach(entry => {
      if ( entry.id.length > 0 ) {
        if ( 0 && entry.title.length > 0 && entry.topicId.length > 0 ) {
          // Update entry 
          updateJournal({
            variables: {
              id: entry.id,
              journal_entry_field_title: entry.title,
              topicId: entry.topicId
            },
          });
        }
      } else {
        if ( entry.title.length > 1 && entry.topicId.length > 1 ) {
          createJournal({
            variables: {
              id: entry.id,
              journal_entry_field_title: entry.title,
              topicId: entry.topicId,
              title: `Journal Item Dated ${new Date()}`
            }
          });
        }
      } 
    });
  }

  const deleteJournalHandler = (e) => {
    const idToRemove = e.target.getAttribute('data-id');
    deleteJournal({
      variables: {
        id: idToRemove
      }
    });
  }

  return (
    <Fragment>
      <FullWidthBackground id="main" />
      <Navbar />
      <form id="journalEntries" onSubmit={onSubmitHandler}>
        <div className="day">
          <h1>{months[month - 1]} {day}, {year}</h1>
          <ul>
            {journal.map((journalItem) => (
              <li key={journalItem.journalId}>
                <div className="topic">
                  <TopicPicker currentTopic={journalItem.topics.nodes[0].id} />
                </div>
                <div className="entry">
                  <input id={`entry-title-${journalItem.journalId}`} type="text" defaultValue={journalItem.customFields.journalEntryFieldTitle} />
                  <input id={`entry-id-${journalItem.id}`} type="hidden" value={journalItem.id} />
                </div>
                <button type="button" data-id={journalItem.id} onClick={deleteJournalHandler}>Remove</button>
              </li>
            ))}
            <li key="NewEntryItem">
              <TopicPicker />
              <div className="entry">
                <input id="entry-title" type="text" defaultValue="" placeholder="Enter title" />
              </div>
            </li>
          </ul>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </Fragment>
  );
};

export default compose(
  graphql(GET_JOURNAL, {
    name: 'journalQuery',
    options: (props) => ({
      variables: {
        month: parseInt(props.match.params.month),
        day: parseInt(props.match.params.day),
        year: parseInt(props.match.params.year)
      }
    })
  }),
  graphql(UPDATE_JOURNAL, { name: 'updateJournal' }),
  graphql(CREATE_JOURNAL, { name: 'createJournal' }),
  graphql(DELETE_JOURNAL, { name: 'deleteJournal' })
)(Day);