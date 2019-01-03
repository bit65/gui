import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ReactiveComponent, MultiDataList} from '@appbaseio/reactivesearch';

import './main.page.scss';
import { SearchResult } from './search-result';
import {LibraryResult, FileResult, ModuleResult, AssetResult, StringResult} from './result.type'
import {elasticuri} from './config'

class SidePanelWrapper extends Component {

    render() {

        return (
            <div id="mainresults">
                <AssetResult {...this.props}/>
                <LibraryResult {...this.props}/>
                <ModuleResult {...this.props}/>
                <FileResult {...this.props}/>
                <StringResult {...this.props}/>
            </div>
        )
    }
}

export class MainPage extends Component {
    
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ReactiveBase app="index_main" url={elasticuri}>
                <section className="main">
                    <h2>

                        Android <span>Library</span> Search
                    </h2>

                    <h3>
                        Search Anything
                    </h3>
                        
                        <DataSearch
                            innerClass={{
                                title: 'text-title',
                                input: 'text-input',
                                list: 'text-list'
                            }}
                            componentId="SearchModule"
                            fieldWeights={[10,5,1]}
                            fuzziness={0}
                            dataField={["LIBRARY_NAMES","MODULE_NAME", "FILE_NAME", "STRING_DATA"]}
                        />

                        <MultiDataList
                            className="filter-boxes"
                            showSearch={false}
							componentId="TypeFilter"
							dataField="TYPE.keyword"
							data={[
                                { label: 'Apps', value: 'ASSET' },
                                { label: 'Libraries', value: 'LIBRARY' },
                                { label: 'Files', value: 'FILE' },
								{ label: 'Modules', value: 'MODULE' },
                                { label: 'Strings', value: 'STRING' },
                            ]}
                            defaultValue={["Libraries", "Files", "Apps"]}
						/>
                        {/* <SelectedFilters /> */}
                        
                        <ReactiveComponent
                        componentId="SidePanel"
                        react={{
                            "and": ["SearchModule","TypeFilter"]
                        }}
                        defaultQuery={() => ({
                            aggs: {
                                assets: {
                                    terms: {
                                        field: 'ASSET.keyword',
                                        size:500
                                        
                                    }
                                },
                                libraries: {
                                    terms: {
                                        field: 'LIBRARY_NAMES.keyword',
                                        size:500
                                        
                                    }
                                },
                                modules: {
                                    terms: {
                                        field: 'MODULE_NAME.keyword',
                                        size:500
                                    }
                                },
                                files: {
                                    terms: {
                                        field: 'FILE_NAME.keyword',
                                        size:500
                                    }
                                },
                                strings: {
                                    terms: {
                                        field: 'STRING_DATA.keyword',
                                        size:500
                                    }
                                }
                            }
                        })}
                    >
                        <SidePanelWrapper />
                    </ReactiveComponent>

                        {/* <div className="search-results">
                            <ReactiveList
                                componentId="SearchList"
                                dataField={["LIBRARY_NAMES","FILE_NAME","MODULE_NAME"]}
                                react={{
                                    "and": ["SearchModule"]
                                }}
                                pagination={true}
                                
                                renderData={(result) => {result.key=result._id; return React.cloneElement(<SearchResult />, result)}}
                            />
                        </div> */}



                        
                </section>
            </ReactiveBase>
        );
    }
}



