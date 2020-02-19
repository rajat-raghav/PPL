import { categories } from '../redux/actions/categoriesAction';
import { error } from '../redux/actions/errorAction';
import store from '../redux/store';
import { ROUTES } from '../Config';
import api from './api';


export default function defaultCategory() {
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.DEFAULT_CATEGORY)
    api(ROUTES.DEFAULT_CATEGORY)
        .then(response => {
            const categoriesData = response.data.result;
            store.dispatch(categories(categoriesData));
        })
        .catch(err => {
            console.log('defaultcategory()', err);
            store.dispatch(error(true, err.message));
        });
}
