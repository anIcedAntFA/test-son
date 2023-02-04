import { Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { Dispatch } from 'react';

import { AlertDialog, DeleteIcon, EditIcon, FormDialog, VisibilityIcon } from 'src/components/ui';
import { ITodo, TodoForm, useDeleteManyTodos, useDeleteOneTodo } from 'src/features/todos';
import { useDialog, useFormMode } from 'src/hooks';
import { EConfirmDelete, EToastMessage, IdType } from 'src/types';
import { getFormTitle, showToastMessage } from 'src/utilities';

interface ITodoMenuActionsProps {
  anchorEl: HTMLElement | null;
  todoIdsSelected: IdType[];
  currentTodo: Omit<ITodo, 'createdAt' | 'updatedAt'> | undefined;
  setSelected: Dispatch<React.SetStateAction<IdType[]>>;
  handleCloseMenuActions: () => void;
  handlePreviewTodo: () => void;
  handleEditTodo: () => void;
  handleDeleteTodo: () => void;
  handleCloseForm: () => void;
}

function TodoMenuActions({
  anchorEl,
  todoIdsSelected,
  currentTodo,
  setSelected,
  handleCloseMenuActions,
  handlePreviewTodo,
  handleEditTodo,
  handleDeleteTodo,
  handleCloseForm,
}: ITodoMenuActionsProps) {
  const { openFormDialog, confirmDeleteDialog, hideAllDialog } = useDialog();

  const { formMode } = useFormMode();

  const deleteMutation = useDeleteOneTodo({
    onSuccess(id) {
      showToastMessage(
        `Delete todo ${currentTodo?.title} with ID ${id} successfully`,
        EToastMessage.success,
      );
      handleCloseMenuActions();
    },
    onError(error) {
      showToastMessage(error.response.data.message, EToastMessage.error);
    },
  });

  const deleteManyMutation = useDeleteManyTodos({
    onSuccess(ids) {
      showToastMessage(`Delete many todo with ID ${ids} successfully`, EToastMessage.success);
    },
    onError(error) {
      showToastMessage(error.response.data.message, EToastMessage.error);
    },
  });

  const handleAgreeDelete = () => {
    if (confirmDeleteDialog === EConfirmDelete.one) {
      deleteMutation.mutate(currentTodo?.id!);
    } else {
      deleteManyMutation.mutate(todoIdsSelected);
      setSelected([]);
    }
    hideAllDialog();
  };

  const handleCloseDialog = () => {
    hideAllDialog();
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={PaperProps}
        onClose={handleCloseMenuActions}
      >
        <MenuItem onClick={handlePreviewTodo} disableRipple>
          <ListItemIcon>
            <VisibilityIcon color="info" />
          </ListItemIcon>
          <ListItemText sx={{ color: (theme) => theme.palette.info.main }}>Preview</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditTodo} disableRipple>
          <ListItemIcon>
            <EditIcon color="warning" />
          </ListItemIcon>
          <ListItemText sx={{ color: (theme) => theme.palette.warning.main }}>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteTodo} disableRipple>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: (theme) => theme.palette.error.main }}>Delete</ListItemText>
        </MenuItem>
      </Popover>

      <FormDialog open={openFormDialog} title={getFormTitle(formMode)()} onClose={handleCloseForm}>
        <TodoForm currentTodo={currentTodo} />
      </FormDialog>

      <AlertDialog
        open={
          confirmDeleteDialog === EConfirmDelete.one || confirmDeleteDialog === EConfirmDelete.many
        }
        onClose={handleCloseDialog}
        onAgree={handleAgreeDelete}
        title="Delete Confirmation"
      >
        {confirmDeleteDialog === EConfirmDelete.one && (
          <>
            Are you sure to delete this todo{' '}
            <Typography component="span" color="primary" fontWeight="700">
              {currentTodo?.title}
            </Typography>{' '}
            with ID{' '}
            <Typography component="span" color="primary" fontWeight="700">
              {currentTodo?.id}
            </Typography>{' '}
            ? All of your content will be delete permanently removed from our servers. This action
            cannot be undone.
          </>
        )}

        {confirmDeleteDialog === EConfirmDelete.many && (
          <>
            Are you sure to delete these todos with ID{' '}
            <Typography component="span" color="primary" fontWeight="700">
              {todoIdsSelected.join(', ')}
            </Typography>{' '}
            ? All of your content will be delete permanently removed from our servers. This action
            cannot be undone.
          </>
        )}
      </AlertDialog>
    </>
  );
}

const PaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    p: 1,
    width: 140,
    '& .MuiMenuItem-root': {
      px: 1,
      typography: 'body2',
      borderRadius: '8px',
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 20,
      right: -6,
      width: 12,
      height: 12,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

export default TodoMenuActions;
