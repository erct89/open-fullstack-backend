import React from 'react';

import './list.css';

import Item from './Item';
import ListWraper from './ListWraper';

/**
 * Estas funciones puedo sacarlas a un modulo.
 */
const get = (item, type, defValue) => isType(item, type) ? item : defValue;
const isType = (item, type) => item instanceof type;

export function List (props) {
  const {className, classNameList, classNameItem, customComponents, items, itemSelected, isOrder, literals, pathToKey, onSelectedItem, ...actions} = props;
  const CustomComponents = typeof(customComponents) === 'function' ? customComponents : `div`;

  const isEmptyList = () => isType(items, Array, []) && items.length === 0;

  return (
    <div className={className}>
      <ListWraper className={`${isEmptyList() ? 'empty' : '' } ${classNameList}`} isOrder={!!isOrder}>
        {get(items, Array, [])
          .map((item, index) => 
            (<Item key={pathToKey ? item[pathToKey] : index} className={classNameItem}>
              <CustomComponents item={item} itemSelected={itemSelected} literals={literals} onSelect={onSelectedItem} {...actions}/>
            </Item>)
          )
        }
        {isEmptyList() && [<Item key="0"/>,<Item key="1"/>,<Item key="2"/>]}
      </ListWraper>
      {/* [Primera][Anterios][Actual][Siguiente][Ultima] */}
      {/* <ListControlPage pageTotal={items.length} pageSize={pageSize} currentPage={} onChangePage={handleChangePage} />ç */}
    </div>
  );
}

export default List;