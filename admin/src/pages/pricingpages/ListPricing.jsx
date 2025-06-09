import React from 'react';
import PricingTable from './pricingtables/PricingTable';
import HeadingPricingTable from './pricingtables/HeadingPricingTable';

const ListPricing = ({ token }) => {
  return (
    <div>
      <PricingTable token={token} />
      <HeadingPricingTable token={token} />
    </div>
  );
};

export default ListPricing;
