import PropTypes from 'prop-types';
import Card from './Card';
import { FaPlus } from "react-icons/fa";

const CardView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <>
            <div className="flex p-2 mb-2 bg-gray-500 rounded">
                <div className="flex-1">
                    <span className="text-white align-middle">
                        <strong>Total:</strong> {total}
                    </span>
                </div>
                <button
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 ml-auto"
                    onClick={onAddItem}
                >
                    <FaPlus aria-hidden="true" />
                </button>
            </div>
            <div className="flex flex-wrap -mx-2">
                {items.map(item => {
                    const asset = prices.filter(price => price.name === item.currency);
                    const price = asset.length > 0 ? asset[0].prices.EUR : 0;

                    return (
                        <Card
                            key={item.id}
                            values={item}
                            price={price}
                            handleEditItem={onEditItem}
                            handleDeleteItem={onDeleteItem}
                        />
                    );
                })}
            </div>
        </>
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
