import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from '../header/Header/Header';
import MyPage from '../MyPage/MyPage';

import { MockedProvider } from '@apollo/client/testing';
import { GET_CURRENT_TASKS_QUERY } from '../CurrentTasksGrid/CurrentTasksGrid';

function App() {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_TASKS_QUERY,
        variables: {
          selectedJobId: "1"
        },
      },
      result: {
        data: {
          task: [
            { 
              id: 8888,
              summary: "Mock Task",
              description: "A Mock Task to do",
              isComplete: false,
              creationUser: {
                id: 444,
                firstName: "Brad",
                lastName: "We"
              },
              assignedToJob: {
                id: 1,
                roleCode: "XPL",
                user: {
                  id: 444,
                  firstName: "Brad",
                  lastName: "We"
                }
              },
              isPastDue: true,
              dueDatetime: '2021-01-01T00:00:00Z',
              actions: [
                "delete", "complete"
              ]
            },
            { 
              id: 8889,
              summary: "Mock Task 2",
              description: "A Mock Task to do",
              isComplete: false,
              creationUser: {
                id: 444,
                firstName: "Brad",
                lastName: "We"
              },
              assignedToJob: {
                id: 1,
                roleCode: "XPL",
                user: {
                  id: 444,
                  firstName: "Brad",
                  lastName: "We"
                }
              },
              isPastDue: true,
              dueDatetime: '2021-01-01T00:00:00Z',
              actions: [
                "delete", "complete"
              ]
            },
            { 
              id: 8890,
              summary: "Mock Task 3",
              description: "A Mock Task created by Austin",
              isComplete: false,
              creationUser: {
                id: 445,
                firstName: "Austin",
                lastName: "M"
              },
              assignedToJob: {
                id: 2,
                roleCode: "XPL2",
                user: {
                  id: 445,
                  firstName: "Austin",
                  lastName: "M"
                }
              },
              isPastDue: false,
              dueDatetime: '2021-12-30T00:00:00Z',
              actions: [
                "complete"
              ]
            },
            { 
              id: 8891,
              summary: "Mock Task 4",
              description: "A Mock Task created by Other Brad",
              isComplete: false,
              creationUser: {
                id: 446,
                firstName: "Brad",
                lastName: "Wa"
              },
              assignedToJob: {
                id: 3,
                roleCode: "XPL3",
                user: {
                  id: 446,
                  firstName: "Brad",
                  lastName: "Wa"
                }
              },
              isPastDue: false,
              dueDatetime: '2021-12-30T00:00:00Z',
              actions: [
                "complete"
              ]
            }
          ]
        },
      },
    },
  ];

  return (
    // TODO console says something about strict mode. Not fixing it yet, but will try this later:
    // https://stackoverflow.com/a/65918908

    //Replace MockedProvider with ApolloProvider once we have a backend
    <MockedProvider mocks={mocks} addTypename={false}>
      <Container maxWidth={false} className="App">
        <Header />
        {/*Add in <TeamProvider>? */}
        <MyPage />
      </Container>
    </MockedProvider>
  );
}

export default App;
