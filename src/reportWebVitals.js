/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
