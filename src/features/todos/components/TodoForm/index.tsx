import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, styled } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf, z } from 'zod';

import {
  FormCheckboxField,
  FormDatePickerField,
  FormProvider,
  FormSelectField,
  FormTextField,
} from 'src/components/form';
import { AddIcon, EditIcon, SaveIcon } from 'src/components/ui';
import {
  ITodo,
  TODO_CATEGORY_OPTIONS,
  TODO_STATUS_OPTIONS,
  useCreateTodo,
  useUpdateTodo,
} from 'src/features/todos';
import { useDialog, useFormMode } from 'src/hooks';
import { addDate, formatAnyToDate, showToastMessage, subtractDate } from 'src/utilities';
import { EFormMode, EToastMessage } from 'src/types';

interface ITodoFormProps {
  currentTodo?: Omit<ITodo, 'createdAt' | 'updatedAt'>;
}

const TODO_CATEGORY_SCHEMA = ['Coding', 'Running', 'Dating', 'Playing'] as const;

const TODO_STATUS_SCHEMA = ['Not Started', 'In Progress', 'Completed'] as const;

const todoFormSchema = z.object({
  title: z.string().min(1, '*Please enter your todo title'),
  content: z.string().min(1, '*Please enter your todo content'),
  category: z.enum(TODO_CATEGORY_SCHEMA),
  status: z.enum(TODO_STATUS_SCHEMA),
  startDate: z.date(),
  endDate: z.date(),
  isImportant: z.boolean(),
});

type TodoFormValuesType = TypeOf<typeof todoFormSchema>;

function TodoForm({ currentTodo }: ITodoFormProps) {
  const { setOpenFormDialog } = useDialog();

  const { formMode, setFormMode } = useFormMode();

  const defaultTodoFormValues: TodoFormValuesType = {
    title: currentTodo?.title ?? '',
    content: currentTodo?.content ?? '',
    category: currentTodo?.category ?? 'Coding',
    status: currentTodo?.status ?? 'Not Started',
    startDate: formatAnyToDate(currentTodo?.startDate) ?? subtractDate(2, 'month'),
    endDate: formatAnyToDate(currentTodo?.endDate) ?? addDate(2, 'month'),
    isImportant: currentTodo?.isImportant ?? false,
  };

  const methods = useForm<TodoFormValuesType>({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: defaultTodoFormValues,
    resolver: zodResolver(todoFormSchema),
  });

  const {
    handleSubmit,
    reset,
    setFocus,
    formState: { isValid, isSubmitting },
  } = methods;

  const createTodoMutation = useCreateTodo({
    onSuccess(id, newTodo) {
      showToastMessage(
        `Create Todo ${newTodo.title} with ID ${id} successfully`,
        EToastMessage.success,
      );
      setFocus('title');
      reset();
    },
  });

  const updateTodoMutation = useUpdateTodo({
    onSuccess(_, updatedTodo) {
      showToastMessage(
        `Update Todo ${updatedTodo.data.title} with ID ${updatedTodo?.id} successfully`,
        EToastMessage.success,
      );
      setOpenFormDialog(false);
    },
  });

  const onSubmit: SubmitHandler<TodoFormValuesType> = (todo) => {
    if (formMode === EFormMode.edit) {
      updateTodoMutation.mutate({ id: currentTodo?.id!, data: todo });
    } else {
      createTodoMutation.mutate(todo);
    }
  };

  const handleEditTodo = () => {
    setFormMode(EFormMode.edit);
  };

  const renderFormImportantField = () => {
    if (formMode === EFormMode.preview) {
      return currentTodo?.isImportant ? 'Marked as Important' : '';
    }
    return <FormCheckboxField name="isImportant" label="Mark as Important" />;
  };

  const isLoading = createTodoMutation.isLoading || updateTodoMutation.isLoading;

  const isDisabled = !isValid || isSubmitting;

  return (
    <>
      {createTodoMutation.status === 'error' && JSON.stringify(createTodoMutation.error)}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ padding: '0 16px' }} justifyContent="flex-end">
          <Grid item xs={12}>
            <FormTextField
              name="title"
              label="Title"
              inputProps={{ readOnly: formMode === EFormMode.preview }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              name="content"
              label="Content"
              multiline
              rows={4}
              inputProps={{ readOnly: formMode === EFormMode.preview }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormSelectField
              name="category"
              label="Category"
              options={TODO_CATEGORY_OPTIONS}
              inputProps={{ readOnly: formMode === EFormMode.preview }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormSelectField
              name="status"
              label="Status"
              options={TODO_STATUS_OPTIONS}
              inputProps={{ readOnly: formMode === EFormMode.preview }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormDatePickerField
              name="startDate"
              label="Start date"
              // maxDate={defaultTodoFormValues.endDate}
              readOnly={formMode === EFormMode.preview}
            />
          </Grid>
          <Grid item xs={6}>
            <FormDatePickerField
              name="endDate"
              label="End date"
              // minDate={defaultTodoFormValues.startDate}
              readOnly={formMode === EFormMode.preview}
            />
          </Grid>
          <Grid item xs={12}>
            {renderFormImportantField()}
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            {formMode === EFormMode.preview && (
              <StyledButton
                type="button"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditTodo}
              >
                Edit Todo
              </StyledButton>
            )}

            {formMode !== EFormMode.preview && (
              <StyledLoadingButton
                type="submit"
                variant="contained"
                startIcon={formMode === EFormMode.edit ? <SaveIcon /> : <AddIcon />}
                loading={isLoading}
                loadingPosition="start"
                disabled={isDisabled}
              >
                {formMode === EFormMode.edit ? 'Save Todo' : 'Add Todo'}
              </StyledLoadingButton>
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  height: '56px',
  width: '200px',
  fontWeight: 700,
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  height: '56px',
  width: '200px',
  fontWeight: 700,
  '& .MuiCircularProgress-root': {
    width: '20px',
    height: '20px',
  },
}));

export default TodoForm;
