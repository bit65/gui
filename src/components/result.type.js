import React, { Component } from 'react';


class GenericResult extends Component {
    getBuckets (key)
    {
        if (this.props.aggregations &&
            this.props.aggregations[key] &&
            this.props.aggregations[key].buckets.length)
        {
            return this.props.aggregations[key].buckets;
        }

        return [];
    }

    render() {
        let results = this.getBuckets(this.type);

        return (
            <div>
                {results.length > 0 && (
                    <span>
                        <b>{this.name}</b>
                        <ul>
                            {results.map(o=>(
                                <li><a href={this.link+o.key}>{o.key}</a></li>
                            ))}                
                        </ul>
                    </span>
                )}
            </div>
        )
    }
}


export class AssetResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "assets";
        this.name = "Apps";
        this.link = "/apk/";
    }
}

export class ModuleResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "modules";
        this.name = "Modules";
        this.link = "/module/";
    }
}

export class LibraryResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "libraries";
        this.name = "Libraries";
        this.link = "/lib/";
    }
}

export class ReceiverResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "receivers";
        this.name = "Receivers";
        this.link = "/receiver/";
    }
}

export class ServiceResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "services";
        this.name = "Services";
        this.link = "/service/";
    }
}

const dangerous = ["CAMERA", "ACCESS_COARSE_LOCATION"];

export class PermissionResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "permissions";
        this.name = "Permissions";
        this.link = "/permission/";
    }

    render() {
        let results = this.getBuckets(this.type);

        return (
            <div>
                {results.length > 0 && (
                    <span>
                        <b>{this.name}</b>
                        <ul>
                            {results.map(o=> {
                                
                                let title = "SAFE";
                                if (dangerous.includes(o.key)){
                                    title = "DANGER"
                                }

                                return <li>{title} ==> <a href={this.link+o.key}>{o.key}</a></li>
                            })}                
                        </ul>
                    </span>
                )}
            </div>
        )
    }
}

export class FileResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "files";
        this.name = "Files";
        this.link = "/file/";
    }
}

export class StringResult extends GenericResult {
    constructor(props) {
        super(props);
        this.type = "strings";
        this.name = "String";
        this.link = "/string/";
    }
}

// export class LibraryResult extends GenericResult {
//     render() {
//         let libraries = [];
        
//         if (this.props.aggregations &&
//             this.props.aggregations.libraries &&
//             this.props.aggregations.libraries.buckets.length)
//         {
//             libraries = this.props.aggregations.libraries.buckets;
//         }
    

//         return (
//             <div>
//                 {libraries.length > 0 && (
//                     <span>
//                         <b>Libraries</b>
//                         {libraries.map(o=>(
//                             <li><a href={'/lib/'+o.key}>{o.key}</a></li>
//                         ))}                
//                     </span>
//                 )}
//             </div>
//         )
//     }
// }