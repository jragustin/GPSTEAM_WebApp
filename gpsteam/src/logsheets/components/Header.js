import React, { Component } from 'react'
import {Tabs, Tab, Paper, Typography} from '@material-ui/core' 
import SwipeableViews from 'react-swipeable-views';
// import CampLogSheetForm from './CampLogSheetForm';
import CampLogsheetList from './CampLogsheetList';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


export default class Header extends Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value:index})
    };

    render() {
        // const { theme } = this.props;
        const { value } = this.state
        return (
            <div>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange = {this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        xs={12}
                    >
                    <Tab label="Campaign"/>
                    <Tab label="Continuous"/>
                    </Tabs>
                </Paper>
                    {/*axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                {value === 0 && <TabContainer><CampLogsheetList/></TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                </SwipeableViews>
            </div>
        )
    }
}
