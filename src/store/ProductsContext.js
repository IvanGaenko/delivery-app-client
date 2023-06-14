import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(productsReducer, initialValues);

  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}

function productsReducer(data, action) {
  switch (action.type) {
    case "setProductList": {
      const { dealers, products, coupons } = action.data;
      return {
        ...data,
        dealers,
        products,
        coupons,
      };
    }
    case "setCurrentDealerId": {
      const tempProducts = JSON.parse(JSON.stringify(data.products));

      const filteredProducts = tempProducts.filter(
        (product) => product.dealerid === action.id
      );
      return {
        ...data,
        tempProducts:
          data.currentDealerId === null ? tempProducts : data.tempProducts,
        currentDealerId: action.id,
        products: filteredProducts,
      };
    }

    case "setProductPage": {
      return { ...data, currentProductPage: action.payload };
    }

    case "resetProductList": {
      return { ...data, products: data.tempProducts, currentDealerId: null };
    }

    case "updateUserData": {
      const { payload } = action;
      const userData = { ...data, userData: { ...data.userData, ...payload } };
      return userData;
    }

    case "updateMapDataUser": {
      const mapData = data.mapData;
      mapData.user = action.payload ? [action.payload] : [];
      return { ...data, mapData };
    }

    case "updateUserLocation": {
      if (action.payload === null) {
        return {
          ...data,
          userLocation: {
            street_number: "",
            route: "",
            locality: "",
            lat: null,
            lng: null,
          },
        };
      } else {
        return {
          ...data,
          userLocation: { ...data.userLocation, ...action.payload },
        };
      }
    }

    case "updateRoute": {
      return {
        ...data,
        successDuration: action.duration,
        mapData: {
          ...data.mapData,
          route: action.route,
          duration: action.duration,
        },
      };
    }

    case "addToCart": {
      let cartHaveThisProduct = false;
      const newCart = data.cart.map((c) => {
        if (c.product.id === action.payload.product.id) {
          cartHaveThisProduct = true;
          return {
            product: c.product,
            quantity: c.quantity + action.payload.quantity,
          };
        }
        return c;
      });

      if (cartHaveThisProduct) {
        return {
          ...data,
          cart: newCart,
        };
      } else {
        const findedDealer = data.dealers.find(
          (dealer) => dealer.id === action.payload.product.dealerid
        );

        const isIncludedToMapData = data.mapData.dealers.find(
          (dealer) => dealer.id === findedDealer.id
        );

        const newData = {
          ...data,
          cart: [...data.cart, action.payload],
        };

        return isIncludedToMapData
          ? newData
          : {
              ...newData,
              mapData: {
                ...data.mapData,
                dealers: [...data.mapData.dealers, findedDealer],
              },
            };
      }
    }
    case "updateTotalPrice": {
      return {
        ...data,
        totalprice: action.totalprice,
        discountprice: action.discountprice,
      };
    }
    case "changeQuantityInCart": {
      return {
        ...data,
        cart: data.cart.map((c) => {
          if (c.product.id === action.payload.product.id) {
            return action.payload;
          }
          return c;
        }),
      };
    }
    case "removeFromCart": {
      const newCart = data.cart.filter((c) => c.product.id !== action.id);
      const haveSameDealer = newCart.find(
        (c) => c.product.dealerid === action.dealerid
      );
      let dealers = [];
      if (haveSameDealer === undefined) {
        dealers = data.mapData.dealers.filter(
          (dealer) => dealer.id !== action.dealerid
        );
      }
      return {
        ...data,
        mapData: {
          ...data.mapData,
          dealers: haveSameDealer ? data.mapData.dealers : dealers,
        },
        cart: data.cart.filter((c) => c.product.id !== action.id),
      };
    }
    case "resetOrderPage": {
      return {
        ...data,
        userLocation: {
          street_number: "",
          route: "",
          locality: "",
          lat: null,
          lng: null,
        },
        userData: {
          email: "",
          phone: "",
          name: "",
        },
        cart: [],
        totalprice: 0,
        discountprice: 0,
        couponValue: "",
        currentDiscount: {},
        mapData: {
          dealers: [],
          route: null,
        },
      };
    }
    case "updateCouponValue": {
      return { ...data, couponValue: action.couponValue };
    }
    case "checkDiscountCode": {
      const findedDiscount = data.coupons.find(
        (coupon) => coupon.code === action.code
      );

      return {
        ...data,
        currentDiscount: !findedDiscount ? {} : findedDiscount,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialValues = {
  dealers: [],
  products: [],
  tempProducts: [],
  currentDealerId: null,
  currentProductPage: null,
  userLocation: {
    address: "",
    street_number: "",
    route: "",
    locality: "",
    lat: null,
    lng: null,
  },
  userData: {
    email: "",
    phone: "",
    name: "",
  },
  cart: [],
  totalprice: 0,
  discountprice: 0,
  cartHistory: [],
  coupons: [],
  couponValue: "",
  currentDiscount: {},
  successDuration: "",
  mapData: {
    dealers: [],
    route: null,
    duration: "",
  },
};
