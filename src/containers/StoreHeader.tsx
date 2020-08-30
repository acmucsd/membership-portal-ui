import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StoreHeader from '../components/StoreHeader/index';

interface StoreHeaderContainerProps {
  titleType?: string;
  titleText: string;
  hideCart?: boolean;
}

const StoreHeaderContainer: React.FC<StoreHeaderContainerProps> = (props) => {
  const history = useHistory();
  function handleGoBack() {
    history.goBack();
  }
  const { titleType, titleText, hideCart } = props;
  return (
    <StoreHeader
      // points={props.points}
      points={10000}
      handleGoBack={handleGoBack}
      // cartItems={props.cartItems}
      cartItems={3}
      title={
        titleType === 'nav' ? (
          <NavTitle titleText={titleText} />
        ) : (
          <TextTitle titleText={titleText} />
        )
      }
      hideCart={hideCart}
    />
  );
};

const TextTitle = (props) => {
  const { titleText } = props;
  return <h1 className="text-title">{titleText}</h1>;
};

const NavTitle = (props) => {
  const history = useHistory();
  const { titleText } = props;
  return (
    <button type="button" className="nav-title" onClick={() => history.goBack()}>
      {titleText}
    </button>
  );
};

// const mapStateToProps = state => ({
//     points: state.user.profile.points,
//     cartItems: state.cart.items.length
// });

export default connect(null, null)(StoreHeaderContainer);
