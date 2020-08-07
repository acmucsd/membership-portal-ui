import React from 'react';
import { connect } from 'react-redux';
import CheckoutPage from '../../components/StorePage/CheckoutPage';
import PageLayout from '../PageLayout';

const CheckoutPageContainer = () => {
  return (
    <PageLayout>
      <CheckoutPage />
    </PageLayout>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {})(CheckoutPageContainer);
