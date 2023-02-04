import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  Dialog as MUIDialog,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { ReactNode } from 'react';
import { WarningAmberIcon } from '../Icons';

interface IDialogProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
  title: string;
  children: string | ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow in ref={ref} {...props} />;
});

function AlertDialog({ open, onClose, onAgree, title, children }: IDialogProps) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        component="span"
        id="alert-dialog-title"
        color="primary"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: 700,
          fontSize: '28px',
          textTransform: 'uppercase',
        }}
      >
        <WarningAmberIcon sx={{ fontSize: '28px' }} />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component="span">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Disagree
        </Button>
        <Button variant="contained" onClick={onAgree} autoFocus color="primary">
          Agree
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AlertDialog;

const StyledDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '600px',
    padding: '4px 8px 16px 16px',
  },
}));
