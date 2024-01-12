import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ShoppingCartContext = createContext()

/* Por que usaremos un estado global
Para que, cuando nuestro proyecto vaya 
aumentando su complejidad, no sé vuelva tedioso estar 
pasando la información que componetes, hermanos, hijos, padres, 
necesitan entré sí.
También, por que es mas facil debuggear errores teniendo 
una sola fuente de la verdad en cuanto almacenamiento 
para nuestra aplicación a la vez que lo hace mas legible 
y facil de mantener. 😃 */
export const ShoppingCartProvider = ({children}) => {
    ShoppingCartProvider.propTypes = {
        children: PropTypes.node.isRequired,
      }
    //Shopping Cart · Increment quantity
    const [count, setCount] = useState(0)
    //estado para abrir y cerrar ProductDatail, entonces recibe un booleano
    // Product Detail · Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail · Show product
    const [productToShow, setProductToShow] = useState({})

    // ShoppingCart · Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    // ShoppingCart · Order
    const [order, setOrder] = useState([])

    // Creamos un estado local
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    //Estado para el buscador
    const [searchValue, setSearchValue] = useState(null);

    useEffect (()=> {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchValue) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    }

    useEffect (() => {
        if (searchValue) setFilteredItems(filteredItemsByTitle(items, searchValue))
    }, [items, searchValue])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            isCheckoutSideMenuOpen,
            order,
            setOrder,
            items,
            setItems,
            searchValue,
            setSearchValue,
            filteredItems
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}