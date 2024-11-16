import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  fetchBaseCurrency,
  setDefaultCurrency,
} from 'reduxState/currency/slice';
// import { getUserInfo } from 'service/opencagedataApi';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;

      // console.log('Your current position is:');
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);

      dispatch(fetchBaseCurrency(crd));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      dispatch(setDefaultCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
