import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ReactiveList, ReactiveComponent} from '@appbaseio/reactivesearch';

// import './asset.page.scss';
import { SearchResult } from './search-result';
import {LibraryResult, AssetResult} from './result.type';
import {elasticuri} from './config'

export class FilePage extends Component {
    
    constructor(props) {
        super(props);
        this.file = props.match.params.file;
    }

    render() {
        return (
            <ReactiveBase app="index_main" url={elasticuri}>
                <section className="main">
                    <h2>
                        Android <span>Library</span> Search
                    </h2>

                    <h3>
                        {this.file}
                    </h3>      

                    <ReactiveComponent
                        componentId="FileResults"
                        defaultQuery={() => ({
                            query: {
                                term: {"FILE_NAME.keyword": this.file}
                            },
                            aggs: {
                                assets: {
                                    terms: {
                                        field: 'ASSET.keyword'
                                    }
                                }
                            }
                        })}
                    >
                        <AssetResult />
                    </ReactiveComponent>                     
                             
                </section>
            </ReactiveBase>
        );
    }
}



