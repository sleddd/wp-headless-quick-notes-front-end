/*
* External Dependencies
*/
import React, { Fragment, useEffect } from "react";
import { graphql } from "@apollo/react-hoc";
import { compose } from 'recompose';

/*
* Internal Dependencies
*/
import { queries } from "../../graphql/queries/queries";
import { mutations } from "../../graphql/mutations/mutations";
import FullWidthBackground from "../../components/Background/FullWidthBackground";
import Navbar from "../Navbar/navbar";
import { Journal } from "../../components/Journal/Journal";
import { months } from "../../lib/dates";
import useAuth from "../../hooks/use-auth";

import "./day.scss";

const Day = ({
  journalQuery,
  updateJournal,
  createJournal,
  deleteJournal,
  match: { params: { day, month, year } } }) => {

  const { user, loggedIn, loading } = useAuth();
  const journal = journalQuery.journals ? journalQuery.journals.nodes : [];

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
      if (entry.id.length > 0) {
        if (0 && entry.title.length > 0 && entry.topicId.length > 0) {
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
        if (entry.title.length > 1 && entry.topicId.length > 1) {
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
      <form method="post" onSubmit={onSubmitHandler}>
        <div className="day">
          <h1>{months[month - 1]} {day}, {year}</h1>
          <Journal journal={journal} />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </Fragment>
  );
};

export default compose(
  graphql(queries.getJournalByDate, {
    name: 'journalQuery',
    options: (props) => ({
      variables: {
        month: parseInt(props.match.params.month),
        day: parseInt(props.match.params.day),
        year: parseInt(props.match.params.year)
      }
    })
  }),
  graphql(mutations.updateJournal, { name: 'updateJournal' }),
  graphql(mutations.createJournal, { name: 'createJournal' }),
  graphql(mutations.deleteJournal, { name: 'deleteJournal' })
)(Day);