const INITIAL_STATE = {categories: [
    {
      title: "fashion",
      id: 1,
      linkUrl: "shop/fashion"
    },
    {
      title: "electronics",
      id: 2,
      linkUrl: "shop/electronics"
    },
    {
      title: "appliances",
      id: 3,
      linkUrl: "shop/appliances"
    },
    {
      title: "home",
      id: 4,
      linkUrl: "shop/home"
    },
    {
      title: "toys",
      id: 5,
      linkUrl: "shop/toys"
    }
  ]};

const directoryReducer = ( currentState = INITIAL_STATE, action) =>{
    switch(action.type){
        default: 
            return currentState;
    }
}

export default directoryReducer;
