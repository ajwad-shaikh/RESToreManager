import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Link from '@material-ui/core/Link';

export default function About(props) {
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Made with  '}
      <Icon className="fab fa-react" />
      {'    '}
      <Icon className="fab fa-github" />
      {'    '}
      <Icon className="fab fa-google" />
      {'    '}
      <Icon className="fab fa-node-js" />
      {'    &    '}
      <Icon className="fas fa-heart" />
      {'    by   '}
      <Link color="inherit" href="https://ajwad-shaikh.github.io/">
        <strong>Ajwad Shaikh</strong>
      </Link>
      {'   -   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
