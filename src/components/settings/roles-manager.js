import React, { PropTypes } from 'react';

import { ROLES } from '../../consts/profileConstants';

class RolesManager extends React.Component {
  static displayName = 'RolesManager'

  getRolesFromInputs() {
    const { roles } = this.props;
    let rolesFromInputs = [];

    roles.forEach((role, i) => {
      rolesFromInputs.push([
        this.refs[`role${i}_key`].value,
        this.refs[`role${i}_value`].value
      ]);
    });

    return rolesFromInputs;
  }

  onRemove = (i) => {
    const { onChange } = this.props;
    let roles = this.getRolesFromInputs();

    roles.splice(i, 1);

    onChange(roles);
  }

  onChange = () => {
    const { onChange } = this.props;

    onChange(this.getRolesFromInputs());
  }

  render() {
    const { roles, onAdd } = this.props;

    return (
      <div>
        {roles.map((role, i) => (
          <div key={i} className="layout__row">
            <label htmlFor="role1" className="layout__block layout__row layout__row-small">Role</label>
            <div className="layout__row layout__row-small layout layout-align_vertical">
              <div className="layout__grid_item layout__grid_item-wide">
                <select ref={`role${i}_key`} id="role1" defaultValue={role[0]} onChange={this.onChange} className="input input-block input-select">
                  {ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="layout__grid_item layout">
                <div onClick={this.onRemove.bind(null, i)} className="button action button-icon button-transparent">
                  <span className="micon micon-small button__icon">close</span>Remove role
                </div>
              </div>
            </div>
            <div className="layout__row">
              <label className="layout__block layout__row layout__row-small">Description</label>
              <textarea ref={`role${i}_value`} onChange={this.onChange} value={role[1]} className="layout__row layout__row-small input input-block input-textarea input-textarea_small"></textarea>
            </div>
          </div>
        ))}
        {!roles.length && <div className="layout__row">
          No roles...
        </div>}
        <div className="layout__row layout__row-double">
          <span onClick={onAdd} className="button button-blue action">Add role</span>
        </div>
      </div>
    );
  }
}

RolesManager.propTypes = {
  roles: PropTypes.array,
  onChange: PropTypes.func,
  onAdd: PropTypes.func
};

RolesManager.getDefaultProps = {
  roles: [],
  onChange: () => {},
  onAdd: () => {}
};

export default RolesManager;
