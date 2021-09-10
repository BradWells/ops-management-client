import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import './CurrentTasksGrid.css'
import { IconButton,Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  GridColumns,
  GridValueGetterParams,
  GridRenderCellParams,
  GridRowParams,
  DataGrid,
} from '@mui/x-data-grid';
import { Tooltip } from '@material-ui/core';

type UserType = {
  id: string,
  firstName: String,
  lastName: String
}

type JobType = {
  id: string,
  roleCode: string,
  user: UserType
}

type TaskType = {
  id: string,
  summary: string,
  description: string,
  isComplete: boolean,
  creationUser: UserType,
  assignedToJob: JobType,
  isPastDue: boolean,
  dueDatetime: string
  actions: string[]
}

const GET_CURRENT_TASKS_QUERY = gql`
  query GetCurrentTasksForJobOnTeam {
    task(isDeleted: false) {
      id
      summary
      description
      isComplete
      creationUser {
        # Change this to a fragment later
        id
        firstName
        lastName
      }
      assignedToJob(id: $selectedJobId) {
        id
        roleCode
        user {
          # Change this to a fragment later
          id
          firstName
          lastName
        }
      }
      isPastDue
      dueDatetime,
      actions
    }
  }
`;

const CURRENT_TASKS_COLUMNS: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150
  },
  {
    field: 'summary',
    headerName: 'Summary',
    width: 150,
    renderCell: (params) =>  (
      <Tooltip title={getTaskFromParams(params).description} placement="right">
       <span className="has-tooltip">{getTaskFromParams(params).summary}</span>
       </Tooltip>
     ),
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150
  },
  {
    field: 'isComplete',
    headerName: 'Is Complete',
    width: 150
  },
  {
    field: 'isPastDue',
    headerName: 'Is Past Due',
    width: 150
  },
  {
    field: 'dueDatetime',
    headerName: 'Due Datetime',
    width: 150
    // Need a valueGetter here for sure
  },
  {
    field: 'creationUser',
    headerName: 'Created By',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${getTaskFromParams(params).creationUser.lastName}, ${getTaskFromParams(params).creationUser.firstName}`
  },
  {
    field: 'assignedToJob',
    headerName: 'Assigned To',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${getTaskFromParams(params).assignedToJob.user.lastName}, ${getTaskFromParams(params).assignedToJob.user.firstName}`
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 200,
    renderCell: (params) => {
      const task = getTaskFromParams(params);
      return (
      <div>
        {/* && is react template equivalent to "if xx then include this" */}
        {doActionsContain(task,"delete") &&
          <IconButton>
            <DeleteIcon />
          </IconButton>}
        {doActionsContain(task,"complete") &&
          <Button variant="contained" color="primary" size="small">complete</Button>}
      </div>
      )
    }
  }
];

type CurrentTaskGridProps = {
  selectedJobId: string
};

const CurrentTasksGrid = (props: CurrentTaskGridProps) => {
  const { loading, error, data } = useQuery(
    GET_CURRENT_TASKS_QUERY,
    { 
      variables: { 
        selectedJobId: props.selectedJobId
      } 
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <div>
      {/* Remove autoHeight when the parent div has implicit size */}
      <DataGrid
        autoHeight
        columns={CURRENT_TASKS_COLUMNS}
        rows={data.task}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowClassName={
          (params) => {
            if(getTaskFromParams(params).isPastDue){
              return 'tasks-grid-warning'
            } else {
              // Don't actually have any css on this
              return 'tasks-grid-default'
            }
          }
        }
      />
    </div>
  )
};

function getTaskFromParams(params: GridRenderCellParams|GridValueGetterParams|GridRowParams): TaskType{
  const task = params.row as TaskType;
  return task;
}

function doActionsContain(task: TaskType, actionName: string){
  return task.actions.indexOf(actionName) > -1;
}

export { GET_CURRENT_TASKS_QUERY }

export default CurrentTasksGrid;
