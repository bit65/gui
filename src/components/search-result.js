import React from 'react';
import './search-result.scss';

export function SearchResult(props) {
    return (
        <div className="search-result">
            <h4>{props.title}</h4>

            <div class="attributes">
                <div class="attribute">
                    <div class="title">Type:</div>
                    <div class="value">{props.type}</div>
                </div>

                <div class="attribute">
                    <div class="title">Package:</div>
                    <div class="value">{props.package}</div>
                </div>

                <div class="attribute">
                    <div class="title">File:</div>
                    <div class="value">{props.file}</div>
                </div>
            </div>

            <div class="value-box">
                {props.value}
            </div>
        </div>
    );
}