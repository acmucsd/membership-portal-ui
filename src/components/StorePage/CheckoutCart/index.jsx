import React, { useEffect, useState } from 'react';
import ItemMiniDisplay from './ItemMiniDisplay';
import './style.less';
import { Table, Button, Input } from 'antd';
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

// move these actions elsewhere later
const editItem = (itemData) => () => {
  // itemData.id is some id of the item
  console.log(itemData);
}

const deleteItem = (itemData) => () => {
  // itemData.id is some id of the item
  console.log(itemData);
}

const CheckoutCart = props => {
  const [ data, setData ] = useState([
    {
      name: 'Sticker',
      quantity: 3,
      id: 'abcdef',
      price: 250
    },
    {
      name: 'T-Shirt',
      quantity: 1,
      id: 'defasd',
      price: 4000
    }
  ]);
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      render: (itemData) => {
        return <ItemMiniDisplay {...itemData} edit={editItem(itemData)} delete={deleteItem(itemData)} />
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        return (
          <div className='price'>{price}</div>
        )
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity) => {
        return (
          <Input 
            className='quant-input'
            defaultValue={quantity}
            type='number'
            onChange={quantityChange}
          />
        )
      }
    },
    {
      title: 'Total Price',
      dataIndex: 'tp',
      key: 'tp',
      render: (price) => {
        return (
          <div className='price'>{price}</div>
        )
      }
    }
  ];
  const quantityChange = (e) => {
    let quantity = e.target.value;
    console.log(quantity);
    // do something with cart state here.
  }
  const calcTotalPrice = (items) => {
    let p = 0;
    items.forEach((item) => {
      p += item.quantity * item.price;
    });
    return p;
  }
  useEffect(() => {
    let d = props.store.cart.items.map((item) => {
      return {
        key: item.id,
        price: item.price,
        quantity: item.quantity,
        tp: item.price * item.quantity,
        item: {
          name: item.name,
          image: item.image,
          id: item.id
        }
      }
    });
    setData(d);
  }, [props.store]);
  // we will need a diamond icon: price component
  return (
    <div className="Checkout-Cart">
      <h1 className='title'>Cart</h1>
      <Table className='table' dataSource={data} columns={columns} />
      <div className="total">Total: {calcTotalPrice(props.store.cart.items)}</div>
      <div className="checkout-button-wrapper">
        <Button>Check Out</Button>
      </div>
    </div>
  );
};

export default CheckoutCart;
