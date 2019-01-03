import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ReactiveList, ReactiveComponent} from '@appbaseio/reactivesearch';
import {LibraryResult, FileResult, PermissionResult, ServiceResult, ReceiverResult} from './result.type'
import {elasticuri} from './config'

// import './asset.page.scss';
import { SearchResult } from './search-result';

class AssetRender extends Component {

    render() {
        return (
            <div>
                <PermissionResult {...this.props}/>
                <ServiceResult {...this.props}/>
                <ReceiverResult {...this.props}/>
                <LibraryResult {...this.props}/>
                <FileResult {...this.props}/>
                
            </div>
        )
    }
}

export class AssetPage extends Component {
    
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { results: [] };
        this.apk = props.match.params.apk
    }

    render() {
        return (
            <ReactiveBase app="index_main" url={elasticuri}>
                <section className="main">
                    <h2>
                        Android <span>Library</span> Search
                    </h2>

                    <h3>
                        {this.apk}
                    </h3>
                    
                    <ReactiveComponent
                        componentId="SidePanel"
                        
                        defaultQuery={() => ({
                            query: {
                                term: {ASSET: this.apk}
                            },
                            aggs: {
                                permissions: {
                                    terms: {
                                        field: 'PERMISSION_NAME.keyword',
                                        size:5000
                                    }
                                },

                                libraries: {
                                    terms: {
                                        field: 'LIBRARY_NAMES.keyword',
                                        size:5000
                                    }
                                },
                                files: {
                                    terms: {
                                        field: 'FILE_NAME.keyword',
                                        size:5000
                                    }
                                },
                                receivers: {
                                    terms: {
                                        field: 'RECEIVER_NAME.keyword',
                                        size:5000
                                    }
                                },
                                services: {
                                    terms: {
                                        field: 'SERVICE_NAME.keyword',
                                        size:5000
                                    }
                                }
                            }
                        })}
                    >
                        <AssetRender />
                    </ReactiveComponent>                     
                </section>
            </ReactiveBase>
        );
    }
}



