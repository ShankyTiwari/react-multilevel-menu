import { Configuration, MultilevelNodes } from '../.';

export const list: MultilevelNodes[] = [
    {
        label: 'NPM',
        faIcon: 'fab fa-500px',
        link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
        hrefTargetType: '_blank' // _blank|_self|_parent|_top|framename
    },
    {
        label: 'Item 1 (with Font awesome icon)',
        imageIcon: '/batman.jpg',
        activeImageIcon: '/ironman.jpg',
        items: [
            {
                label: 'Item 1.1',
                faIcon: 'fab fa-accusoft',
                onSelected: function() {
                    console.log('Item 1.2.2.1');
                }
            },
            {
                label: 'Item 1.2',
                faIcon: 'fab fa-accessible-icon',
                items: [
                    {
                        label: 'Item 1.2.1',
                        faIcon: 'fas fa-allergies',
                        onSelected: function() {
                            console.log('Item 1.2.2.1');
                        }
                    },
                    {
                        label: 'Item 1.2.2',
                        faIcon: 'fas fa-ambulance',
                        items: [
                            {
                                label: 'Item 1.2.2.1',
                                faIcon: 'fas fa-anchor',
                                onSelected: function() {
                                    console.log('Item 1.2.2.1');
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Item 2',
        faIcon: 'fas fa-anchor', 
        items: [
            {
                label: 'Item 2.1',
                faIcon: 'fab fa-accusoft',
                activeFaIcon: 'fab fa-accusoft',
                disabled: true,
            },
            {
                label: 'Item 2.2',
                faIcon: 'fas fa-anchor', 
                activeFaIcon: 'fab fa-accusoft',
            }
        ]
    },
    {
        label: 'Item 3',
        faIcon: 'fab fa-accusoft',
        activeFaIcon: 'fas fa-anchor', 
        onSelected: function() {
            console.log('Item 3');
        }
    },
    {
        label: 'Item 4',
        link: '/item-4',
        faIcon: 'fab fa-accusoft',
        hidden: true
    }
];

export const configurations: Configuration = {
    paddingAtStart: true,
    classname: "my-menu",
    // selectedListFontColor: "red",
    // listBackgroundColor: "#00ffbb",
    // backgroundColor: "#ff00bb",
    // fontColor: "#bbff00",
    // highlightOnSelect: true,
    useDividers: true
}