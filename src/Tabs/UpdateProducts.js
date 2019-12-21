import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
  },
  paper: {
    margin: theme.spacing(2, 4),
    alignItems: 'center',
    overflow: 'auto',
  },
}));

export default function UpdateProduct(props) {
  const classes = useStyles();

  const [response, setResponse] = React.useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      variant: variant,
    });
  };

  const handleChange = newValue => {
    setResponse(newValue);
  };

  const updateProduct = (productId, patchData) => {
    axios
      .patch(
        'https://restockmanager.firebaseapp.com/api/v1/products/' + productId,
        patchData,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function(response) {
        document.getElementById('update-product-form').reset();
        handleClick(
          'Thanks for updating the catalog, feels Amaz(on)ing!',
          'success',
        );
        handleChange(JSON.stringify(patchData));
      });
  };

  const handleResult = event => {
    event.preventDefault();
    const data = event.target;
    const categories = data.categories.value.split(',');
    const imageUrls = data.images.value.split(',');
    const productId = data.productId.value;
    const patchData = {
      productName: data.productName.value,
      brandName: data.brandName.value,
      categories: categories,
      images: imageUrls,
    };
    updateProduct(productId, patchData);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <form
          id="update-product-form"
          className={classes.paper}
          onSubmit={handleResult}
        >
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="productId"
            label="Product Id"
            name="productId"
            autoComplete="Product Id"
            autoFocus
            inputProps={{
              maxLength: 40,
            }}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="Product Name"
            autoFocus
            inputProps={{
              maxLength: 40,
            }}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="brandName"
            label="Brand Name"
            name="brandName"
            autoComplete="Brand Name"
            inputProps={{
              maxLength: 40,
            }}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="images"
            label="Image URLs (separated by comma)"
            id="images"
            autoComplete="images"
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="categories"
            label="Product Categories (separated by comma)"
            id="categories"
            autoComplete="catergories"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Update Catalog
          </Button>
        </form>
      </Grid>
      <Grid item xs={false} sm={4} md={7} component={Paper} elevation={6}>
        <Typography className={classes.paper}>{response}</Typography>
      </Grid>
    </Grid>
  );
}
