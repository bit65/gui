import React from 'react';
import './search-result.scss';

export function SearchResult(props) {
    return (
        <div className="search-result">
            <h4>{props.title}</h4>

            <div className="attributes">
                <div className="attribute">
                    <div className="title"></div>
                    <div className="value"><a href={"/apk/" + props.ASSET}>{props.ASSET}</a></div>
                </div>

                <div className="attribute">
                    <div className="title">type:</div>
                    <div className="value">{props.TYPE.toLowerCase()}</div>
                </div>

                {Object.keys(props).filter(v=> v.startsWith(props.TYPE+"_")).map((k)=> 
                    <div className="attribute">
                        <div className="title">{k.replace(props.TYPE+"_","").toLowerCase()}</div>
                        {typeof props[k] == "string" || typeof props[k] == "number"? (
                            <div className="value">{props[k]}</div>
                        ): (
                            
                            <div className="value">{props[k].map(i=><li>{i}</li>)}</div>
                        )}
                    </div>
                )}
            </div>

            <div className="value-box">
                {props.value}
            </div>
        </div>
    );
}