import { forwardRef, ReactElement } from 'react';
import { Box, BoxProps } from '@mui/material';
import { Helmet } from 'react-helmet-async';

interface IPageProps extends BoxProps {
  title: string;
  meta?: ReactElement;
}

const Page = forwardRef(({ children, title = '', meta, ...other }: IPageProps, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Simple Todo App`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
