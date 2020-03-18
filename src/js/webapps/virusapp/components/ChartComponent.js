/**
 * Created by Monster on 2020-03-16.
 */


import React from "react";

import {connect} from "react-redux";

import * as Actions from "../actions/virusActions"

import ChartJs from "chart.js";
import Hammer from "hammerjs";
import zoom from 'chartjs-plugin-zoom'
import moment from "moment";


import regression from "regression";
import Select from 'react-select'

import ToggleSwitch from "../../../common/components/buttons/ToogleSwitch";

const regressionTypes = [{label:'Linear',value:"linear"},{label:'Exponencial',value:'exponential'},{label:'Quadrática',value:'polynomial'}];

const plotYTypes = [{label:' Y Linear',value:'linear'},{label:'Y Logaritimica',value:"logarithmic"}];


const graphTypes = [{label:'Factor de Crescimento',value:'growthFactorGraph'},{label:'Infecções Totais',value:"totalGraph"},{label:'Novas Infecções',value:"newGraph"}];


class ChartComponent extends React.PureComponent{

    constructor(props){
        super(props);
        this.chartRef = React.createRef();
        this.chartObject = null;

        this.state = {
            plotYType:plotYTypes[0].value,
            growthFactorGraph:graphTypes[0].value,

        };

        this.currentRegressionFormula = null
        this.formulaRef = React.createRef();


        /*   this.renderChart=this.renderChart.bind(this);*/
    }


    componentDidMount(){



    }

    componentDidUpdate(oldProps,oldState){

        if(oldProps.initRecords === false && this.props.initRecords === true ){
            this.renderChart()
        }

        if(oldProps.simulation !== this.props.simulation ){
            this.renderChart()
        }

        if(oldProps.primaryCountry || this.props.primaryCountry || oldProps.secondaryCountry !== this.props.secondaryCountry ){
            this.renderChart()
        }
    }

    handleSelect(type,value){

        if(value !== null){
            this.props.changeSimulation(type,value);
        }else{
            this.props.changeSimulation(type,null);
        }
    }

    renderFormulaInject(){

        if(this.formulaRef.current !== null){
            console.debug("Formula current = ",this.formulaRef.current)
            this.formulaRef.current.innerHTML=""+this.currentRegressionFormula.formulaString +" r2 (coeficiente de determinação) = "+(this.currentRegressionFormula.r2*100)
        }
       {/* <div className="formulaBlock" >
            <span>Formula {regressionTypes[this.props.useRegressionTypeIndex].label}</span>
            <span>{this.currentRegressionFormula !== null?this.currentRegressionFormula.formulaString+" r2 (coeficiente de determinação) = "+this.currentRegressionFormula.r2*100+" %"  :null}  </span>

        </div>*/}
    }

    renderChart(){

        console.debug("Render chart now..")
    //build data sets
    const {primaryCountry,secondaryCountry,rawData,availableDates,simulate,useRegressionTypeIndex,simulationAddDays,useModelFromOtherCountry,
        fromDayWithGreaterThan,onlyLastXDays,lastXDays,graphType} = this.props;
    let use2Countries = false;

    if(primaryCountry!== null && secondaryCountry!==null){
        use2Countries = true;
    }
    //get the max number of days
    let primaryCountryDays = [];
        let primaryCountryDataSet = [];

    let secondaryCountryDays = [];
        let secondaryCountryDataSet = [];


      let text = graphTypes[0].label;
      switch (graphType){
          case graphTypes[1].value:text = graphTypes[1].label;break;
          case graphTypes[2].value:text = graphTypes[2].label;break;
      }
      text=" "+text;

    if(primaryCountry !== null){
        const idx = primaryCountry.index;
        const countryData = rawData[idx];
        //get first case
        let countDateFrom = 1;
        for(let d = countDateFrom;d<countryData.length;d++){
            const value = countryData[d];

            if(value > 0){
                countDateFrom = d;
                break
            }
        }
        console.debug("Count date from index = ",countDateFrom)
        primaryCountryDataSet = {data:[],fill:false,backgroundColor:"#88bae6e0",borderColor:"#c7af53",label:countryData[0]+text};
        //build date array
        console.debug("Data set = ",countryData)
        for(let d = countDateFrom;d<availableDates.length;d++){
            const value = availableDates[d].date;


            primaryCountryDays.push(value);
            const infected = countryData[d+1];
            if(graphType === graphTypes[0].value){
                //do we have a previus value
                    const lastDay = countryData[d]-countryData[d-1];
                    const current = infected - countryData[d];

                    if(lastDay === 0||isNaN(lastDay) ){
                        primaryCountryDataSet.data.push(1);
                    }else{
                        const grothFactor = current/lastDay;
                        console.debug(`last day = ${lastDay} current day = ${current} ratio = ${grothFactor}`)
                        //normalize this cant be real, accounting changes or error in data
                        if(grothFactor>10){
                            primaryCountryDataSet.data.push(1);
                        }else{
                            primaryCountryDataSet.data.push(grothFactor);
                        }

                    }
            }else if(graphType === graphTypes[1].value){
                primaryCountryDataSet.data.push(infected);
            }else if(graphType === graphTypes[2].value){

                let current = infected - countryData[d];
                current = current>0?current:0;
            //    console.debug("new infections = ",current)
                primaryCountryDataSet.data.push(current);
            }

        }
        //build data set
    }

    if(onlyLastXDays){
        //do he have more that x
        if(primaryCountry !== null && primaryCountryDataSet.data.length>lastXDays){
            //ok remove from index 0 to x = length-lastXDays
            const removeX = primaryCountryDataSet.data.length-lastXDays;
            console.debug("remove x from start array  ",removeX)
            for(let d = 0;d<removeX;d++){
                primaryCountryDataSet.data[d]=null;
            }

            //remove on the labels as well

        }
    }

        if(secondaryCountry !== null){
            const idx = secondaryCountry.index;
            const countryData = rawData[idx];
            //get first case
            let countDateFrom = 0;
            for(let d = 1;d<countryData.length;d++){
                const value = countryData[d];
                if(value > 0){
                    countDateFrom = d;
                    break
                }
            }
          // secondaryCountryDataSet = {data:[],fill:false,backgroundColor:"#88bae6e0",borderColor:"#e46e94",label:countryData[0]+' Total Infectados '};
            secondaryCountryDataSet = {data:[],fill:false,backgroundColor:"#88bae6e0",borderColor:"#e46e94",label:countryData[0]+text};
            //build date array
            for(let d = countDateFrom;d<availableDates.length;d++){
                const value = availableDates[d].date;
                console.debug("Value date = ",value)

                secondaryCountryDays.push(value);
                const infected = countryData[d+1];
                if(graphType === graphTypes[0].value){
                    //do we have a previus value


                    const lastDay = countryData[d]-countryData[d-1];
                    const current = infected - countryData[d];

                    if(lastDay === 0||isNaN(lastDay) ){
                        secondaryCountryDataSet.data.push(1);
                    }else{
                        const grothFactor = current/lastDay;
                        console.debug(`last day = ${lastDay} current day = ${current} ratio = ${grothFactor}`)
                        //normalize this cant be real, accounting changes or error in data
                        if(grothFactor>10){
                            secondaryCountryDataSet.data.push(1);
                        }else{
                            secondaryCountryDataSet.data.push(grothFactor);
                        }

                    }
                }else if(graphType === graphTypes[1].value){
                    secondaryCountryDataSet.data.push(infected);
                }else if(graphType === graphTypes[2].value){

                    let current = infected - countryData[d];
                    current = current>0?current:0;
                    console.debug("new infections = ",current)
                    secondaryCountryDataSet.data.push(current);
                }

            }
        }

        if(onlyLastXDays){
            //do he have more that x
            if(secondaryCountry !== null && secondaryCountryDataSet.data.length>lastXDays){
                //ok remove from index 0 to x = length-lastXDays
                const removeX = secondaryCountryDataSet.data.length-lastXDays;
                console.debug("remove x from start array  ",removeX)
                for(let d = 0;d<removeX;d++){
                    secondaryCountryDataSet.data[d]=null;
                }

                //remove on the labels as well

            }
        }

        //ok if the 2 check witch one if bigger and make a new data array a final one
        let finalLabelArray = [];
        if(!use2Countries){
            if(primaryCountry !== null){
                finalLabelArray = primaryCountryDays;
            }else if(secondaryCountry !== null){
                finalLabelArray = secondaryCountryDays;
            }
        }else{
            //make new one based on days
            const maxDays = Math.max(primaryCountryDays.length,secondaryCountryDays.length);
            console.debug("Max days = ",maxDays)
            for(let d = 1;d<=maxDays;d++){

                finalLabelArray.push("dia "+d);
            }
        }

        let datasets = [];

       if(primaryCountry !== null){
            datasets.push(primaryCountryDataSet);
       }
       if(secondaryCountry !== null){
           datasets.push(secondaryCountryDataSet);
       }


    let labels = finalLabelArray;


    let graphInfo = {};

    graphInfo.labels = finalLabelArray;
    graphInfo.datasets = datasets;


    if(simulate &&  primaryCountry!==null){

        const idx = primaryCountry.index;
        const countryData = rawData[idx];

        let regressionTrainingDataSet = [];

        if(useModelFromOtherCountry!== null){
            const otherCountryData = rawData[useModelFromOtherCountry.index];
          //  console.debug("other country data ",otherCountryData)

            let index = 1;
            for(let d = 1;d<otherCountryData.length;d++){
                const value = otherCountryData[d];
                if(value>=fromDayWithGreaterThan){

                    regressionTrainingDataSet.push([index,value]);
                    index++;
                }


            }
           /* regressionTrainingDataSet=otherCountryData.map((value,index)=>{
                return [(index+1),value]
            });*/
        }else{
            regressionTrainingDataSet=primaryCountryDataSet.data.map((value,index)=>{
                return [(index+1),value]
            });
        }


        const regressionType = regressionTypes[useRegressionTypeIndex].value;
        let config = {};
        if(regressionType === 'polynomial'){
            config.order = 2
        }

        console.debug("Regression type = ",regressionType)
        console.debug("Primary data set = ",primaryCountryDataSet)
        console.debug("Regression data = ",regressionTrainingDataSet)
        const simulatedData = regression[regressionType](regressionTrainingDataSet,config)
        console.debug("Simulated data = ",simulatedData)
        //add data set
        this.currentRegressionFormula = {formulaString:simulatedData.string,equation:simulatedData.equation,"r2":simulatedData.r2};
        this.renderFormulaInject();
      /*  this.setState({
            currentRegressionFormula: {formulaString:simulatedData.string,equation:simulatedData.equation}
        });*/
        //add days


      //  let firstDay = new Date(totalRecordsCompileDaysOrder[0]);
        const addDays =simulationAddDays;
        if(!use2Countries){

            const lastDay = new Date(finalLabelArray[finalLabelArray.length-1]);

            console.debug("Last day = ",lastDay)
            for(let d = 1;d<=addDays;d++){
                let newDate = new Date(lastDay);
                newDate.setDate(newDate.getDate()+d);

                finalLabelArray.push(`${newDate.getUTCFullYear()}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()} (+${d})`);
            }
        }else{
            //make number only
            for(let d = 0;d<finalLabelArray.length;d++){
                finalLabelArray[d]=`${d+1}`
            }
            for(let d = finalLabelArray.length-1;d<=addDays;d++){
                finalLabelArray.push(`${d}`);
            }
        }

        let newDataSet = [];

        finalLabelArray.forEach((value,index)=>{

            newDataSet.push(simulatedData.predict(index+1)[1]);
        });
        console.debug("New data set predic = ",newDataSet)
       /* console.debug("First day = ",firstDay)
        const alreadyPresentDays = totalRecordsCompileDaysOrder.length;
        const totalDays = alreadyPresentDays+this.state.simulation.addDays;

        let newLabels = [];
        let newDataSet = [];
        for(let d = 1;d<=totalDays;d++){
            let newDate = new Date(firstDay);
            newDate.setDate(newDate.getDate()+d);
            newLabels.push(`${newDate.getUTCFullYear()}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()}`);


        }*/

        //generate more points for regression
        graphInfo.datasets.push({data:newDataSet,fill:false,borderColor:"#2f5fe4",label:countryData[0]+' Regressão '+text});
        graphInfo.labels = finalLabelArray;



    }


    console.debug("Data = ",graphInfo);

    if(this.chartObject!==null){
        this.chartObject.destroy();
    }


    this.chartObject = new ChartJs(this.chartRef.current.getContext('2d'), {
        type: 'line',

        data:{...graphInfo},
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    type:this.state.plotYType,

                    ticks: {

                        beginAtZero: true,
                        max: graphType===graphTypes[1]?10:undefined,
                        min: 0,

                    }
                }]
            },
            plugins: {
            zoom: {
                pan: {
                    enabled: true,
                        mode: 'xy' // is panning about the y axis neccessary for bar charts?
                },
                zoom: {
                    enabled: true,
                        mode: 'x',
                        sensitivity: 3
                }
            }
        }
        },

    });
}





    render(){

        const {primaryCountry,secondaryCountry,availableCountries,
            simulate,useRegressionTypeIndex,simulationAddDays,useModelFromOtherCountry,
            fromDayWithGreaterThan,
            onlyLastXDays,lastXDays,graphType} = this.props;

        console.debug("Primary country = ",primaryCountry)
       return <div className="chartWrapper">


           <div className="inputsWrapper">


               <div className="inputGroup">
                   <label>Tipo de dados</label>
                   <select className="select" name="regressionType" value={graphType} onChange={(evt)=>{

                       this.props.changeSimulation('graphType',evt.currentTarget.value)

                   }}>
                       {graphTypes.map((type,index)=>{
                           return <option key={index} value={type.value}>{type.label}</option>
                       })}
                   </select>
               </div>
               <div className="inputGroup">

                   <label>Pais 1</label>
                   <Select
                       isClearable
                      classNamePrefix="selectCountryPopup"
                       value={primaryCountry}
                       onChange={(newValue)=>{  this.handleSelect('primaryCountry',newValue);  console.debug("CreateNew value select = ",newValue)  }}
                       options={Object.values(availableCountries)}


                   />

               </div>

               <div className="inputGroup">

                   <label>Pais 2</label>
                   <Select
                       isClearable
                       classNamePrefix="selectCountryPopup"
                       value={secondaryCountry}
                       onChange={(newValue)=>{  this.handleSelect('secondaryCountry',newValue);  console.debug("CreateNew value select = ",newValue)  }}
                       options={Object.values(availableCountries)}


                   />

               </div>
               <div className="inputGroup toggle">
                   <label> ver só ultimos x dias</label>
                   <ToggleSwitch disabled={false} checked={onlyLastXDays} onChangeToggle={()=>{
                       this.props.changeSimulation('onlyLastXDays',!onlyLastXDays)
                   }}/>
               </div>
               <div className="inputGroup">
                   <label>ultimos x dias</label>
                   <input type="number" max={120} min={2} value={lastXDays} disabled={!onlyLastXDays} onChange={(evt)=>{

                       this.props.changeSimulation('lastXDays',   Number.parseInt(evt.currentTarget.value));
                   }}/>
               </div>

           </div>

           <div className="simulateWrapper">
               <div className="header">
                   <div className="block">
                   <div className="inputGroup">
                       <label>Simular</label>
                       <ToggleSwitch disabled={false} checked={simulate} onChangeToggle={()=>{
                           this.props.changeSimulation('simulate',!simulate)
                       }}/>
                   </div>
                   </div>

               </div>
               <div className="body">
                   <div className="block">
                       <div className="inputGroup">
                           <label>Tipo de Regressão</label>
                           <select className="select" name="regressionType" value={useRegressionTypeIndex} onChange={(evt)=>{
                               console.debug("Event ",evt)
                               this.props.changeSimulation('useRegressionTypeIndex',Number.parseInt(evt.currentTarget.value))

                           }}>
                               {regressionTypes.map((type,index)=>{
                                   return <option key={index} value={index}>{type.label}</option>
                               })}
                           </select>
                       </div>
                       <div className="inputGroup">
                           <label>Eixo Y tipo escala</label>
                           <select className="select" name="regressionType" value={this.state.plotYType} onChange={(evt)=>{
                               console.debug("Event ",evt)
                               this.setState({
                                   plotYType:evt.target.value
                               })

                           }}>
                               {plotYTypes.map((type,index)=>{
                                   return <option key={index} value={type.value}>{type.label}</option>
                               })}
                           </select>
                       </div>
                       <div className="inputGroup">

                           <label>Usar modelo de outro pais</label>
                           <Select
                               isClearable
                               classNamePrefix="selectCountryPopup"
                               value={useModelFromOtherCountry}
                               onChange={(newValue)=>{  this.handleSelect('useModelFromOtherCountry',newValue);  console.debug("CreateNew value select = ",newValue)  }}
                               options={Object.values(availableCountries)}


                           />

                       </div>
                       <div className="inputGroup">
                           <label>apartir do dia com >= casos</label>
                           <input type="number" max={5000} value={fromDayWithGreaterThan} onChange={(evt)=>{

                               this.props.changeSimulation('fromDayWithGreaterThan',   Number.parseInt(evt.currentTarget.value));
                           }}/>
                       </div>

                       <div className="inputGroup">
                           <label>Numero de dias previsão</label>
                           <input type="number" max={60} value={simulationAddDays} onChange={(evt)=>{

                               this.props.changeSimulation('simulationAddDays',   Number.parseInt(evt.currentTarget.value));
                           }}/>
                       </div>


                   </div>
                 <div className="block formula" ref={this.formulaRef}>



                   </div>


               </div>




           </div>

           <div className="chartHeader">


           </div>
                    <div className="chartDiv" >
                        <canvas ref={this.chartRef} id="chart" height={300} />

                    </div>
           <div className="otherInfo">
               <h4>Para mais informação sobre a propagação e porque são necessárias medidas de contenção visite <a target="_blank" href="https://medium.com/@rafael.remondes/coronav%C3%ADrus-porque-%C3%A9-que-se-deve-agir-imediatamente-4674311fb09c">(Corona vírus porque é necessário agir imediatamente )</a> para uma excelente analise sobre o o assunto.</h4>
               <h6>Todos os dados usados são dados publicos a altura da publicação , retirados de <a target="_blank" href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE</a> </h6>

           </div>




                </div>

    }

}



const mapStateToProps = state => {
    //in this case we wan the props to be the same as the state including names

    return {
        ...state.records,
        ...state.simulation



    }
};


const mapDispatchToProps = dispatch => {

    return {
        dispatch,

        changeSimulation:(name,value)=>{
            dispatch(Actions.changeSimulation({name,value}));

        }

    }
};


const Chart =connect(mapStateToProps,mapDispatchToProps)(ChartComponent);


export default Chart;

