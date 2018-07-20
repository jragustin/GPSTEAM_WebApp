import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import L from 'leaflet'
import SearchIcon from 'material-ui-icons/Search';
import LayersIcon from 'material-ui-icons/Layers';
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox';
import { FormControl,
    FormGroup,
    FormControlLabel,
} from 'material-ui/Form';

import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet.smooth_marker_bouncing'
import 'leaflet-minimap/dist/Control.MiniMap.min.js'
import 'leaflet-minimap/dist/Control.MiniMap.min.css'
import omnivore from 'leaflet-omnivore'
import Control from 'react-leaflet-control'
import * as mapActions from './mapActions'


let campaignIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'cyan',
    shape: 'square',
    prefix: 'fa',
    name,
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

let continuousIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'pink',
    shape: 'square',
    prefix: 'fa',
    name,
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

class PhMap extends Component {
    constructor() {
        super();
        this.state = {
            showSettings: false,
            maxZoom: 18,
            minZoom: 6,
            mapIsSet: false,
            clusterIsSet: false,
            maxBounds: new L.LatLngBounds([2.6138389710984824, 103.38134765625001], [21.555284406923192, 145.56884765625003]),
            markersCamp: null,
            markersCont: null,
        };
    }

    handleMarkerClick = (marker) => {
        this.props.openDrawer()
        this.props.setSelectedSite(marker.options.icon.options.name)
        window.rvList.recomputeRowHeights()
    }

    handleChange = name => (event, checked) => {
        this.props[name]()
        this.setClusterIsSetToFalse()

        if(name === 'toggleShowCampaignSites' || name === 'toggleShowContinuousSites') {
            window.rvList.recomputeRowHeights()
        }

    };
    
    componentDidUpdate(prevProps, prevState) {
        const { showFaultLines } = this.props

        if(prevProps.showFaultLines !== showFaultLines) {
            this.setUpFaults()
        }

        if(prevProps.selectedSite !== this.props.selectedSite) {
            window.map.leafletElement.invalidateSize()
            let marker = window.mapMarkers[this.props.selectedSite]

            window.cluster.leafletElement.zoomToShowLayer(marker, () => {

                marker.setBouncingOptions({
                    bounceHeight: 10,
                    bounceSpeed: 54,
                    exclusive: true,
                    elastic: false
                })
        
                if(!marker.isBouncing()) {
                    marker.bounce()
                }
            })
        }

    }

    setUpFaults() {
        const { showFaultLines } = this.props
        if(showFaultLines) {
            window.faultline.addTo(window.map.leafletElement)
        } else {
            window.faultline.removeFrom(window.map.leafletElement)
        }
    }

    componentDidMount() {

        const markers = this.props.sites.filter(s => {
            return s.latitude && s.surveyType
        }).map(s => {
            return {
                id: s.id,
                name: s.name,
                position: [s.latitude, s.longitude],
                surveyType: s.surveyType.type,
                options: {
                    icon: s.surveyType.type === 'campaign' ? campaignIcon(s.name) : continuousIcon(s.name),
                    riseOnHover: true,
                    interactive: true
                }
            }
        })

        const markersCamp = markers.filter(m => {
            return m.surveyType === 'campaign'
        })

        const markersCont = markers.filter(m => {
            return m.surveyType === 'continuous'
        })
        this.setUpFaults()
        this.setState({ mapIsSet: true, markersCamp, markersCont })
            
    }

    setClusterIsSetToFalse() {
        this.setState({clusterIsSet: false})
    }
    
