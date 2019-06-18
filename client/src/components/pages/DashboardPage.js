import React from 'react';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';

const DashboardPage =  () => {
  return (
    <React.Fragment>
      <BreadcrumSection />
      <ChartSection1 />
    </React.Fragment>
  )
}

export default DashboardPage;