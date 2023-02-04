import {
  DialogContent,
  DialogTitle,
  Grow,
  IconButton,
  Dialog as MUIDialog,
  Stack,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { ReactElement, ReactNode } from 'react';

import { CloseIcon, MyTooltip } from 'src/components/ui';

interface IDialogProps {
  open: boolean;
  onClose: () => void;
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

function FormDialog({ open, onClose, title, children }: IDialogProps) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack direction="row" justifyContent="space-between" sx={{ padding: '20px 40px' }}>
        <DialogTitle
          id="alert-dialog-title"
          color="primary"
          sx={{ fontWeight: 700, fontSize: '28px', p: 0, textTransform: 'uppercase' }}
        >
          {title}
        </DialogTitle>
        <MyTooltip title={`Close ${title}`}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </MyTooltip>
      </Stack>
      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
}

export default FormDialog;

const StyledDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '800px',
  },
}));
