import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { ChangeEvent, Dispatch, useRef } from 'react';

import { CancelIcon, SearchIcon } from 'src/components/ui';

interface ITodoFilterSearchProps {
  todoQueryStatus: 'error' | 'success' | 'loading';
  search: string | undefined;
  setSearch: Dispatch<React.SetStateAction<string | undefined>>;
}

function TodoFilterSearch({ todoQueryStatus, search, setSearch }: ITodoFilterSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearch(searchValue);
    }
  };

  const handleClearSearch = () => {
    setSearch(undefined);
    inputRef.current?.focus();
  };

  const StartAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton aria-label="toggle password visibility" edge="start">
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  const EndAdornment = () => {
    if (todoQueryStatus === 'loading') {
      return <CircularProgress size={20} />;
    }

    if (!!search && todoQueryStatus === 'success') {
      return (
        <InputAdornment position="end">
          <IconButton aria-label="close search text" edge="end" onClick={handleClearSearch}>
            <CancelIcon />
          </IconButton>
        </InputAdornment>
      );
    }

    return null;
  };

  return (
    <FormControl sx={{ width: '620px' }} variant="outlined">
      <OutlinedInput
        id="outlined-adornment-password"
        placeholder="Enter your search..."
        inputRef={inputRef}
        value={search ?? ''}
        onChange={handleChange}
        startAdornment={<StartAdornment />}
        endAdornment={<EndAdornment />}
      />
    </FormControl>
  );
}

export default TodoFilterSearch;
