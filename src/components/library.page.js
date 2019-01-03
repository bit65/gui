import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ReactiveList, ReactiveComponent} from '@appbaseio/reactivesearch';

// import './asset.page.scss';
import { SearchResult } from './search-result';
import {LibraryResult, AssetResult} from './result.type';
import {elasticuri} from './config'

export class LibraryPage extends Component {
    
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { results: [] };
        this.lib = props.match.params.lib
    }

    render() {
        return (
            <ReactiveBase app="index_main" url={elasticuri}>
                <section className="main">
                    <h2>
                        Android <span>Library</span> Search
                    </h2>

                    <h3>
                        {this.lib}
                    </h3>      

                    <ReactiveComponent
                        componentId="LibraryResults"
                        defaultQuery={() => ({
                            query: {
                                term: {"LIBRARY_NAMES.keyword": this.lib}
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



