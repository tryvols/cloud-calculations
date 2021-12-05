import React, { FC, ChangeEvent, useState, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

type SearchFieldProps = Readonly<{
  defaultValue?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
}>;

const disableRequest = (callback?: () => void) => (e: FormEvent<HTMLDivElement>): void => {
  e.preventDefault();
  callback?.();
}

export const SearchField: FC<SearchFieldProps> = (
  {
    defaultValue = '',
    placeholder = 'Search for queue by name',
    onSubmit,
    onChange,
  },
) => {
  const [ searchValue, setSearchValue ] = useState(defaultValue);
  const classes = useStyles();

  const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setSearchValue(value);
    onChange?.(value);
  }

  const onSearch = (): void => {
    onSubmit?.(searchValue);
  }

  return (
    <Paper component="form" onSubmit={disableRequest(onSearch)} className={classes.root}>
      <InputBase
        autoFocus={true}
        autoComplete="off"
        defaultValue={defaultValue}
        onChange={onChangeValue}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
