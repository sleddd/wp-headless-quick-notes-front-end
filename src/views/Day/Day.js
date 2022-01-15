/*
* External Dependencies
*/
import React, { Fragment, useEffect } from "react";
import { graphql } from "@apollo/react-hoc";
import { compose } from 'recompose';
import { cache } from '../../hooks/use-app-apollo';

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

  const { user, loggedIn } = useAuth();
  let journal = journalQuery.journals ? journalQuery.journals.nodes : [];

  useEffect(() => {
    journalQuery.refetch();
  }, [createJournal, updateJournal, deleteJournal])


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
      let titleElement = null;
      let idElement = null;

      inputs.forEach(input => {
        if (input.id.indexOf('item-title') != -1) {
          title = input.value;
          titleElement = input;
        }
        if (input.id.indexOf('item-id') != -1) {
          id = input.value;
          idElement = input;
        }
        if (input.classList.contains('topicPicker__selected-topic')) {
          topicId = input.value;
        }
      });
      entries.push({
        id: id,
        title: title,
        topicId: topicId,
        idElement: idElement,
        titleElement: titleElement
      });
    });

    // Post entries 
    entries.forEach(entry => {
      if (loggedIn && user && user.capabilities.indexOf('edit_posts') != -1) {
        if (entry.id.length > 1) {
          // Update entry 
          updateJournal({
            variables: {
              id: entry.id,
              topicId: entry.topicId,
              journal_entry_field_title: entry.title,
            },
          });
          journalQuery.refetch();
        } else {
          if (entry.title.length > 1) {
            // Create entry
            const test = createJournal({
              variables: {
                journal_entry_field_title: entry.title,
                topicId: entry.topicId,
                title: `Journal Item Dated ${new Date()}`
              }
            });
            entry.idElement.value = "";
            entry.titleElement.value = "";
            journalQuery.refetch({update: (cache, {data: {journalQuery}})});
          }
        }
      } else {
        alert('You must be logged in to add new items.');
      }
    });
  }

  const deleteItemHandler = (e) => {
    if (loggedIn && user && user.capabilities.indexOf('edit_posts') != -1) {
      deleteJournal({
        variables: {
          id: e.target.value
        }
      });
      journalQuery.refetch();
    } else {
      alert('You must be logged in to add new items.');
    }
  }

  return (
    <Fragment>
      <FullWidthBackground id="main" />
      <Navbar />
      <form method="post" onSubmit={onSubmitHandler}>
        <div className="day">
          <h1>{months[month - 1]} {day}, {year}</h1>
          <Journal
            journal={journal}
            deleteItemHandler={deleteItemHandler}
          />
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