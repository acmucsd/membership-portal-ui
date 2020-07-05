  import { Table, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import ItemMiniDisplay, { ItemMiniDisplayPropTypes } from './ItemMiniDisplay';
import './style.less';

// move these actions elsewhere later
const editItem = (itemData: Item) => () => {
  // itemData.id is some id of the item
  console.log(itemData);
};

const deleteItem = (itemData: Item) => () => {
  // itemData.id is some id of the item
  console.log(itemData);
};

// should be moved somewhere else
export interface Item {
  name: string,
  quantity: number,
  id: string,
  price: number,
  image: string
}

export interface CheckoutCartItem {
  quantity: number,
  key: string,
  price: number,
  tp: number,
  item: Item
}

export interface CheckoutCartPropTypes {
  store: any // should be defined elsewhere and inserted here
}

const CheckoutCart = (props: CheckoutCartPropTypes) => {
  const [data, setData] = useState<Array<CheckoutCartItem>>([]);
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      render: (itemData: Item) => {
        return (
          <ItemMiniDisplay
            {...itemData}
            edit={editItem(itemData)}
            delete={deleteItem(itemData)}
          />
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return <div className="price">{price}</div>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => {
        return (
          <Input
            className="quant-input"
            defaultValue={quantity}
            type="number"
            onChange={quantityChange}
          />
        );
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'tp',
      key: 'tp',
      render: (price: number) => {
        return <div className="price">{price}</div>;
      },
    },
  ];
  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;
    console.log(quantity);
    // do something with cart state here.
  };
  const calcTotalPrice = (items: Array<Item>) => {
    let p = 0;
    items.forEach((item) => {
      p += item.quantity * item.price;
    });
    return p;
  };
  useEffect(() => {
    const d: Array<CheckoutCartItem> = props.store.cart.items.map((item: Item) => {
      return {
        key: item.id,
        price: item.price,
        quantity: item.quantity,
        tp: item.price * item.quantity,
        item: item
      };
    });
    setData(d);
  }, [props.store]);
  // we will need a diamond icon: price component
  return (
    <div className="Checkout-Cart">
      <h1 className="title">Cart</h1>
      <Table className="table" dataSource={data} columns={columns} />
      <div className="total">
        Total: {calcTotalPrice(props.store.cart.items)}
      </div>
      <div className="checkout-button-wrapper">
        <Button>Check Out</Button>
      </div>
    </div>
  );
};

export default CheckoutCart;
