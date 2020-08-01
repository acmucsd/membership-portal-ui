/*<div style={{ marginBottom: 16 }}>
      <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
    </div>*/

    import React, { useState, useEffect } from 'react';

    import ItemCard from '../StoreItemCard';
    import { Input } from 'antd';
    import { EditFilled } from '@ant-design/icons';

    import './style.less';

    interface EditStoreCollectionProps {
        auth: any;
        uuid: string;
        description: string;
        title: string;
        merchandise: [
            {
                collection: string;
                description: string;
                discountPercentage: number;
                itemName: string;
                lifetimeLimit: number;
                monthlyLimit: number;
                picture: string;
                price: number;
                uuid: string;
            }
        ]
    }

    const EditStoreCollection: React.FC<EditStoreCollectionProps> = (props) => {
        const { description, title, merchandise } = props;

        return (
            <div className="collection">
                <div className="collection-info">
                    <div>
                        <Input addonAfter={<EditFilled />} defaultValue={title}/>
                    </div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                {
                    merchandise.map((item) => (<ItemCard/>))
                }
            </div>
        );
    };

    export default EditStoreCollection;