    render() {
        const { maxZoom, minZoom, maxBounds, mapIsSet, clusterIsSet, showSettings, markersCont, markersCamp } = this.state
        const {showCampaignSites, showContinuousSites, showFaultLines, position, zoom } = this.props

        let newMarkers = []
        if(window.map) {
            let camp, cont
            if(showCampaignSites) {
                camp = markersCamp
            } else {
                camp = []
            }

            if(showContinuousSites) {
                cont = markersCont
            } else {
                cont = []
            }

            if(camp !== null){
                newMarkers = camp.concat(cont)
            }
        }

        return (
            <Map center={position} 
                zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} zoomSnap style={{ height: '100%' }}
                maxBounds={maxBounds} zoomControl={false} ref={(map) => {
                    window.map = map 
                    if(map && !mapIsSet) {
                        L.control.zoom({
                            position: 'topright'
                        }).addTo(map.leafletElement)

                        let layer = L.geoJSON(null, { style: function(feature) {
                            return { color: '#FF0000', weight: 0.8 };
                        } })

                        map.leafletElement.on('zoomend', () => {
                                map.leafletElement.invalidateSize()
                                this.props.setZoom(map.leafletElement.getZoom())
                            }
                        )

                        map.leafletElement.on('moveend', () => {
                                setTimeout( ()=> { 
                                    try {
                                        this.props.setPosition(map.leafletElement.getCenter())
                                    } catch (error) {
                                        // console.log('Disregard this error: ',error)
                                    }
                                }, 2000)
                            }
                        )

                        map.leafletElement.on('resize', () => {
                            map.leafletElement.invalidateSize()
                        })
                        
                        let osm2 = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
                            {minZoom: 0, maxZoom: 13, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
                        window.minimap = new L.Control.MiniMap(osm2, { toggleDisplay: true, minimized: true, position: 'topleft' })
                            .addTo(window.map.leafletElement)

                        window.faultline = omnivore.kml('http://localhost:4000/faultline/AF_2017.kml', null, layer)
                        window.faultline.addTo(map.leafletElement)
                    }
                }}>

                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

                <Control position="topright" >
                    <div className='leaflet-bar' style={{visibility: this.props.drawerOpen ? 'hidden' : 'visible' }}>
                        <a className='leaflet-control-custom' onClick={(e) => {
                            e.preventDefault()
                            this.props.openDrawer()

                        }} role='button' href=''>
                            <SearchIcon />
                        </a>
                    </div>
                </Control>

                <Control position="bottomright" >
                    <div className='leaflet-bar'
                        onMouseOver={()=> this.setState({ showSettings: true })}
                        onMouseOut={()=> this.setState({ showSettings: false })}>
                        <a style={{display: !showSettings ? 'block' : 'none' }} 
                            className='leaflet-control-custom' onClick={(e) => {
                                e.preventDefault()
                            }} role='button' href=''>
                                <LayersIcon />
                        </a>
                        <div style={{display: showSettings ? 'block' : 'none'}}>
                            <Paper style={{ padding: '10px' }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={showCampaignSites}
                                            onChange={ this.handleChange('toggleShowCampaignSites')} />} label="Campaign"/>
                                        <FormControlLabel control={<Checkbox checked={showContinuousSites}
                                            onChange={this.handleChange('toggleShowContinuousSites')} />} label="Continuous"/>
                                        <FormControlLabel control={<Checkbox checked={showFaultLines}
                                            onChange={this.handleChange('toggleShowFaultLines')} />} label="Faultline"/>
                                    </FormGroup>
                                </FormControl>
                            </Paper>
                        </div>
                    </div>
                </Control>

                <MarkerClusterGroup 
                    markers={newMarkers}
                    onMarkerClick={this.handleMarkerClick}
                    ref={(cluster) => {
                        window.cluster = cluster

                        if(!clusterIsSet && cluster) {
                            window.mapMarkers = []
                            window.cluster.leafletElement.getLayers().map(c => {
                                return window.mapMarkers[c.options.icon.options.name] = c
                            })
                            this.setState({ clusterIsSet: true })
                        }
                
                }}
                
                />

            </Map>
        )
    }
}

const mapStateToProps = (state) => {
    return {...state.map, ...state.router.location}
}

export default connect(mapStateToProps, mapActions)(PhMap)