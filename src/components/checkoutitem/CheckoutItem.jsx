import "./checkoutitem.scss"

const CheckoutItem = ({item, onIncrement,onDecrement,onRemove}) => {
  return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={item.imageUrl} alt={item.name}/>
        </div>
        <div className='name'>{item.name}</div>
        <div className='quantity'>
            <span className='arrow' onClick={()=>onDecrement(item)}>&#10094;</span>
            <span className='value'>{item.quantity}</span>
            <span className='arrow' onClick={()=>onIncrement(item)}>&#10095;</span>
        </div>
        <div className='price'>{item.price}</div>
        <div className='remove-button' onClick={()=>onRemove(item)}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem