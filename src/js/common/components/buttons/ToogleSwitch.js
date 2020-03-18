/**
 * Created by Monster on 2019-04-11.
 */
import React from 'react'
import PropTypes from 'prop-types';


export default class ToogleSwitch extends React.PureComponent{

    render(){
        const {checked,disabled,label,onChangeToggle,wrapperClassName,...restProps}=this.props;

        return  <div className="switch switch--default" onClick={()=>{onChangeToggle(this.props.name,!checked)}} {...restProps}>
            <div className={"switch-toggle switch-toggle--"+(checked?'on':'off')}/>
        </div>
    }
}

ToogleSwitch.propTypes={
    checked:PropTypes.bool.isRequired,
    disabled:PropTypes.bool.isRequired,
    wrapperClassName:PropTypes.string,
    onChangeToggle:PropTypes.func.isRequired,
   // label:PropTypes.object.isRequired,
};
