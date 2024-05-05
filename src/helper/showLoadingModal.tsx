import {ThunkDispatch} from 'redux-thunk';
import {AnyAction, Dispatch} from 'redux';
import {
  LoadingModalSliceState,
  setShowLoadingModal,
} from '../redux/loadingSlice';
export const showLoadingModal = (
  dispatch: ThunkDispatch<
    {showLoadingModalReducer: LoadingModalSliceState},
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  isShow: boolean,
) => {
  dispatch(setShowLoadingModal({isShowLoadingModal: isShow}));
};
