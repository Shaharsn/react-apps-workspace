import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/* eslint-disable-next-line */
export interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  const { title } = props;
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
