import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import FullWidthBackground from "../../components/Background/FullWidthBackground";
import Navbar from "../Navbar/navbar";
import { IconPickerItem } from "react-fa-icon-picker";
import { months } from "../../lib/dates";
import "./day.scss";

const getItemsQuery = (month, day, year ) => gql`
  query {
    journals(where: {dateQuery: {month: ${month}, day: ${day}, year: ${year}}}) {
      edges {
        node {
          title
          customFields {
            journalEntryFieldTitle
          }
          topics {
            edges {
              node {
                name
                customFields {
                  journalTopicFieldColor
                  journalTopicFieldIcon
                }
              }
            }
          }
        }
      }
    }  
  }
`;
 
const Day = (props) => {
  const params = useParams();
  const { loading, error, data } = useQuery(getItemsQuery(params.month, params.day, params.year));

  if (  ! loading ) {
    console.log(data.journals.edges);
  }

  return (
    <Fragment>
      <FullWidthBackground id="main" />
      <Navbar/>
      <div className="day">
        <h1>{months[params.month - 1]} {params.day}, {params.year}</h1>
        <ul>
          { ! loading ? data.journals.edges.map( (journalItem) => {
            return (
              <li key={journalItem.node.id}>
                <div class="topic">
                  <IconPickerItem
                    icon={journalItem.node.topics.edges[0].node.customFields.journalTopicFieldIcon}
                    size={24}
                    color={journalItem.node.topics.edges[0].node.customFields.journalTopicFieldColor}
                    onClick={() => {}}
                  />
                </div>
                <div class="entry">
                  {journalItem.node.customFields.journalEntryFieldTitle}
                </div>
              </li>
            )
          }) : '' }
        </ul>
      </div>
    </Fragment>
  );
};

export default Day;
