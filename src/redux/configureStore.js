import { createStore, compose} from "redux";
import reducers from "./store";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle"




export const configureStore = ()=>{
    const store = createStore(
        reducers,
        loadState(),
        compose(
          process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        )
        
      );
      
      store.subscribe(throttle(() => {
        saveState(store.getState());
      }, 10000));


      return store;
}