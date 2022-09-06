import "./productCard.scss"
import Button from "../button/Button";


const productCard = ({product,addItemToCard}) => {


  return (
    <div className='product-card-container'>
        <img src={product.imageUrl} alt={product.name}/>
        <div className='footer'>
            <span className='name'>{product.name}</span>
            <span className='price'>{product.price}</span>
        </div>
        <Button classNameType='inverted' onClick={()=>addItemToCard(product)}>ADD TO CARD</Button>
    </div>
  )
}

export default productCard