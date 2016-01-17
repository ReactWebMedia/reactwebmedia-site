import React, { Component } from 'react';

 import ClickOutsideComponentDecorator from '../decorators/ClickOutsideComponentDecorator';

 @ClickOutsideComponentDecorator
 class Dropdown extends Component {
   static displayName = 'Dropdown'

   constructor (props) {
     super(props);

     this.state = {
       isVisible: props.isVisible || false
     }
   }

   onClickOutside = () => {
     this.hide();
   }

   toggleVisibility = () => {
     this.setState({isVisible: !this.state.isVisible});
   }

   hide = () => {
     this.setState({isVisible: false});
   }

   render () {
     const {
       className,
       ...props
     } = this.props;
     const state = this.state;

     let dropdownClassName = `dropdown ${className}`;

     if (state.isVisible) {
       dropdownClassName = `${dropdownClassName} dropdown-open`;
     }

 return (
     <div className={dropdownClassName} {...props}>
       <div className="dropdown__trigger action" onClick={this.toggleVisibility}>
        <span className="micon micon-small">arrow_drop_down</span>
       </div>
       <div className="dropdown__body" onClick={this.toggleVisibility}>
        {props.children}
       </div>
     </div>
   )
  }
}

export default Dropdown;
