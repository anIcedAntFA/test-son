import {
  CodeIcon,
  DirectionsRunIcon,
  SportsEsportsIcon,
  VolunteerActivismIcon,
} from 'src/components/ui';
import { IHeadCell } from 'src/components/ui/MyTable/MyTableHead';
import { ITodo, ITodoOption } from 'src/features/todos/types';
import { ERROR, INFO, SUCCESS, WARNING } from 'src/constants';

export const TODO_IMPORTANT_STATE = {
  IsImportant: 'isImportant',
  NotImportant: 'notImportant',
  All: 'all',
} as const;

export const TODO_CATEGORY_STATE = {
  Coding: 'Coding',
  Dating: 'Dating',
  Running: 'Running',
  Playing: 'Playing',
} as const;

export const TODO_CATEGORIES = ['Coding', 'Running', 'Dating', 'Playing'] as const;

export const TODO_STATUS_STATE = {
  NotStarted: 'Not Started',
  InProgress: 'In Progress',
  Completed: 'Completed',
} as const;

export const TODO_STATUSES = ['Not Started', 'In Progress', 'Completed'] as const;

export const IMPORTANT_OPTIONS = [
  {
    title: 'Is Important',
    value: 'isImportant',
  },
  {
    title: 'Not Important',
    value: 'notImportant',
  },
  {
    title: 'All',
    value: 'all',
  },
];

export const TODO_ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, { label: 'All', value: -1 }];

export const TODO_CATEGORY_OPTIONS: ITodoOption[] = [
  {
    title: 'Coding',
    value: 'coding',
  },
  {
    title: 'Running',
    value: 'running',
  },
  {
    title: 'Dating',
    value: 'dating',
  },
  {
    title: 'Playing',
    value: 'playing',
  },
];

export const TODO_STATUS_OPTIONS: ITodoOption[] = [
  {
    title: 'Not Started',
    value: 'notStarted',
    color: 'info',
  },
  {
    title: 'In Progress',
    value: 'inProgress',
    color: 'secondary',
  },
  {
    title: 'Completed',
    value: 'completed',
    color: 'success',
  },
];

export const TODO_IMPORTANT_OPTIONS: ITodoOption[] = [
  {
    title: 'Important',
    value: true,
  },
  {
    title: 'None',
    value: false,
  },
];

export const TODO_HEAD_CELLS: IHeadCell<ITodo>[] = [
  {
    id: 'isImportant',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Task Name',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

export const TODO_STATUS_COLORS_MAPPING = {
  'Not Started': INFO,
  'In Progress': WARNING,
  Completed: SUCCESS,
  Deleted: ERROR,
} as const;

export const TODO_CATEGORY_ICONS_MAPPING = {
  Coding: <CodeIcon />,
  Dating: <VolunteerActivismIcon />,
  Running: <DirectionsRunIcon />,
  Playing: <SportsEsportsIcon />,
} as const;
