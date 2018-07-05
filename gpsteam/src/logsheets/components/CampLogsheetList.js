/*There is a bug here. You will get an error that this.props.data.sites will become when you open it to a private browser*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List, Button, Table, TableRow, TableHead, TableCell, TableBody, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CampLogSheetForm from './CampLogSheetForm';

const campaignQuery = gql `
	{
		  campaignLogsheets {
            date
            heightNorthMeters
            heightEastMeters
            heightSouthMeters
            heightWestMeters
            timeStart
            timeEnd
            failureTime
            azimuth
            notes
            site_id
            antenna_id
            receiver_id
            site{
                name
            }
        }
	}
`


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class CampLogsheetList extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    renderList(){
        console.log(this.props.data.campaignLogsheets)
        return(this.props.data.campaignLogsheets.map((logsheet) => {
                return(
                    <TableRow key={logsheet.id}>
                        <TableCell>{logsheet.site.name}</TableCell>
                        <TableCell>{logsheet.date}</TableCell>
                        <TableCell>{logsheet.heightNorthMeters}</TableCell>
                        <TableCell>{logsheet.heightWestMeters}</TableCell>
                        <TableCell>{logsheet.heightSouthMeters}</TableCell>
                        <TableCell>{logsheet.heightEastMeters}</TableCell>
                        <TableCell>{logsheet.timeStart}</TableCell>
                        <TableCell>{logsheet.timeEnd}</TableCell>
                        <TableCell>{logsheet.failureTime}</TableCell>
                        <TableCell>{logsheet.azimuth}</TableCell>
                        <TableCell>{logsheet.notes}</TableCell>
                        <TableCell>{logsheet.site_id}</TableCell>
                        <TableCell>{logsheet.antenna_id}</TableCell>
                        <TableCell>{logsheet.receiver_id}</TableCell>
                    </TableRow>
                    );
                }
            )
        );
    }

                    /*<li key={logsheet.id}>
                        {logsheet.date} {logsheet.heightNorthMeters} {logsheet.heightWestMeters} {logsheet.heightSouthMeters} {logsheet.heightEastMeters} {logsheet.timeStart} {logsheet.timeEnd} {logsheet.failureTime} {logsheet.azimuth} {logsheet.notes} {logsheet.site_id} {logsheet.antenna_id} {logsheet.receiver_id}
                    </li>*/

    render() {
        return (
            <div>
                <Grid container centered='true' align='center'>
                    <Grid item align='center' xs={10} >
                        <Paper style={{maxHeight:500, height:'auto', overflow:'auto', width:'95%', textAlign:'center', marginTop:0, flexGrow:1, overflowX:'auto'}} center='true'>
                                <Table style={{width:'100%'}} >
                                    <TableHead>
                                        <TableRow >
                                            <TableCell>name</TableCell>
                                            <TableCell>date</TableCell>
                                            <TableCell>heightNorthMeters</TableCell>
                                            <TableCell>heightWestMeters</TableCell>
                                            <TableCell>heightSouthMeters</TableCell>
                                            <TableCell>heightEastMeters</TableCell>
                                            <TableCell>timeStart</TableCell>
                                            <TableCell>timeEnd</TableCell>
                                            <TableCell>failureTime</TableCell>
                                            <TableCell>azimuth</TableCell>
                                            <TableCell>notes</TableCell>
                                            <TableCell>site_id</TableCell>
                                            <TableCell>antenna_id</TableCell>
                                            <TableCell>receiver_id</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.renderList()}
                                    </TableBody>
                                </Table>
                        </Paper>
                    </Grid>
                    <Button variant="fab" color="primary" aria-label="add" style={{position: 'absolute',bottom:10 }} onClick={this.handleOpen}>
                        <AddIcon />
                    </Button>
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                        <div>
                        <CampLogSheetForm/>
                        </div>
                    </Modal>
                </Grid>
            </div>
        );
    }
}

export default graphql(campaignQuery)(CampLogsheetList)