import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Slide, Dialog, DialogTitle, DialogContent, Divider, Grid, Table, TableRow, TableCell, TableBody } from '@material-ui/core';

//transition effects
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

/*render the details of the sites*/
class SiteDetails extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

  render() {
    const { site } = this.props; 
    return (
      <div>
        <Button onClick={this.handleOpen} color='primary'>Details</Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <Grid container centered='true' align='center'>
          <Grid item align='center' xs={12}>

            <DialogTitle id="alert-dialog-slide-title">
              <h1>{site.name}</h1>
            </DialogTitle>
            <DialogContent>
            <Paper style={{maxHeight:500, 
              height:'auto', 
              overflow:'auto', 
              width:'100%', 
              textAlign:'center', 
              marginTop:10, 
              flexGrow:1, 
              overflowX:'auto'}} 
              center='true'>
            <span>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                    <strong>Date Established:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.dateEstablished}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                    <strong>Latitude:</strong> 
                  </TableCell>
                  <TableCell>
                    {site.latitude}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Longitude:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.longitude}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Location:</strong>
                    </TableCell>
                    <TableCell>
                    {site.location}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Description:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.description}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Created At:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.createdAt}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Updated At:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.updatedAt}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Survey Type ID:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.survey_type_id}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                    <strong>Marker ID:</strong> 
                    </TableCell>
                    <TableCell>
                    {site.marker_id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </span>
            </Paper>
            </DialogContent>
          </Grid>
        </Grid>
        </Dialog>
      </div>
    );
  }
}

export default SiteDetails;