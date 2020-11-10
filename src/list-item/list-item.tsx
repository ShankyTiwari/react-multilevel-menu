import React, { useState } from 'react';

import CONSTANTS from './../constants';
import { ListItemProps, MultilevelNodes }  from './../interfaces';

import './list-item.scss';


export const ListItem  = ( { node, nodeConfiguration, level, submenuLevel, selectedItem, selectedNode }: ListItemProps) => {
  let children = null;
  const [expanded, setExpandStatus] = useState(false);
  
  const makeMeVisible = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, subItem: MultilevelNodes) => {
    event.stopPropagation();
    subItem.expanded = !subItem.expanded;   
    setExpandStatus(subItem.expanded);
    selectedItem(node);
  }

  const hasItems = (item: MultilevelNodes) => {
    return  Array.isArray(item.items) && item.items.length; 
  }

  const getPaddingAtStart = (): boolean => {
    return nodeConfiguration.paddingAtStart ? true : false;
  }

  const getSubMenuClasses = () => {
    if (hasItems(node) && getPaddingAtStart()) {
      return `level-${level + 1} ${CONSTANTS.DEFAULT_SUBMENU_CLASS_NAME}`;
    } else {
      return `level-${level + 1}`;
    }
  }

  const getListMenuClasses = (): string => {
    let className = `${CONSTANTS.DEFAULT_LIST_CLASS_NAME} level-${level} level-${level}-submenulevel-${submenuLevel}`;
    if (node.disabled) {
      className = `${className} ${CONSTANTS.DISABLED_ITEM_CLASS_NAME}`;
    }
    return className;
  }

  if (node && hasItems(node)) {
    children = (
      <div className={`${getSubMenuClasses()}`} >
        {
          node?.items?.map((node: MultilevelNodes, index: number) => (
            <ListItem 
              key={node.label}
              nodeConfiguration={nodeConfiguration}
              level={level + 1}
              submenuLevel={index}
              selectedNode={selectedNode}
              selectedItem={selectedItem}
              node={node}
            />
          ))
        }
      </div>
    );
  }

  const getListDataJSX = () => {
    return (
      <div className={`${CONSTANTS.DEFAULT_LIST_DATA_CLASS_NAME}`} onClick={(event) => { makeMeVisible(event, node) }}>
        <span className="content__title-component">
              {node.label}
          </span>
          {hasItems(node) && <span className="content__arrow-component">
              {expanded ? "⇩" : "⇨"} 
          </span>}
      </div>
    )
  }

  return (
    <div className={`${getListMenuClasses()}`}>
      {getListDataJSX()}
      {expanded && children}
    </div>
  );
}