import React from 'react';
import { connect } from 'react-redux';

import { fetchCollections } from '../../storeActions';

import StoreHeader from '../StoreHeader';

import './style.less';

interface StorePageProps {
  fetchCollections: Function;
  isAdmin: boolean;
}

const StorePage: React.FC<StorePageProps> = () => {
  return (
    <>
      <StoreHeader showBalance showCart />
      <div className="store-page">Coming 2024</div>
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  isAdmin: state.auth.admin,
});

export default connect(mapStateToProps, { fetchCollections })(StorePage);
