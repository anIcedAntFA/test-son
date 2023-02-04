import { Skeleton, Stack } from '@mui/material';

function TodoTableSkeleton() {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Skeleton variant="rounded" animation="wave" width={200} height={40} />
        <Skeleton variant="rounded" animation="wave" width={40} height={40} />
      </Stack>
      <Stack direction="column" spacing={1}>
        <Skeleton variant="rounded" animation="wave" width={1152} height={72} />
        <Skeleton variant="rounded" animation="wave" width={1152} height={72} />
        <Skeleton variant="rounded" animation="wave" width={1152} height={72} />
        <Skeleton variant="rounded" animation="wave" width={1152} height={72} />
        <Skeleton variant="rounded" animation="wave" width={1152} height={72} />
      </Stack>
    </Stack>
  );
}

export default TodoTableSkeleton;
