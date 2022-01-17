/*
* External Dependencies
*/
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
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
  updateJournal,
  createJournal,
  deleteJournal,
  match: { params: { day, month, year } } }) => {

  const { user, loggedIn } = useAuth();
  const userID = user ? user.databaseId : 0;
  const journalQuery = useQuery(queries.getJournalByDate, {
    variables: {
      month: parseInt(month),
      day: parseInt(day),
      year: parseInt(year),
      author: parseInt(userID)
    }
  });

  let journal = journalQuery.data && journalQuery.data.journals ? journalQuery.data.journals.nodes : [];

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
      if (loggedIn && user && user.capabilities.indexOf('edit_private_posts') != -1) {
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
            createJournal({
              variables: {
                journal_entry_field_title: entry.title,
                topicId: entry.topicId,
                title: `Journal Item Dated ${new Date()}`
              },
              update(cache, { data }) {
                journalQuery.refetch();
                journal = journalQuery.data && journalQuery.data.journals ? journalQuery.data.journals.nodes : [];
                cache.writeQuery({
                  query: queries.getJournalByDate,
                  data: {
                    journals: {
                      nodes: [
                        ...journal,
                        data.createJournal.journal,
                      ]
                    },
                  },
                });
              }
            });
            entry.idElement.value = "";
            entry.titleElement.value = "";
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
    <>
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
    </>
  );
};

export default compose(
  graphql(mutations.updateJournal, { name: 'updateJournal' }),
  graphql(mutations.createJournal, { name: 'createJournal' }),
  graphql(mutations.deleteJournal, { name: 'deleteJournal' })
)(Day);