import React, { useContext, useEffect, useState } from 'react'
import { productUrl } from '../baseUrl'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider';
import { toast } from 'react-hot-toast';


const Product = ({ loading, setLoading, item }) => {

    return (
        <div>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
        </div>
    )
}

export default Product
