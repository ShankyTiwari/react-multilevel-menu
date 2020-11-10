export default [
    {
        label: 'NPM',
        faIcon: 'fab fa-500px',
        link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
        externalRedirect: true,
        hrefTargetType: '_blank' // _blank|_self|_parent|_top|framename
    },
    {
        label: 'Item 1 (with Font awesome icon)',
        imageIcon: '/batman.jpg',
        items: [
            {
                label: 'Item 1.1',
                link: '/item-1-1',
                faIcon: 'fab fa-accusoft'
            },
            {
                label: 'Item 1.2',
                faIcon: 'fab fa-accessible-icon',
                items: [
                    {
                        label: 'Item 1.2.1',
                        link: '/item-1-2-1',
                        faIcon: 'fa-allergies' // Font awesome default prefix is fas
                    },
                    {
                        label: 'Item 1.2.2',
                        faIcon: 'fas fa-ambulance',
                        items: [
                            {
                                label: 'Item 1.2.2.1',
                                faIcon: 'fas fa-anchor',  // Still you can specify if you want to
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
            link: '/item-2-1',
            faIcon: 'fab fa-accusoft',
            activeIcon: 'favorite',
            disabled: true,
        },
        {
            label: 'Item 2.2',
            link: '/item-2-2',
            faIcon: 'fas fa-anchor', 
            activeIcon: 'favorite',
            navigationExtras: {
                queryParams: { order: 'popular', filter: 'new' },
            }
        }
        ]
    },
    {
        label: 'Item 3',
        faIcon: 'fab fa-accusoft',
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

export const configurations = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    rtlLayout: false,
    classname: "my-menu",
    selectedListFontColor: "red"
}