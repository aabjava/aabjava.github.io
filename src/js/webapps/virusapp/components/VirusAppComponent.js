/**
 * Created by Monster on 2020-03-16.
 */


import React from "react";
import * as Svg from "../svgs/svgs";
import {connect} from "react-redux";

import * as Actions from "../actions/virusActions"
import Chart from "./ChartComponent"
import Papa from "papaparse";

class VirusAppComponent extends React.PureComponent{

    constructor(props){
        super(props);

    }


    componentDidMount(){

     //   this.props.initAppState('PT');

       // this.props.dispatch(Actions.getRawJHData.trigger());

        const current = this;
        Papa.parse("/data/time_series_19-covid-Confirmed.csv", {
            download: true,
            dynamicTyping:true,

            complete: function(results) {
                console.log(results);
                current.props.dispatch(Actions.processRawData.trigger({records:results}));
            }
        });

    }





    render(){

       return <div className="appWrapper">
           <div className="madeBy">
               by André Bastos

           </div>

           <div className="title">
               <div className="logoBlock">
                   {Svg.virusLogo}
               </div>
               <div className="textBlock">
                   <h2>Dados e regressão (previsão baseado em dados anteriores) de propagação do virus sars-cov-2 em varios paises.</h2>


               </div>


           </div>

                    <Chart/>




                </div>

    }

}



const mapStateToProps = state => {
    //in this case we wan the props to be the same as the state including names

    return {




    }
};


const mapDispatchToProps = dispatch => {

    return {
        dispatch,






    }
};


const VirusApp =connect(mapStateToProps,mapDispatchToProps)(VirusAppComponent);


export default VirusApp;