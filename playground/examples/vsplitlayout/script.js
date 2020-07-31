var viewport =  new Sb.layout.VSplit({
  id: 'vsplit0',
  items: [{
      componentType: 'component',
      id: 'vsplitChildComponent0',
      template: '<div>{body}</div>',
      templateData: {body: 'aaaaaaa'}
  },{
      componentType: 'component',
      id: 'vsplitChildComponent1',
      template: '<div>{body}</div>',
      templateData: {body: 'bbbbb'}
  },{
      componentType: 'component',
      id: 'vsplitChildComponent2',
      template: '<div>{body}</div>',
      templateData: {body: 'ccccc'}
  }]
});

viewport.renderTo(Sb.queryOne("#app"));