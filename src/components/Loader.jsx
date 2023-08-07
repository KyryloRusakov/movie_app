import { Oval } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader">
    <Oval
      height={80}
      width={80}
      color="#2b86c5"
      wrapperStyle={{}}
      wrapperClass=""
      visible
      ariaLabel="oval-loading"
      secondaryColor="#ff3cac"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);

export default Loader;
