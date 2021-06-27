import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';



export default class SimpleBreadcrumbs extends React.Component{
  render(){
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" >
        {this.props.data}
      </Link>
      <Link color="inherit" href="/" >
        Category
      </Link>
      <Link color="inherit" href="/getting-started/installation/" >
        Sub Category
      </Link>
      <Typography color="textPrimary">Product</Typography>
    </Breadcrumbs>
  );
}
}
