import { IconButton, Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { DeleteIcon, FilterListIcon, MyTooltip } from 'src/components/ui';

export interface IMyTableToolbarProps {
  numSelected: number;
  handleDeleteMany: () => void;
}

function MyTableToolbar({ numSelected, handleDeleteMany }: IMyTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="p">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="p">
          List Todos
        </Typography>
      )}
      {numSelected > 0 ? (
        <MyTooltip title="Delete" placement="left">
          <IconButton onClick={handleDeleteMany}>
            <DeleteIcon />
          </IconButton>
        </MyTooltip>
      ) : (
        <MyTooltip title="Filter list" placement="left">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </MyTooltip>
      )}
    </Toolbar>
  );
}

export default MyTableToolbar;
