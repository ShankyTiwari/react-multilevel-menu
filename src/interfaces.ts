export interface MultilevelNodes {
  id?: string;
  label?: string;
  faIcon?: string;
  imageIcon?: string;
  activeFaIcon?: string;
  activeImageIcon?: string;
  hidden?: boolean;
  link?: string;
  hrefTargetType?: string;
  data?: any;
  items?: MultilevelNodes[];
  onSelected?: Function;
  disabled?: boolean;
  expanded?: boolean;
}
export interface Configuration {
  classname?: string;
  paddingAtStart?: boolean;
  backgroundColor?: string;
  listBackgroundColor?: string;
  fontColor?: string;
  selectedListFontColor?: string;
  collapseOnSelect?: boolean;
  highlightOnSelect?: boolean;
  useDividers?: boolean;
  rtlLayout?: boolean;
}
export interface BackgroundStyle {
  background?: string;
}
export interface ListStyle {
  background: string;
  color: string;
}
export interface ListItemProps {
  node: MultilevelNodes;
  nodeConfiguration: Configuration;
  level: number;
  submenuLevel: number;
  selectedItem: Function;
  selectedNode: MultilevelNodes;
}
export interface MultiLevelMenuProps {
  list: MultilevelNodes[];
  configuration: Configuration;
  selectedListItem: Function;
  selectedLabel: Function;
}
