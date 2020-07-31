var viewport = new Sb.layout.Fit({
  items: [{
          componentType: 'container',
          classList: ['green-bg'],
          items: [{
              componentType: "zen:button",
              primary: true,
              text: "Click Me!",
              handler: function () {
                  alert("It works!");
              }
          }]
      }]
  });
  
viewport.renderTo(Sb.queryOne("#app"));