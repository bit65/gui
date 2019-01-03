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

class SOFilesRender extends Component {

    render() {
        let files = this.props.hits;

        return (
            files.map(f=>(
                <div>
                    <h1>{f._source["ELF_ELF-FILENAME"]}</h1>
                    
                    
                    <p>
                    {f._source["ELF_DEPENDENCIES"].join(' | ')}
                    </p>

                    <b>Flags</b>
                    <p>
                        ELF_FORTIFY_SOURCE => {f._source["ELF_FORTIFY_SOURCE"] ? "TRUE": "FALSE"} <br />
                        ELF_PIE => {f._source["ELF_PIE"] ? "TRUE": "FALSE"} <br />
                        ELF_RELRO => {f._source["ELF_RELRO"] ? "TRUE": "FALSE"}
                        ELF_SANITIZE_ADDR => {f._source["ELF_SANITIZE_ADDR"] ? "TRUE": "FALSE"} <br />
                        ELF_STACK_CANARIES => {f._source["ELF_STACK_CANARIES"] ? "TRUE": "FALSE"} <br />
                        ELF_STRIPPED => {f._source["ELF_STRIPPED"] ? "TRUE": "FALSE"} <br />
                    </p>
                    
                </div>
            ))
        )
    }
}

class MetaRender extends Component {

    render() {
        let meta = this.props.hits;

        return (
            <div>
                <h1>META-DATA</h1>
                {meta.map(f=>(
                    <div>
                        <p>
                            <b>{f._source["META_NAME"]}</b> =>
                            {f._source["META_VALUE"]}
                        </p>                        
                    </div>
                ))}
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
                        componentId="MetaData"
                        
                        defaultQuery={() => ({
                            size: 10000,
                            query: [
                                {"term": {"ASSET.keyword": this.apk}},
                                {"term": {"TYPE.keyword": "META"}},
                            ]
                        })}
                    >
                        <MetaRender />
                    </ReactiveComponent> 

                    <ReactiveComponent
                        componentId="SOFiles"
                        
                        defaultQuery={() => ({
                            size: 10000,
                            query: [
                                {"term": {"ASSET.keyword": this.apk}},
                                {"term": {"TYPE.keyword": "ELF"}},
                                {
                                    "exists" : { "field" : "ELF_STRIPPED" }
                                }
                            ]
                        })}
                    >
                        <SOFilesRender />
                    </ReactiveComponent> 

                       

                    <ReactiveComponent
                        componentId="SidePanel"
                        
                        defaultQuery={() => ({
                            query: {
                                term: {ASSET: this.apk}
                            },
                            size: 0,
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



