import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

  const [ticker, setTicker] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState()
  const [plot100dma, setPlot100dma] = useState()
  const [plot200dma, setPlot200dma] = useState()
  const [finalPred, setFinalPred] = useState()

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/");
        console.log("Success: ", response.data);
      } catch (error) {
        console.error("Error Fetching Data", error);
        
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
    try{
      const response = await axiosInstance.post('/predict/', {
        ticker:ticker,
      })
      console.log("Successfull -ticker: ", response.data)
      
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      const ploturl100 = `${backendRoot}${response.data.plot_img_100_dma}`;
      const ploturl200 = `${backendRoot}${response.data.plot_img_200_dma}`;
      const finalpred = `${backendRoot}${response.data.plot_img_final_pred}`;

      setPlot(plotUrl)
      setPlot100dma(ploturl100);
      setPlot200dma(ploturl200);
      setFinalPred(finalpred);


      console.log(plotUrl)


      if (response.data.error) {
        setError(response.data.error);
      }
    }catch (error){
      console.error("There was an error",error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Stock Ticker"
              onChange={(e) => setTicker(e.target.value)}
              required
            />

            <small>
              {error && <div className="text-danger"> {error}</div>}
            </small>
            {loading ? (
              <button type="submit" className="btn btn-danger mt-3" disabled>
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                Please Wait
              </button>
            ) : (
              <button type="submit" className="btn btn-info mt-3">
                Please Wait
              </button>
            )}
          </form>
        </div>
        {/* Prediction plot */}

        <div className="prediction mt-5">
          <div className="p-5"></div>
          {plot && <img src={plot} alt={ticker} style={{ maxWidth: "100%" }} />}
        </div>

        <div className="prediction mt-5">
          <div className="p-5"></div>
          {plot100dma && (
            <img src={plot100dma} alt={ticker} style={{ maxWidth: "100%" }} />
          )}
        </div>

        <div className="prediction mt-5">
          <div className="p-5"></div>
          {plot200dma && (
            <img src={plot200dma} alt={ticker} style={{ maxWidth: "100%" }} />
          )}
        </div>

        <div className="prediction mt-5">
          <div className="p-5"></div>
          {finalPred && (
            <img src={finalPred} alt={ticker} style={{ maxWidth: "100%" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;