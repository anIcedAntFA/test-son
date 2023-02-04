import { Skeleton, Grid } from '@mui/material';

function TodoFilterSkeleton() {
  return (
    <Grid container spacing={2} sx={{ padding: '0 16px' }} justifyContent="flex-end">
      <Grid item xs={2}>
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid container item xs={7} justifyContent="flex-end">
        <Skeleton variant="rounded" width={620} height={56} />;
      </Grid>
      <Grid container item xs={3} justifyContent="flex-end">
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid item xs={9 / 4}>
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid item xs={9 / 4}>
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid item xs={9 / 4}>
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid item xs={9 / 4}>
        <Skeleton variant="rounded" width={200} height={56} />;
      </Grid>
      <Grid container item xs={3} justifyContent="flex-end">
        <Skeleton variant="rounded" width={95} height={56} />;
        <Skeleton variant="rounded" width={95} height={56} />;
      </Grid>
    </Grid>
  );
}

export default TodoFilterSkeleton;
