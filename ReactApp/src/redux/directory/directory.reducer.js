const INITIAL_STATE = {categories: [
    {
      title: "fashion",
      id: 1,
    },
    {
      title: "electronics",
      id: 2,
    },
    {
      title: "appliances",
      id: 3,
    },
    {
      title: "home",
      id: 4,
    },
    {
      title: "toys",
      id: 5,
    }
  ]};

const directoryReducer = ( currentState = INITIAL_STATE, action) =>{
    switch(action.type){
        default: 
            return currentState;
    }
}

export default directoryReducer;
