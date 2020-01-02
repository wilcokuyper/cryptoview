import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

const CardView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <React.Fragment>
            <div className="d-flex p-2 mb-2 bg-secondary">
                <div className="flex-grow-1">
                    <span className="text-white align-middle"><strong>Total:</strong> {total}</span>
                </div>
                <div className="btn-group btn-group-sm" role="group" aria-label="wallet actions">
                    <button className="btn btn-light ml-auto" onClick={onAddItem}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="row">
                { items.map( item => {
                    const asset =  prices.filter(price => price.name === item.currency);
                    const price = asset.length > 0 ? asset[0].prices.EUR : 0;
                    
                    return <Card
                        key={item.id}
                        values={item}
                        price={price}
                        handleEditItem={onEditItem}
                        handleDeleteItem={onDeleteItem}
                    />;
                })
                }
            </div>
        </React.Fragment>
    );
};

CardView.propTypes = {
    onAddItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    items: PropTypes.array,
    prices: PropTypes.array,
    total: PropTypes.string,
};

export default CardView;