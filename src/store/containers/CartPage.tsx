import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../layout/containers/PageLayout';
import CartPage from '../components/CartPage';
import { fetchCart as fetchCartConnect, fetchItem as fetchItemConnect, addToCart as addToCartConnect } from '../storeActions';
import { fetchService, notify } from '../../utils';
import shirt from '../../assets/graphics/shirt.png';
import sticker from '../../assets/graphics/sticker.png';
import snoopy from '../../assets/graphics/snoopy.jpg';
import Config from '../../config';
import { history } from '../../redux_store';

const fakeCart = [
  {
    item: {
      uuid: '564dfca5-d216-4693-82ab-3e55ff88fb89',
      item: {
        uuid: 'c21cf82f-ac2d-496f-87c7-a6e310136382',
        itemName: 'Unisex Hack School Anorak',
        collection: {
          uuid: '6144b195-4daf-4e9a-a9c0-9f8c3bccd242',
          title: 'The Hack School Collection',
          color: 'blue',
          themeColorHex: '#EB8C34',
          description: 'Do you like to code? Tell the world with this Hack School inspired collection.',
          archived: false,
          items: [],
        },
        picture: shirt,
        description: "San Diego has an average annual precipitation less than 12 inches,but that doesn't mean you don't need one of these.",
        monthlyLimit: 1,
        lifetimeLimit: 1,
        hidden: false,
        hasVariantsEnabled: true,
        options: [],
      },
      quantity: 5,
      price: 22500,
      discountPercentage: 20,
      orders: [],
      metadata: {
        type: 'WIDTH',
        value: 'XS',
        position: 0,
      },
    },
    quantity: 1,
  },
  {
    item: {
      uuid: '6e00bcdd-fa35-4574-958a-525082ae18d3',
      item: {
        uuid: 'dced6e89-a93d-4346-8257-2298ba0d182f',
        itemName: 'Hack School Sticker Pack (4) - Cyan',
        picture: sticker,
        description: 'Make space on your laptop cover for these Cyan stickers. Pack of 4, size in inches.',
        options: [],
        monthlyLimit: 5,
        lifetimeLimit: 25,
        hidden: false,
        hasVariantsEnabled: true,
        collection: {
          uuid: '6144b195-4daf-4e9a-a9c0-9f8c3bccd242',
          title: 'The Hack School Collection',
          color: 'black',
          themeColorHex: '#EB8C34',
          description: 'Do you like to code? Tell the world with this Hack School inspired collection.',
          archived: false,
          items: [],
        },
      },
      price: 1500,
      discountPercentage: 15,
      orders: [],
      metadata: {
        type: 'SIZE',
        value: '2x2',
        position: 0,
      },
      quantity: 35,
    },
    quantity: 1,
  },
  {
    item: {
      uuid: 'f98cc2f1-d2e2-4ff4-bf48-c28a65ed4c84',
      item: {
        uuid: '1135069d-ab49-4e11-a524-b0f1e420a61a',
        itemName: 'Camp Snoopy Snapback',
        picture: snoopy,
        description: 'Guaranteed 2x return on Grailed.',
        options: [],
        monthlyLimit: 2,
        lifetimeLimit: 5,
        hidden: false,
        hasVariantsEnabled: false,
        collection: {
          uuid: '7065740e-aa66-4852-af0a-228a61ced0f2',
          title: 'Fall 2001',
          color: 'green',
          themeColorHex: '#392913',
          description: 'Celebrate the opening of Sixth College in style, featuring raccoon print jackets.',
          archived: false,
          items: [],
        },
      },
      price: 8000,
      discountPercentage: 5,
      orders: [],
      metadata: null,
      quantity: 1,
    },
    quantity: 1,
  },
];

type CartPageContainerProps = {
  cart: { [uuid: string]: number };
  fetchCart: Function;
  fetchItem: Function;
  addToCart: Function;
};

const CartPageContainer: React.FC<CartPageContainerProps> = ({ cart, fetchCart, fetchItem, addToCart }) => {
  const [resolvedCart, setResolvedCart] = useState(fakeCart);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setResolvedCart(await fetchCart(cart));
  //     } catch (reason) {
  //       notify('API Error', reason.message || reason);
  //     }
  //   })();
  // });

  const verifyCart = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.verification}`;
      const payload = Object.entries(cart).map(([option, quantity]) => ({ option, quantity }));
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        // payload: JSON.stringify({ order: payload }),
        payload: JSON.stringify(payload),
      });
      history.push('/store/checkout');
    } catch (error) {
      onFailCallback();
      notify('Cart Error', error.error);
    }
  };

  useEffect(() => {
    fakeCart.forEach((opt) => {
      addToCart(opt.item.uuid, 1);
    });
  }, [addToCart]);

  useEffect(() => {
    (async () => {
      const newCart = await Promise.all(
        fakeCart.map(async (opt) => {
          const item = await fetchItem(opt.item.item.uuid);
          opt.item.item.options = item.options;
          opt.quantity = cart[opt.item.uuid];
          return opt;
        }),
      );
      setResolvedCart(newCart);
    })();
  }, [fetchItem, cart]);

  return (
    <PageLayout>
      <CartPage cart={resolvedCart} verifyCart={verifyCart} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: state.store.cart });

const mapDispatchToProps = {
  fetchCart: fetchCartConnect,
  fetchItem: fetchItemConnect,
  addToCart: addToCartConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
